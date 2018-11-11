import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Card from './CardView';
import Icon from 'react-native-vector-icons/Ionicons';

let data = []; //stores data to be passed to the card view
let rawData = []; //stores all the data from the api request
let start = 0; end = 10; //keep track of the number of elements in the list

export default class ListView extends Component {

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
    getListItems() {
        if (end <= rawData.length) {
            for (let i = start; i < end; i++) {
                data.push({
                    name: rawData[i].name,
                    type: rawData[i].type,
                    category: rawData[i].category,
                    address: rawData[i].location,
                    distance: rawData[i].distance,
                    hours: rawData[i].hours,
                    open: rawData[i].open,
                    id: i
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
                <ScrollView>
                    {!this.state.loading &&
                        this.state.data.map((item, index) => (
                            <View key={item.id} style={{ width: '100%', alignItems: 'center' }} >
                                <Card title={item.name} category={item.category} type={item.type}
                                    address={item.address} distance={item.distance} hours={item.hours}
                                    open={item.open} key={item.id} />
                            </View>
                        ))
                    }

                    <Button title='Load more' onPress={() => this.getListItems()} />
                </ScrollView>
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
        borderBottomColor: '#000',
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
