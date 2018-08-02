import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Card from './CardView';
import getData from '../assets/fetchPlaces';

let data = [];
let rawData = [];

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        this.getItems();
    }

    async getItems() {
        if (data.length === 0) {
            rawData = await this.props.content;
            this.getListItems(rawData);
        }
        else {
            this.setState({loading: false});
        }
    }

    getListItems(dataArray) {
        for (let i = 0; i < 10; i++) {
            data.push({name: dataArray[i].name, address: dataArray[i].location, id: i});
        }
        this.setState({ loading: false });
    }

    render() {
        return (
                <View style={styles.container}>
                    <ScrollView>
                        { !this.state.loading &&
                          data.map((item, index) => (
                           <View key = {item.id} style={{width: '100%', alignItems: 'center'}} >
                             <Card title={item.name} address={item.address} key={item.id} />
                           </View>
                        ))
                    }
                    <Text>Load more...</Text>
                    </ScrollView>
                </View>
                                    );
                        }
            }
            const styles = StyleSheet.create({
                container: {
                    height: '100%'
                }
            });

            ListView.propTypes = {
                content: PropTypes.object
            };
