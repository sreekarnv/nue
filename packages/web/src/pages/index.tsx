import type { NextPage } from 'next';
import * as Tabs from '@radix-ui/react-tabs';
import { withUrql } from '../lib/urql';
import React from 'react';
import { hooks } from '@modules/graphql';
import { useRouter } from 'next/router';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import LoginWithGithub from '../components/auth/LoginWithGithub';
import Seo from '../components/shared/Seo';
import Loader from '../components/shared/ui/Loader';
import Footer from '../components/shared/Footer';
import Image from 'next/image';

const HomePage: NextPage = ({}) => {
	const router = useRouter();
	const [{ fetching: fetchingUser, data }] = hooks.useLoggedInUserQuery();

	React.useEffect(() => {
		if (data?.user) {
			router.replace('/chat');
		}
	}, [data, router]);

	if (fetchingUser) return <Loader fullScreen={true} />;

	return (
		<>
			<Seo title={'Home'} />

			<div className='absolute top-0 left-0 w-full h-full z-0'>
				<span className='md:inline-block hidden'>
					<Image src='/home.png' layout='fill' alt='home background' />
				</span>
			</div>

			<main className='min-h-[100vh] flex flex-col md:justify-between bg-white md:bg-primary-light'>
				<section className='max-w-lg mx-auto mt-10 md:mt-24 px-4 w-full bg-white md:px-5 md:py-6 rounded-3xl md:shadow-lg z-20'>
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
						<p className='text-center'>- Or Sign in with -</p>
					</div>

					<div className='py-5 flex justify-center flex-col gap-3 items-center'>
						<LoginWithGithub />
					</div>
				</section>

				<Footer className='pt-20 md:pt-0' />
			</main>
		</>
	);
};

export default withUrql({})(HomePage);
