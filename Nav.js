import Login from './src/screens/login';
import Main from './src/screens/main';
import Signup from './src/screens/signup';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

//initialize stack navigator
const AppSwitchNavigator = createSwitchNavigator({
    LoginScreen: Login,
    SignupScreen: Signup,
    MainScreen: Main
});

export default createAppContainer(AppSwitchNavigator);
