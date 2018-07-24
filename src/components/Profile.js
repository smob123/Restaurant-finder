import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Button } from 'react-native';

export default class Profile extends Component {
    render() {
        return(
                <View style={styles.container}>
                    <Image source={require('../images/profileImg.png')} style={{width: 130, height: 130}} />
                    <Text>Username</Text>
                    <Text>email</Text>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});
