import 'reflect-metadata';
import express from 'express';
import { createServer } from '@graphql-yoga/node';
import { buildSchema } from 'type-graphql';
import { MessageResolver } from './resolvers/message.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Session } from './models/session.model';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 4000;

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

const app = express();

app.use(
	cors({
		credentials: true,
		origin: [process.env.CORS_ORIGIN!],
	})
);

app.use(
	session({
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI! }),
		secret: process.env.SESSION_SECRET!,
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
		name: 'auth.token',
		saveUninitialized: false,
	})
);

(async () => {
	await mongoose.connect(process.env.MONGO_URI!);
	Session.index({ expires: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });
	mongoose.set('debug', true);

	const graphQLServer = createServer({
		schema: await buildSchema({
			resolvers: [MessageResolver, AuthResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	app.get('/', (_, res) => {
		res.redirect('/graphql');
	});

	app.use('/graphql', graphQLServer);

	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
})();
