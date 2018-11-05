import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { Location, Permissions } from 'expo';
import MapCalloutCard from '../assets/mapCalloutCard';

let dataArray = []; // stores data from the api request

let markers = []; // stores marker data to be dislayed on the map

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
            loading: true // waits for data to be retrived from the api request
        }
    }

    // check if data was already fetched before

    componentWillMount() {
        // if there are no markers stored
        if (markers.length === 0) {
            // check location permissions
            this.getLocationPermission();
        }
        else {
            this.setState({
                region: this.props.screenProps.getLocation(), // update the default location
                loading: false
            });
        }
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
        this.fetchData();
    }

    async fetchData() {
        // get api response from Main.js
        dataArray = await this.props.screenProps.fetchData();
        this.setMarkers(dataArray);
    }

    setMarkers(data) {
        let current; // current marker
        markers = []; // make sure that the markers array is empty

        for (let i = 0; i < data.length; i++) {
            current = {
                latitude: data[i].lat,
                longitude: data[i].lon
            };

            // push current credintials into a marker, and set its callout card data
            markers.push(<MapView.Marker coordinate={current} key={i}>
                <MapView.Callout>
                    <MapCalloutCard name={data[i].name} location={data[i].location} />
                </MapView.Callout>
            </MapView.Marker>);
        }

        // when done set loading to false
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.container}>

                <MapView style={styles.map} region={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
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

Map.propTypes = {
    getLocation: PropTypes.func
};
