import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, AsyncStorage } from 'react-native';

export default class Profile extends Component {


    constructor(props) {
        super(props);
    }

    async handleSignout() {
        await AsyncStorage.removeItem('user');
        this.props.screenProps.rootNav.goBack();
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.infoContainer}>
                    <Image source={require('../images/profileImg.png')} style={{ width: 130, height: 130 }} />
                    <Text>Username</Text>
                    <Text>email</Text>
                </View>

                <View style={styles.signoutContainer}>
                    <Button title='Signout' color='red' onPress={() => { this.handleSignout() }} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '98%'
    },
    infoContainer: {
        flex: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signoutContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
