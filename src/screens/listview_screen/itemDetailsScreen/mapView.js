import React, { Component } from 'react';
import MapView from 'react-native-maps';
import themes from '../../../config/mapStyle';

export default class Map extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                customMapStyle={themes.light}
                region={{
                    latitude: this.props.lat,
                    longitude: this.props.lon,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}>
                <MapView.Marker
                    coordinate={{
                        latitude: this.props.lat,
                        longitude: this.props.lon
                    }}></MapView.Marker>
            </MapView>
        );
    }
}