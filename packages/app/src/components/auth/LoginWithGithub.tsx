import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { hooks } from '@modules/graphql';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export default function LoginWithGithub() {
	const [{}, login] = hooks.useGithubLoginMutation();

	const [request, response, promptAsync] = useAuthRequest(
		{
			clientId: Constants.manifest?.extra?.GITHUB_CLIENT_ID!,
			scopes: ['user:email'],
			redirectUri: makeRedirectUri({
				scheme: 'sreekarnv.app',
				useProxy: true,
			}),
		},
		{
			authorizationEndpoint: 'https://github.com/login/oauth/authorize',
			revocationEndpoint: `https://github.com/settings/connections/applications/${Constants.manifest?.extra?.GITHUB_CLIENT_ID}`,
		}
	);

	React.useEffect(() => {
		if (response?.type === 'success') {
			(async () => {
				const { code } = response.params;
				await login({ code });
			})();
		}
	}, [response, login]);

	return (
		<Button
			disabled={!request}
			title='Login With Github'
			onPress={() => {
				promptAsync({ useProxy: true });
			}}
		/>
	);
}
