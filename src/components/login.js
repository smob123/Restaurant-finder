import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleSignin() {
        this.props.loginState(true);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.logoContainer}>
                        <Image source={require('../images/logo.png')} style={styles.img} />
                    </View>
                    <View>
                        <TextInput placeholder='Username' style={styles.textInput} />
                        <TextInput placeholder='Password' style={styles.textInput} />

                        <View style={styles.buttonContainer}>
                            <Button title='Login' onPress={() => this.props.navigation.navigate('MainScreen')} color='red' />
                        </View>

                        <View style={styles.bottomView}>
                            <View><Text style={styles.blueTxt}>Signup</Text></View>
                            <View><Text style={styles.blueTxt}>Forgot password</Text></View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        marginBottom: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 150,
        height: 150,
        marginTop: '50%'
    },
    txtContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '50%',
        marginTop: '10%'
    },
    buttonContainer: {
        marginTop: '20%',
        marginBottom: '20%'
    },
    bottomView: {
        width: '100%',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blueTxt: {
        color: 'blue'
    }
});

Login.propTypes = {
    loginState: PropTypes.func
};
