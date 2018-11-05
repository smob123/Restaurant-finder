import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Maps from './Maps';
import ListView from './ListView';
import Profile from './Profile';
import getData from '../assets/fetchPlaces';

let data = [];

class Main extends Component {

    // top bar navigation settings

    static navigationOptions = {
        title: 'Restaurant finder',
        headerStyle: {
            backgroundColor: 'red'
        },
        headerTintColor: '#fff', // text color
        headerLeft: null // remove return button
    }

    constructor() {
        super();
        this.state = {
            passLocation: this.setGeoLocation.bind(this),
            fetchData: this.fetchNearbyRestaurants.bind(this),
            location: null,
            region: { // default region credintials
                latitude: 0,
                longitude: 0,
                latitudeDelta: 300,
                longitudeDelta: 300
            },
            dataFetched: false // checks if fetching nearby restaurants is complete
        };
    }

    // gets called by Maps.js to get current user's location
    setGeoLocation(region) {
        this.setState({
            region
        });
    }

    // making an api request based on current user location
    async fetchNearbyRestaurants() {

        // if the data array is empty or the data hasn't been fetched yet
        if (data.length === 0 || !this.state.dataFetched) {
            // make the api request
            data = await getData(this.state.region.latitude, this.state.region.longitude, 100);
        }

        this.setState({ dataFetched: true });

        return data;
    }

    render() {
        return (
            <TabNavigator screenProps={this.state} />
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Map: {
        screen: Maps,
        navigationOptions: {
            // tab icon
            tabBarIcon: ({ tintColor }) => (
                <Icon name='md-map' color={tintColor} size={24} />
            )
        }
    },
    List: {
        screen: ListView,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                // tab icon
                <Icon name='md-list' color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                // tab icon
                <Icon name='md-person' color={tintColor} size={24} />
            )
        }
    }
},
    {
        // tab settings
        tabBarOptions: {
            // if tab is active set its color to lightblue
            activeTintColor: '#68b8ff',

            // if tab is inactive set its color to grey
            inactiveTintColor: 'gray'
        }
    });

export default Main;
