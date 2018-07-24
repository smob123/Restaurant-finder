import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Card from './CardView';
import getData from '../assets/fetchPlaces';

let data = [];
let cards = [];

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location[0],
            loading: true
        };
    }

    componentDidMount() {
        this.getNearByRestturants();
    }

    async getNearByRestturants() {
        let d = await getData(this.state.location.latitude, this.state.location.longitude, 50);
        
        for(let i = 0; i < d.length; i++) {
            data.push({name: d[i].name, address: d[i].location, id: i});
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
        location: PropTypes.array
    };
