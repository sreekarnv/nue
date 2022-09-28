import { Request, Response } from 'express';
import { Session } from 'express-session';

export type Context = {
	req: Request & {
		session: Session & {
			userId?: string;
		};
	};
	res: Response;
};
