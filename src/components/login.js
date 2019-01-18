import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { graphql, Mutation } from 'react-apollo';

const LoginMutation = gql`
     mutation Login($userEmail: String!, $userPassword: String!) {
        Login(email: $userEmail, password: $userPassword) {
            email
            jwt
        }
     }
`;

class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: ''
        }
    }

    async componentWillMount() {
        const data = JSON.parse(await AsyncStorage.getItem('user'));
        if (data) {
            this.props.navigation.navigate('MainScreen');
        }
    }

    async handleSignin(e) {
        const userData = { email: e.Login.email, jwt: e.Login.jwt };

        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
        }
        catch (err) {
            console.log(err);
        }
        this.props.navigation.navigate('MainScreen');
    }

    render() {
        return (
            <Mutation mutation={LoginMutation} onError={(e) => alert(e)} onCompleted={(e) => this.handleSignin(e)}>
                {Login => (
                    <View style={styles.container}>
                        <View>
                            <View style={styles.logoContainer}>
                                <Image source={require('../images/logo.png')} style={styles.img} />
                            </View>
                            <View>
                                <KeyboardAvoidingView behavior='padding'>
                                    <TextInput placeholder='E-mail' style={styles.textInput} onChangeText={e => this.setState({ userEmail: e })} />
                                    <TextInput placeholder='Password' secureTextEntry={true} onChangeText={e => this.setState({ userPassword: e })}
                                        style={styles.textInput} />

                                    <View style={styles.buttonContainer}>
                                        <Button title='Login' onPress={async (e) => {
                                            await Login({
                                                variables: this.state
                                            })
                                        }}
                                            color='red' />
                                    </View>
                                </KeyboardAvoidingView>

                                <View style={styles.bottomView}>
                                    <View>
                                        <Text>
                                            Need an account? &nbsp;
                                            <Text style={styles.blueTxt} onPress={() => this.props.navigation.navigate('SignupScreen')}>
                                                Signup here
                                            </Text>
                                        </Text>
                                    </View>
                                    <View><Text style={styles.blueTxt}>Forgot password</Text></View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </Mutation>
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
    textInput: {
        width: 200,
        marginTop: '10%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#787878',
        paddingHorizontal: 5

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
        color: '#2c73e8',
        marginTop: 10
    }
});

Login.propTypes = {
    loginState: PropTypes.func
};

export default graphql(LoginMutation)(Login);
