import type { NextPage } from 'next';
import * as Tabs from '@radix-ui/react-tabs';
import { withUrql } from '../lib/urql';
import React from 'react';
import { useGithubLoginMutation, useLoggedInUserQuery } from '../graphql';
import { useRouter } from 'next/router';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import OauthPopup from 'react-oauth-popup';

const HomePage: NextPage = ({}) => {
	const router = useRouter();
	const [{ fetching: fetchingUser, data }] = useLoggedInUserQuery();
	const [{ fetching: fetchingGithub }, loginWithGithub] =
		useGithubLoginMutation();

	React.useEffect(() => {
		if (data?.user) {
			router.replace('/chat');
		}
	}, [data, router]);

	const onCode = async (code: string) => {
		await loginWithGithub({ code });
	};

	if (fetchingUser || fetchingGithub)
		return (
			<>
				<div>Loading...</div>
			</>
		);

	return (
		<>
			<div className='max-w-xl mx-auto mt-24 px-4 md:px-0'>
				<Tabs.Root defaultValue='login'>
					<Tabs.List
						className='tabs flex justify-center'
						aria-label='tabs example'>
						<Tabs.Trigger
							className='auth-tab tab tab-lg tab-lifted'
							value='login'>
							Log In
						</Tabs.Trigger>
						<Tabs.Trigger
							className='auth-tab tab tab-lg tab-lifted'
							value='signup'>
							Sign Up
						</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value='login'>
						<LoginForm />
					</Tabs.Content>
					<Tabs.Content value='signup'>
						<SignupForm />
					</Tabs.Content>
				</Tabs.Root>

				<div className='py-5'>
					<p className='text-center'>OR</p>
				</div>

				<div className='py-5 flex justify-center flex-col gap-3 items-center'>
					<OauthPopup
						title='Login with Github'
						height={750}
						width={500}
						url={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process
							.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!}`}
						onCode={onCode}
						onClose={() => {}}>
						<button className='btn btn-primary'>Continue with Github</button>
					</OauthPopup>
				</div>
			</div>
		</>
	);
};

export default withUrql({})(HomePage);
