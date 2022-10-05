import MongoStore from 'connect-mongo';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const sessionMiddleware = session({
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI! }),
	secret: process.env.SESSION_SECRET!,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 7,
		secure: process.env.NODE_ENV === 'production',
	},
	name: 'auth.token',
	saveUninitialized: false,
});
