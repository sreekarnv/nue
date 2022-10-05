import { AuthChecker } from 'type-graphql';
import { Context } from '../types';

export const authChecker: AuthChecker<Context> = async ({ context }) => {
	if (context?.req?.session?.userId) {
		return true;
	}

	return false;
};
