import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/components/login';
import Main from './src/components/Main';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false
        };
    }

    handleLogin(val) {
        this.setState({ loggedIn: val });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    !this.state.loggedIn &&
                    <Login loginState={this.handleLogin.bind(this)} />
                }
                {this.state.loggedIn &&
                    <Main />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    }
});
