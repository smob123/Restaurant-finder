import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import PropTypes from 'prop-types';
import Card from './CardView';

let data = [];
let rawData = [];
let start = 0; end = 10;

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
            this.getListItems();
        }
        else {
            this.setState({ loading: false });
        }
    }

    getListItems() {
        if (end <= rawData.length) {
            for (let i = start; i < end; i++) {
                data.push({ name: rawData[i].name, address: rawData[i].location, id: i });
            }
            start = end;
            end += 10;
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {!this.state.loading &&
                        data.map((item, index) => (
                            <View key={item.id} style={{ width: '100%', alignItems: 'center' }} >
                                <Card title={item.name} address={item.address} key={item.id} />
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
