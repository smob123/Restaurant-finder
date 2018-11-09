import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'; //SafeAreaView to optimize the app for phone nothces
import Login from './src/components/login';
import Main from './src/components/Main';
import { createStackNavigator } from 'react-navigation';

export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AppStackNavigator />
            </SafeAreaView>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    LoginScreen: Login,
    MainScreen: Main
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
