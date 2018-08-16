import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Map from './Maps';
import ListView from './ListView';
import Profile from './Profile';
import PropTypes from 'prop-types';
import { Location, Permissions } from 'expo';
import getData from '../assets/fetchPlaces';
import Login from './login';

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

    componentDidUpdate() {
        if (this.state.active !== this.props.view) {
            this.setState({ active: this.props.view });
            this.setState({ dataFetched: true });
        }
    }

    setGeoLocation(region) {
        this.setState({
            location: region
        });
        this.fetchNearbyRestaurants();
    }

    async fetchNearbyRestaurants() {
        if (data.length === 0 || !this.state.dataFetched) {
            data = await getData(this.state.location.latitude, this.state.location.longitude, 100);
        }

        return data;
    }

    getGeoLocation() {
        return this.state.location;
    }

    render() {
        return (
            <View>
                {this.state.active === 'map' &&
                    <Map location={this.state.location}
                        fetchData={this.fetchNearbyRestaurants()}
                    passLocation={this.setGeoLocation.bind(this)}
                    getLocation={this.getGeoLocation.bind(this)} />
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
