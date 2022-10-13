import {
	createClient,
	dedupExchange,
	fetchExchange,
	subscriptionExchange,
} from 'urql';
import { createClient as createWSClient } from 'graphql-ws';
import { cacheExchangeUpdates, hooks } from '@modules/graphql';
import { cacheExchange } from '@urql/exchange-graphcache';

const wsClient = createWSClient({
	url: 'ws:///graphql',
});

export const urqlClient = createClient({
	url: 'http:///graphql',
	fetchOptions: {
		credentials: 'include',
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			keys: {},
			resolvers: {},
			updates: {
				Mutation: {
					...cacheExchangeUpdates.Mutation,
					logout: (__, _, cache) => {
						cache.updateQuery(
							{
								query: hooks.LoggedInUserDocument,
							},
							() => {
								return {
									user: null,
									__typename: 'Query',
								};
							}
						);
					},
				},
				Subscription: {
					...cacheExchangeUpdates.Subscription,
				},
			},
		}),
		fetchExchange,
		subscriptionExchange({
			forwardSubscription: (operation) => ({
				subscribe: (sink) => ({
					unsubscribe: wsClient.subscribe(operation, sink),
				}),
			}),
		}),
	],
});
