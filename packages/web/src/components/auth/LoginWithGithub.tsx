import React from 'react';
import { hooks } from '@modules/graphql';
import OauthPopup from 'react-oauth-popup';
import clsx from 'clsx';
import { BsGithub } from 'react-icons/bs';

interface LoginWithGithubProps {}

const LoginWithGithub: React.FC<LoginWithGithubProps> = ({}) => {
	const [{ fetching }, loginWithGithub] = hooks.useGithubLoginMutation();

	const onCode = async (code: string) => {
		await loginWithGithub({ code });
	};

	return (
		<>
			<OauthPopup
				title='Login with Github'
				height={750}
				width={500}
				url={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process
					.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!}`}
				onCode={onCode}
				onClose={() => {}}>
				<button className={clsx(['btn btn-outline', fetching && 'loading'])}>
					<BsGithub size={22} />
					<span className='ml-3'>Continue with Github</span>
				</button>
			</OauthPopup>
		</>
	);
};

export default LoginWithGithub;
