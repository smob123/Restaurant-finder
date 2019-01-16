import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'; //SafeAreaView to optimize the app for phone nothces
import Login from './src/components/login';
import Main from './src/components/Main';
import Signup from './src/components/Signup';
import { createStackNavigator } from 'react-navigation';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client'

const AppStackNavigator = createStackNavigator({
    LoginScreen: Login,
    SignupScreen: Signup,
    MainScreen: Main
});

const client = new ApolloClient({
    link: new createUploadLink({ uri: 'https://restaurant-finder-server.herokuapp.com/graphql?' }),
    cache: new InMemoryCache()
});

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <SafeAreaView style={styles.container}>
                    <AppStackNavigator />
                </SafeAreaView>
            </ApolloProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
