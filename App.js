import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'; //SafeAreaView to optimize the app for phone nothces
import Login from './src/screens/login';
import Main from './src/screens/main';
import Signup from './src/screens/signup';
import { createStackNavigator } from 'react-navigation';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client'
import { Font } from 'expo';

//initialize stack navigator
const AppStackNavigator = createStackNavigator({
    LoginScreen: Login,
    SignupScreen: Signup,
    MainScreen: Main
});

//connect to the graphql server
const client = new ApolloClient({
    link: new createUploadLink({ uri: 'https://restaurant-finder-server.herokuapp.com/graphql?' }),
    cache: new InMemoryCache()
});

//margin to avoid status bar
const appTopMargin = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            fontsLoaded: false
        };
    }
    componentDidMount() {
        Font.loadAsync({
            'oswald': require('./assets/fonts/Oswald-SemiBold.ttf'),
            'quick-sand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
            'quick-sand-bold': require('./assets/fonts/Quicksand-Bold.ttf')
        }).then(() => this.setState({ fontsLoaded: true }));
    }

    render() {
        return (
            <ApolloProvider client={client}>
                {
                    this.state.fontsLoaded &&
                    <SafeAreaView style={styles.container}>
                        <AppStackNavigator />
                    </SafeAreaView>
                }
            </ApolloProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: appTopMargin
    }
});
