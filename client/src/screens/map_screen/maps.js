import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapCalloutCard from './components/mapCalloutCard';
import themes from '../../config/mapStyle';
import getRout from '../../config/fetchRoutes';

let dataArray = []; //stores data from the api request
let markers = []; //stores all the fetched markers

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
            markers: [], //map markers that are displyed on the map
            rout: [], //the rout from the user's location to the chosen restaurant
            loading: true
        }
    }

    componentWillMount() {
        // check location permissions
        this.getLocationPermission();
    }

    async getLocationPermission() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Permission was not granted!');
        }
        const location = await Location.getCurrentPositionAsync({});
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

        //if data has not already been fetched
        if (this.state.markers.length === 0) {
            this.fetchData(); //make an api request
        }
        else {
            //otherwise show the stored data
            this.setState({ loading: false });
        }
    }

    async fetchData() {
        // get api response from Main.js
        dataArray = await this.props.screenProps.fetchData();
        this.setMarkers(dataArray);
    }

    async setMarkers(data) {
        let current; // current marker
        markers = []; // make sure that the markers array is empty

        for (let i = 0; i < data.length; i++) {
            current = {
                latitude: data[i].lat,
                longitude: data[i].lon
            };

            // push current credintials into a marker, and set its callout card data
            markers.push(<MapView.Marker coordinate={current} key={i}>
                <MapView.Callout onPress={() => this.setRout(markers[i])} >
                    <MapCalloutCard name={data[i].title} location={data[i].address} />
                </MapView.Callout>
            </MapView.Marker>);
        }

        // when done set loading to false
        this.setState({ markers, loading: false });
    }

    async setRout(marker) {
        let polylineCoords, rout, filteredMarkersList;

        //if the rout object is not set
        if (this.state.rout.props === undefined) {
            const userLocation = { 'latitude': this.state.region.latitude, 'longitude': this.state.region.longitude };
            const markerCoords = marker.props.coordinate;

            polylineCoords = await getRout(userLocation, markerCoords); //fetch the points to draw the polyline

            //set the rout object
            rout = <MapView.Polyline
                coordinates={polylineCoords}
                strokeWidth={10}
                strokeColor={'orange'} />;

            //set the filtered list to only show the sepcefied marker
            filteredMarkersList = [marker];
        }
        else {
            //otherwise reset the objects to their previous values
            rout = [];
            filteredMarkersList = markers;
        }

        this.setState({
            rout,
            markers: filteredMarkersList
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} region={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    customMapStyle={themes.light}
                >
                    {!this.state.loading &&
                        this.state.markers}
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
