import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/components/login';
import Main from './src/components/Main';
import { createStackNavigator } from 'react-navigation';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppStackNavigator />
            </View>
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
