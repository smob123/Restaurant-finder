import React, {Component} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Map from './Maps';
import ListView from './ListView';
import Profile from './Profile';
import PropTypes from 'prop-types';
import {Location, Permissions} from 'expo';
import getData from '../assets/fetchPlaces';

let data = [];

export default class Screens extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.view,
            location: {
                latitude: 0,
                longitude: 0
            },
            dataFetched: false
        };
    }

    componentWillMount() {
        //this.getLocationPermission();
    }

    componentDidUpdate() {
        if (this.state.active !== this.props.view) {
            this.setState({active: this.props.view});
            this.setState({dataFetched: true});
        }
    }

    getGeoLocation(location) {
        this.setState({
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });
        this.fetchNearbyRestaurants();
    }

    async fetchNearbyRestaurants() {
        if (data.length === 0 || !this.state.dataFetched) {
            data = await getData(this.state.location.latitude, this.state.location.longitude, 100);
        }
        
        return data;
    }

    render() {
        return(
                <View>
                    { this.state.active === 'map' &&
                                    <Map location={this.state.location} 
                                         fetchData={this.fetchNearbyRestaurants()}
                                         passLocation={this.getGeoLocation.bind(this)} />
                    }
                
                    {
                        this.state.active === 'list' &&
                                    <ListView location={this.state.location}
                                     content={this.fetchNearbyRestaurants()} />
                    }
                
                    {
                        this.state.active === 'profile' &&
                                    <Profile />
                    }
                </View>
                );
    }
}

Screens.propTypes = {
    view: PropTypes.string
};

Screens.propTypes = {
    location: PropTypes.array
};

Screens.propTypes = {
    locationFetched: PropTypes.bool
};

Screens.propTypes = {
    loading: PropTypes.bool
};