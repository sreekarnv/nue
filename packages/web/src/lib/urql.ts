import { cacheExchange } from '@urql/exchange-graphcache';
import {
	dedupExchange,
	Exchange,
	fetchExchange,
	subscriptionExchange,
} from 'urql';
import { SSRExchange, withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import { NextPageContext } from 'next';
import { Client, createClient as createWSClient } from 'graphql-ws';
import { cacheExchangeUpdates } from '@modules/graphql';

export const createUrqlClient = (
	ssrExchange: SSRExchange,
	ctx?: NextPageContext
): any => {
	let headers;
	let wsClient: Client;

	if (typeof window === 'undefined') {
		headers = ctx?.req?.headers;
	} else {
		wsClient = createWSClient({
			url: process.env.NEXT_PUBLIC_SOCKET_URL!,
		});
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
					Mutation: {
						...cacheExchangeUpdates.Mutation,
						logout: () => {
							if (typeof window !== 'undefined') {
								window.location.href = '/';
							}
						},
					},
					Subscription: {
						...cacheExchangeUpdates.Subscription,
					},
				},
			}),
			ssrExchange,
			fetchExchange,
			subscriptionExchange({
				forwardSubscription: (operation) => ({
					subscribe: (sink) => ({
						unsubscribe: wsClient.subscribe(operation, sink),
					}),
				}),
			}),
		],
	};
};

export const withUrql = (options: WithUrqlClientOptions) => {
	return withUrqlClient(createUrqlClient, options);
};
