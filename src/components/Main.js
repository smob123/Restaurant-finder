import React, { Component } from 'react';
import { StyleSheet, Text, View, ToolbarAndroid, Alert, ActivityIndicator } from 'react-native';
import Menu from './NavMenu';
import Screens from './screens';

export default class Main extends Component {

    constructor() {
        super();
        this.state = {
            dataReceived: false,
            loading: true
        };
    }

    handleView(v) {
        this.setState({ currentView: v });
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ToolbarAndroid title='Restaurant finder' titleColor='white' style={styles.toolbar} />

                    {!this.state.loading &&
                        <Screens locationFethced={this.state.dataReceived}
                            view={this.state.currentView} loading={this.state.loading} />
                    }

                    {this.state.loading &&
                        <View style={styles.centerView}>
                            <ActivityIndicator size='large' />
                        </View>
                    }
                </View>

                <View style={{ flex: 0, marginTop: '16%' }}>
                    <Menu currentView={this.handleView.bind(this)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    toolbar: {
        width: '100%',
        height: '12%',
        backgroundColor: '#ff0000'
    },
    centerView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
