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

//initialize graphql mutation
const SignupMutation = gql`
     mutation Signup($userEmail: String!, $Username: String!, $userPassword: String!) {
        Signup(email: $userEmail, username: $Username, password: $userPassword) {
            username
            email
            jwt
        }
     }
`;

class Signup extends Component {

    //hide topbar
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            Username: '',
            userPassword: ''
        }
    }

    async handleSignup(e) {
        //get returned data from the server
        const userData = { username: e.Signup.username, email: e.Signup.email, jwt: e.Signup.jwt };

        try {
            //cache the data
            await AsyncStorage.setItem('user', JSON.stringify(userData));
        }
        catch (err) {
            console.log(err);
        }

        //transition to the apps main screen
        this.props.navigation.navigate('MainScreen');
    }

    render() {
        return (
            <Mutation mutation={SignupMutation} onError={e => alert(e)} onCompleted={(e) => this.handleSignup(e)}>
                {Signup => (
                    <KeyboardAvoidingView behavior='padding' style={styles.container}>
                        <Text style={styles.header}>Signup</Text>
                        <TextInput placeholder='Username' style={styles.textInput} onChangeText={e => this.setState({ Username: e })} />
                        <TextInput placeholder='E-mail' style={styles.textInput} onChangeText={e => this.setState({ userEmail: e })} />
                        <TextInput placeholder='Password' secureTextEntry={true} onChangeText={e => this.setState({ userPassword: e })}
                            style={styles.textInput} />

                        <View style={styles.buttonContainer}>
                            <Button title='Signup' onPress={async (e) => {
                                await Signup({
                                    variables: this.state
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
