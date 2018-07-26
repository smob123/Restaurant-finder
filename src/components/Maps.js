import React, {Component} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import getData from '../assets/fetchPlaces';
import PropTypes from 'prop-types';

let dataArray = [];
let markers = [];

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: this.props.location[0],
            locationFetched: this.props.locationFetched,
            loading: true
        }
    }

    componentWillMount() {
        if (this.state.locationFetched) {
            this.fetchData();
            this.setState({region: this.props.location[0]})
        }
    }

    async fetchData() {
        this.setState({loading: true});
        dataArray = await getData(this.state.region.latitude, this.state.region.longitude, 10);
        this.setMarkers(dataArray);
        return dataArray;
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

    refreshMarkers(r) {
        this.setState({region: r});
        this.fetchData();
    }

    render() {
        return (
                <View  style={styles.container}>
                
                    <MapView.Animated style={styles.map} region={this.state.region}
                             showsMyLocationButton={true}
                             showsUserLocation={true}
                             onRegionChangeComplete={e => this.refreshMarkers(e)}>
                
                        {markers}
                    </MapView.Animated>
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
    location: PropTypes.array
};

Map.propTypes = {
    locationFetched: PropTypes.bool
};
