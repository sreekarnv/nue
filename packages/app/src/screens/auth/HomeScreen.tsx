import { Button, Image, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import HomeImage from '../../../assets/home.png';
import LoginWithGithub from '../../components/auth/LoginWithGithub';
import { AuthScreenProp } from '../../navigation/AuthNavigator';

const { width } = Dimensions.get('window');

interface HomeScreenProps extends AuthScreenProp<'Home'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const { theme } = useTheme();

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
				<View>
					<Text h3 style={{ textAlign: 'center', marginTop: 25 }}>
						{' '}
						Welcome to Nue
					</Text>
					<Image
						source={HomeImage}
						style={{ width, height: width, marginBottom: 20 }}
					/>
					<View style={{ paddingHorizontal: 20 }}>
						<View style={{ marginBottom: 10 }}>
							<Button
								onPress={() => navigation.push('Signup')}
								icon={{
									name: 'account-circle-outline',
									type: 'material-community',
									color: 'white',
									style: {
										marginRight: 8,
									},
								}}
								size='lg'>
								Sign Up With Email
							</Button>
						</View>
						<View style={{ marginBottom: 30 }}>
							<Button
								onPress={() => navigation.push('Login')}
								icon={{
									name: 'email',
									type: 'fontisto',
									style: {
										marginRight: 15,
									},
									color: theme.colors.primary,
								}}
								size='lg'
								type='outline'>
								Log In With Email
							</Button>
						</View>
						<View>
							<LoginWithGithub />
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

export default HomeScreen;
