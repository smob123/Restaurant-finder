import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid, Alert, ActivityIndicator } from 'react-native';
import Menu from './src/components/NavMenu';
import Screens from './src/components/screens';
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
            currentView: '',
            initRegion: [{
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 300,
                    longitudeDelta: 300
                }],
            region: [{
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 300,
                    longitudeDelta: 300
                }],

            dataReceived: false,
            loading: true
        };
    }

    componentWillMount() {
        this.getLocationPermission();
    }

    handleView(v) {
        this.setState({currentView: v});
        this.setState({loading: false});
    }

    async getLocationPermission() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Permission was not granted!');
        } else {
            this.getUserLocation();
        }
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
                <View style={styles.container}>
                    <View style={{flex: 1}}>
                        <ToolbarAndroid title='My app' titleColor='white' style={styles.toolbar} />
                
                        { !this.state.loading &&
                                                <Screens location={this.state.region}
                                                         locationFethced={this.state.dataReceived} 
                                                         view={this.state.currentView} loading={this.state.loading} />
                        }
                
                        { this.state.loading || !this.state.dataReceived &&
                                                <View style={styles.centerView}>
                                                    <ActivityIndicator size='large' />        
                                                </View>
                        }
                    </View>
                
                    <View style={{flex: 0}}>
                        <Menu currentView={this.handleView.bind(this)} />
                    </View>
                </View>
                                );
                    }
                }

        const styles = StyleSheet.create({
            container: {
                width: '100%',
                height: '100%',
                backgroundColor: '#fff'
            },
            toolbar: {
                width: '100%',
                height: '12%',
                backgroundColor: '#ff0000'
            },
            centerView: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }
        });
