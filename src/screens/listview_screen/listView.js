import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Button, TextInput, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Card from './components/cardView';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPlaceInfo } from '../../config/fetchPlaces';

let data = []; //stores data to be passed to the card view
let rawData = []; //stores all the data from the api request
let start = 0; end = 10; //keep track of the number of elements in the list

export default class ListView extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        };
    }

    componentWillMount() {
        this.getItems();
    }

    /* gets api data from main.js */
    async getItems() {
        //if the data array is empty
        if (data.length === 0) {
            //make a request
            rawData = await this.props.screenProps.fetchData();
            this.getListItems();
        }
        else {
            //otherwise display the data array
            this.setState({ loading: false });
        }
    }

    /* add 10 elements to the list at a time */
    async getListItems() {
        if (end <= rawData.length) {
            for (let i = start; i < end; i++) {
                let place = await getPlaceInfo(rawData[i].lat, rawData[i].lon, rawData[i].title);

                let placeInfo = { ...rawData[i], ...place };

                data.push({
                    id: i,
                    placeInfo: placeInfo
                });
            }

            //the start index for the next iteration is the end index for the current one
            start = end;
            end += 10;
        }
        this.setState({ data, loading: false });
    }

    filterList(txt) {
        //find the items the match the serch term
        const filteredList = data.filter((item) => {
            const currentItem = item.name.toUpperCase();
            const searchTerm = txt.toUpperCase();

            return currentItem.indexOf(searchTerm) > -1; //return all items that match the search term
        });

        this.setState({ data: filteredList });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.serachBarContainer}>
                    <Icon name='md-search' style={styles.searchIcon} />
                    <TextInput placeholder='Search' style={styles.searchBar} onChangeText={(txt) => this.filterList(txt)} />
                </View>
                {
                    this.state.loading ? <ActivityIndicator size='large' />
                        :
                        <ScrollView>
                            {
                                this.state.data.map((item, index) => (
                                    <View key={item.placeInfo.placeId + index.toString()} style={{ width: '100%', alignItems: 'center' }} >
                                        <Card data={item} key={item.placeInfo.placeId} navigation={this.props.navigation} />
                                    </View>
                                ))
                            }

                            < Button title='Load more' onPress={() => this.getListItems()} />
                        </ScrollView>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    serachBarContainer: {
        width: '100%',
        height: 40,
        borderBottomColor: '#787878',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    searchIcon: {
        fontSize: 25,
        color: 'gray'
    },
    searchBar: {
        fontFamily: 'oswald',
        width: '100%',
        fontSize: 20,
        paddingHorizontal: 10
    },
    buttonStyle: {
        width: '50%',
        marginTop: '5%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonTxt: {
        color: 'white',
        marginTop: '5%'
    }
});

ListView.propTypes = {
    content: PropTypes.object
};
