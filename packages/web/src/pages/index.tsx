import type { NextPage } from 'next';
import * as Tabs from '@radix-ui/react-tabs';
import { withUrql } from '../lib/urql';
import React from 'react';
import { useLoggedInUserQuery } from '../graphql';
import { useRouter } from 'next/router';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const HomePage: NextPage = ({}) => {
	const router = useRouter();
	const [{ fetching: fetchingUser, data }] = useLoggedInUserQuery();

	React.useEffect(() => {
		if (data?.user) {
			router.replace('/chat');
		}
	}, [data, router]);

	if (fetchingUser)
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
			</div>
		</>
	);
};

export default withUrql({})(HomePage);
