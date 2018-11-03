import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Button } from 'react-native';

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Image source={require('../images/profileImg.png')} style={{ width: 130, height: 130 }} />
                    <Text>Username</Text>
                    <Text>email</Text>

                    <TouchableOpacity style={styles.signoutButton}>
                        <Text style={styles.whiteTxt}>Favourites</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.signoutButton}>
                        <Text style={styles.whiteTxt}>Signout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    infoContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signoutContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signoutButton: {
        backgroundColor: 'red',
        width: '30%',
        alignItems: 'center'
    },
    whiteTxt: {
        color: 'white'
    }
});
