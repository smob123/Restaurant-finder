import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';
import getData from '../assets/fetchPlaces';
import PropTypes from 'prop-types';
import {Location, Permissions} from 'expo';

let dataArray = [];
let markers = [];

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 300,
                longitudeDelta: 300},
                loading: true
        }
    }

    componentWillMount() {
     this.getLocationPermission();
    }
    
    async getLocationPermission() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Permission was not granted!');
        }
            let location = await Location.getCurrentPositionAsync({});
            this.setState({
                region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01}});
        
            await this.props.passLocation(this.state.region);
            this.fetchData();
    }

    async fetchData() {
        dataArray = await this.props.fetchData;
        this.setMarkers(dataArray);
    }

    setMarkers(data) {
        let current;
        markers = [];
        for (let i = 0; i < data.length; i++) {
            current = {
                latitude: data[i].lat,
                longitude: data[i].lon
            };
            markers.push(<MapView.Marker coordinate={current} key={i}>
                <MapView.Callout>
                    <Text>{data[i].name}</Text>
                    <Text>{data[i].location}</Text>
                </MapView.Callout>
            </MapView.Marker>);
        }
        this.setState({loading: false});
    }

    render() {
        return (
                <View  style={styles.container}>
                
                    <MapView style={styles.map} region={this.state.region}
                             showsMyLocationButton={true}
                             showsUserLocation={true}
                             >
                
                        {markers}
                    </MapView>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

Map.propTypes = {
    fetchData: PropTypes.array
};

Map.propTypes = {
    passLocation: PropTypes.func
};
