import React, { Component } from 'react';
import { StyleSheet, View, Image, ImageBackground, Button, AsyncStorage } from 'react-native';
import MText from '../../components/myTextView';

const profileImageSize = 130;

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }

        this.getUserInfo();
    }

    async getUserInfo() {
        const data = JSON.parse(await AsyncStorage.getItem('user'));

        this.setState({ username: data.username });
    }

    async handleSignout() {
        await AsyncStorage.removeItem('user');
        this.props.screenProps.rootNav.navigate('LoginScreen');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <ImageBackground source={require('../../images/table.jpeg')} style={{ width: '100%', height: '100%' }}>
                        <View style={styles.infoContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image source={require('../../images/profileImg.png')} style={styles.profileImage} />
                            </View>
                            <MText fontFamily='oswald' style={styles.username}>
                                {this.state.username}
                            </MText>
                        </View>
                    </ImageBackground>
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
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '45%'
    },
    headerImage: {
        flex: 1,
        width: null,
        height: null
    },
    profileImageContainer: {
        backgroundColor: '#c1c1c1',
        width: profileImageSize,
        height: profileImageSize,
        borderRadius: profileImageSize / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#efefef'
    },
    profileImage: {
        flex: 1,
        width: null,
        height: null
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    username: {
        fontSize: 25,
        color: '#f1f1f1',
        marginTop: 5
    },
    signoutContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
