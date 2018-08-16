import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleSignin() {
        this.props.loginState(true);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../images/logo.png')} style={styles.img} />
                </View>
                <View style={styles.txtContainer}>
                    <TextInput placeholder='Username' style={styles.textInput} />
                    <TextInput placeholder='Password' style={styles.textInput} />

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleSignin()} >
                        <Text style={styles.buttonTxt}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.bottomView}>
                        <View><Text style={styles.blueTxt}>Signup</Text></View>
                        <View><Text style={styles.blueTxt}>Forgot password</Text></View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    textInput: {
        width: '50%'
    },
    logoContainer: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 150,
        height: 150,
        marginTop: '50%'
    },
    txtContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: 'red',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    buttonTxt: {
        marginTop: '10%',
        color: 'white',
        fontWeight: '700'
    },
    bottomView: {
        height: '5%',
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blueTxt: {
        color: 'blue'
    }
});

Login.propTypes = {
    loginState: PropTypes.func
};
