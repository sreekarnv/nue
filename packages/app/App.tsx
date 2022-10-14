import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import Navigator from './src/navigation/Navigator';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'urql';
import { urqlClient } from './src/lib/urql';
import { theme } from './src/lib/theme';

export default function App() {
	return (
		<>
			<Provider value={urqlClient}>
				<NavigationContainer>
					<ThemeProvider theme={theme}>
						<StatusBar style='dark' />
						<Navigator />
					</ThemeProvider>
				</NavigationContainer>
			</Provider>
		</>
	);
}
