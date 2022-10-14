import 'dotenv/config';

export default {
	expo: {
		name: 'app',
		slug: 'app',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		scheme: 'app',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './assets/favicon.png',
		},
		extra: {
			API_URL: process.env.API_URL,
			WS_URL: process.env.WS_URL,
			GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		},
	},
};
