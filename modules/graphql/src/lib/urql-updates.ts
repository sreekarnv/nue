import { UpdatesConfig } from '@urql/exchange-graphcache';
import {
	Message,
	MessagesDocument,
	User,
	LoggedInUserDocument,
} from '../hooks/graphql';

export const updates: UpdatesConfig = {
	Subscription: {
		newMessage: (result, _, cache) => {
			const sender: Partial<User> = (result?.message as any).sender;

			const cachedMessagesData = (cache.readQuery({
				query: MessagesDocument,
				variables: { user: sender._id },
			}) as { messages: Message[] }) || { messages: [] };

			cache.updateQuery(
				{
					query: MessagesDocument,
					variables: {
						user: sender._id,
					},
				},
				() => {
					return {
						...cachedMessagesData,
						messages: [...cachedMessagesData.messages, result.message],
					};
				}
			);
		},
	},
	Mutation: {
		login: (result, _, cache) => {
			cache.updateQuery(
				{
					query: LoggedInUserDocument,
				},
				() => {
					return {
						user: result.user,
						__typename: 'Query',
					};
				}
			);
		},
		loginWithGithub: (result, _, cache) => {
			cache.updateQuery(
				{
					query: LoggedInUserDocument,
				},
				() => {
					return {
						user: result.user,
						__typename: 'Query',
					};
				}
			);
		},
		signup: (result, _, cache) => {
			cache.updateQuery(
				{
					query: LoggedInUserDocument,
				},
				() => {
					return {
						user: result.user,
						__typename: 'Query',
					};
				}
			);
		},
		addMessage: (result, _, cache) => {
			const receiver: Partial<User> = (result.addMessage as any).receiver;

			const res = cache.readQuery({
				query: MessagesDocument,
				variables: { user: receiver._id },
			});

			cache.updateQuery(
				{
					query: MessagesDocument,
					variables: {
						user: receiver._id,
					},
				},
				() => {
					return {
						...res,
						messages: [...(res as any).messages, result.addMessage],
					};
				}
			);
		},
	},
};
