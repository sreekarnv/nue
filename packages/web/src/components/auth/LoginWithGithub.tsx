import React from 'react';
import { useGithubLoginMutation } from '../../graphql';
import OauthPopup from 'react-oauth-popup';
import clsx from 'clsx';

interface LoginWithGithubProps {}

const LoginWithGithub: React.FC<LoginWithGithubProps> = ({}) => {
	const [{ fetching }, loginWithGithub] = useGithubLoginMutation();

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
				<button className={clsx(['btn btn-primary', fetching && 'loading'])}>
					Continue with Github
				</button>
			</OauthPopup>
		</>
	);
};

export default LoginWithGithub;
