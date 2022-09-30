import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange, subscriptionExchange } from 'urql';
import { SSRExchange, withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import { NextPageContext } from 'next';
import {
	LoggedInUserDocument,
	Message,
	MessagesDocument,
	User,
} from '../graphql';

export const createUrqlClient = (
	ssrExchange: SSRExchange,
	ctx?: NextPageContext
): any => {
	let headers;

	if (typeof window === 'undefined') {
		headers = ctx?.req?.headers;
	}

	return {
		url: process.env.NEXT_PUBLIC_API_URL!,
		fetchOptions: {
			credentials: 'include',
			headers: headers ? headers : undefined,
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				keys: {},
				resolvers: {},
				updates: {
					Subscription: {
						newMessage: (result, _, cache) => {
							console.log({ result });

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
										messages: [...cachedMessagesData.messages, result.message],
									};
								}
							);
						},
					},
					Mutation: {
						logout: () => {
							if (window) window.location.href = '/';
						},
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
							const receiver: Partial<User> = (result.addMessage as any)
								.receiver;

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
				},
			}),
			ssrExchange,
			fetchExchange,
			subscriptionExchange({
				forwardSubscription(operation) {
					const url = new URL('http://localhost:4000/graphql');
					url.searchParams.append('query', operation.query);
					if (operation.variables) {
						url.searchParams.append(
							'variables',
							JSON.stringify(operation.variables)
						);
					}
					return {
						subscribe(sink) {
							const eventsource = new EventSource(url.toString(), {
								withCredentials: true,
							});
							eventsource.onmessage = (event) => {
								const data = JSON.parse(event.data);
								sink.next(data);
								if (eventsource.readyState === 2) {
									sink.complete();
								}
							};
							eventsource.onerror = (error) => {
								sink.error(error);
							};
							return {
								unsubscribe: () => eventsource.close(),
							};
						},
					};
				},
			}),
		],
	};
};

export const withUrql = (options: WithUrqlClientOptions) => {
	return withUrqlClient(createUrqlClient, options);
};
