import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Maps from './map_screen/maps';
import ListView from './listview_screen/listView';
import ListItemDetails from './listview_screen/itemDetailsScreen/listItemDetailsScreen';
import Profile from './profile_screen/profile';
import { getRestaurants } from '../config/fetchPlaces';

let data = [];

export default class Main extends Component {

    // top bar navigation settings
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            passLocation: this.setGeoLocation.bind(this),
            getLocation: this.getGeoLocation.bind(this),
            fetchData: this.fetchNearbyRestaurants.bind(this),
            location: null,
            region: { // default region credintials
                latitude: 0,
                longitude: 0,
                latitudeDelta: 300,
                longitudeDelta: 300
            },
            dataFetched: false, // checks if fetching nearby restaurants is complete
            rootNav: this.props.navigation
        };
    }

    // gets called by Maps.js to get current user's location
    setGeoLocation(region) {
        this.setState({
            region
        });
    }

    getGeoLocation() {
        return this.state.region;
    }

    // making an api request based on current user location
    async fetchNearbyRestaurants() {

        // if the data array is empty or the data hasn't been fetched yet
        if (data.length === 0 || !this.state.dataFetched) {
            // make the api request
            data = await getRestaurants(this.state.region.latitude, this.state.region.longitude);
        }

        this.setState({ dataFetched: true });

        return data;
    }

    render() {
        return (
            <AppContainer screenProps={this.state} />
        );
    }
}

//add listView, and listItem in their own StackNavigator, to allow navigation between the two screens
const AppStackNavigator = createStackNavigator({
    ListView: ListView,
    ListItem: ListItemDetails
});

//TabNavigator; ie, BottomNavigationBar
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
        screen: AppStackNavigator,
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

const AppContainer = createAppContainer(TabNavigator);
