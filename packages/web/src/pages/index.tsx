import type { NextPage } from 'next';
import * as Tabs from '@radix-ui/react-tabs';
import { withUrql } from '../lib/urql';
import React from 'react';
import { useLoggedInUserQuery } from '../graphql';
import { useRouter } from 'next/router';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import LoginWithGithub from '../components/auth/LoginWithGithub';
import Seo from '../components/shared/Seo';
import Loader from '../components/shared/ui/Loader';

const HomePage: NextPage = ({}) => {
	const router = useRouter();
	const [{ fetching: fetchingUser, data }] = useLoggedInUserQuery();

	React.useEffect(() => {
		if (data?.user) {
			router.replace('/chat');
		}
	}, [data, router]);

	if (fetchingUser) return <Loader fullScreen={true} />;

	return (
		<>
			<Seo />
			<div className='max-w-xl mx-auto mt-10 md:mt-24 px-4 md:px-0'>
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
					<LoginWithGithub />
				</div>
			</div>
		</>
	);
};

export default withUrql({})(HomePage);
