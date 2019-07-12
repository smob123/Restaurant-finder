import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'; //SafeAreaView to optimize the app for phone nothces
import Nav from './Nav';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client'
import { Font } from 'expo';

//connect to the graphql server
const client = new ApolloClient({
    link: new createUploadLink({ uri: 'https://restaurant-finder-server.herokuapp.com/graphql?' }),
    cache: new InMemoryCache()
});

//margin to avoid status bar
const appTopMargin = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false
        };
    }

    componentDidMount() {
        //load custom fonts
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
                        <Nav />
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
