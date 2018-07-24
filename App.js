import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid, Alert } from 'react-native';
import Menu from './src/components/NavMenu';
import Map from './src/components/Maps';
import {Location, Permissions} from 'expo';

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

let currentLocation;

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            region: [{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 300,
                longitudeDelta: 300
            }],
        dataReceived: false
        };
    }

    componentDidMount() {
        this.getLocationPermission();
    }

    async getLocationPermission() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Permission was not granted!');
        }
        this.getUserLocation();
    }

    getUserLocation() {
        return getCurrentLocation().then(position => {
            if (position) {
                this.setState({
                    region: [{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }],
                dataReceived: true
                });
            }
        });
    }

    render() {
        return (
                <View style={{flex: 1}}>
                    <ToolbarAndroid title="My app" titleColor='white' style={styles.container} />
                    { this.state.dataReceived &&
                    <Menu location={this.state.region} />
                    }
                </View>
                            );
                }
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '10%',
            backgroundColor: '#ff0000'
        }
    });
