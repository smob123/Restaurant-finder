import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import { gql } from 'apollo-boost';
import { graphql, Mutation } from 'react-apollo';

const SignupMutation = gql`
     mutation Signup($userEmail: String!, $Username: String!, $userPassword: String!) {
        Signup(email: $userEmail, username: $Username, password: $userPassword) {
            email
            jwt
        }
     }
`;

class Signup extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    async handleSignup(e) {
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
            <Mutation mutation={SignupMutation} onError={e => console.log(e)} onCompleted={(e) => this.handleSignup(e)}>
                {Signup => (
                    <KeyboardAvoidingView behavior='padding' style={styles.container}>
                        <Text style={styles.header}>Signup</Text>
                        <TextInput placeholder='Username' style={styles.textInput} onChange={e => this.setState({ username: e })} />
                        <TextInput placeholder='E-mail' style={styles.textInput} onChangeText={e => this.setState({ email: e })} />
                        <TextInput placeholder='Password' secureTextEntry={true} onChangeText={e => this.setState({ password: e })}
                            style={styles.textInput} />

                        <View style={styles.buttonContainer}>
                            <Button title='Signup' onPress={async (e) => {
                                await Signup({
                                    variables: {
                                        Username: this.state.username,
                                        userEmail: this.state.email,
                                        userPassword: this.state.password
                                    }
                                })
                            }}
                                color='red' />
                        </View>
                    </KeyboardAvoidingView>
                )}
            </Mutation>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: '700'
    },
    textInput: {
        width: 350,
        marginTop: '10%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#787878',
        paddingHorizontal: 5

    },
    buttonContainer: {
        marginTop: '5%',
        width: 250
    }
});

export default graphql(SignupMutation)(Signup);
