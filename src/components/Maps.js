import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { Location, Permissions } from 'expo';
import MapCalloutCard from '../assets/mapCalloutCard';
import getRout from '../assets/fetchRoutes';

let dataArray = []; // stores data from the api request

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // initial region settings
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 300,
                longitudeDelta: 300
            },
            markers: [], //map markers that display restaurant locations
            rout: [], //the rout from the user's location to the chosen restaurant
            loading: true // waits for data to be retrived from the api request
        }
    }

    // check if data was already fetched before

    componentWillMount() {
        // check location permissions
        this.getLocationPermission();
    }

    async getLocationPermission() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Permission was not granted!');
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
        });

        // pass current location data to Main.js
        await this.props.screenProps.passLocation(this.state.region);

        if (this.state.markers.length === 0) {
            this.fetchData();
        }
    }

    async fetchData() {
        // get api response from Main.js
        dataArray = await this.props.screenProps.fetchData();
        this.setMarkers(dataArray);
    }

    async setMarkers(data) {
        let current; // current marker
        this.setState({ markers: [] }); // make sure that the markers array is empty

        const l = { 'latitude': this.state.region.latitude, 'longitude': this.state.region.longitude };
        for (let i = 0; i < data.length; i++) {
            current = {
                latitude: data[i].lat,
                longitude: data[i].lon
            };

            const rout = await getRout(l, current);

            // push current credintials into a marker, and set its callout card data
            this.state.markers.push(<MapView.Marker coordinate={current} key={i}>
                <MapView.Callout onPress={() => { this.setRout(rout) }}>
                    <MapCalloutCard name={data[i].name} location={data[i].location} />
                </MapView.Callout>
            </MapView.Marker>);
        }

        // when done set loading to false
        this.setState({ loading: false });
    }

    setRout(rout) {
        this.setState({
            rout: <MapView.Polyline
                coordinates={rout}
                strokeWidth={10}
                strokeColor={'blue'} />
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} region={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    {this.state.markers}
                    {this.state.rout}

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

Map.propTypes = {
    getLocation: PropTypes.func
};
