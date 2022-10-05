import 'reflect-metadata';
import express from 'express';
import { createServer } from '@graphql-yoga/node';
import { buildSchema } from 'type-graphql';
import { MessageResolver } from './resolvers/message.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import mongoose from 'mongoose';
import { Session } from './models/session.model';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import http from 'http';
import { authChecker } from './middleware/auth';
import { Context } from './types';
import { sessionMiddleware } from './middleware/session';

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 4000;

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

const app = express();

const server = http.createServer(app);

app.enable('trust proxy');

app.use(
	cors({
		credentials: true,
		origin: [process.env.CORS_ORIGIN!],
	})
);

app.use(
	helmet({
		hidePoweredBy: true,
		crossOriginResourcePolicy: {
			policy: 'cross-origin',
		},
	})
);

app.use(sessionMiddleware);

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		Session.index({ expires: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });
		mongoose.set('debug', true);

		const graphQLServer = createServer({
			schema: await buildSchema({
				resolvers: [MessageResolver, AuthResolver],
				validate: false,
				authChecker,
			}),
			context: ({ req, res }) => ({ req, res }),
			graphiql: {
				subscriptionsProtocol: 'WS',
			},
		});

		const wsServer = new WebSocketServer({
			server,
			path: graphQLServer.getAddressInfo().endpoint,
		});

		useServer(
			{
				execute: (args: any) => args.rootValue.execute(args),
				subscribe: (args: any) => args.rootValue.subscribe(args),
				context: (args: any) => args.rootValue.context(args),
				onConnect(ctx) {
					const promise:
						| Promise<Record<string, unknown> | boolean | void>
						| Record<string, unknown>
						| boolean
						| void = new Promise((resolve, reject) => {
						const req = ctx.extra.request as Context['req'];

						sessionMiddleware(req, {} as any, () => {
							const userId = req.session?.userId;
							return resolve({ userId });
						});
					});

					return promise;
				},
				onSubscribe: async (ctx, msg) => {
					const {
						schema,
						execute,
						subscribe,
						contextFactory,
						parse,
						validate,
					} = graphQLServer.getEnveloped({ ...ctx, req: ctx.extra.request });

					const args = {
						schema,
						operationName: msg.payload.operationName,
						document: parse(msg.payload.query),
						variableValues: msg.payload.variables,
						contextValue: await contextFactory(),
						rootValue: {
							execute,
							subscribe,
						},
					};

					const errors = validate(args.schema, args.document);
					if (errors.length) return errors;
					return args;
				},
			},
			wsServer
		);

		app.use(mongoSanitize());
		app.use(xss());

		app.get('/', (_, res) => {
			res.redirect('/graphql');
		});

		app.use('/graphql', graphQLServer);

		server.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
})();
