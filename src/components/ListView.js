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
        rawData = await this.props.content;
        this.getListItems(rawData);
    }

    getListItems(dataArray) {
        if (data.length === 0) {
            for (let i = 0; i < dataArray.length; i++) {
                data.push({name: dataArray[i].name, address: dataArray[i].location, id: i});
            }
        }
        this.setState({loading: false});
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
