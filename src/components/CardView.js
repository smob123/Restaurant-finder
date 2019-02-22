import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get('screen').width;
let price = 'N/A';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            img: require('../images/food.jpeg'), //list item's logo
            title: this.props.title, //the name of the restaurant
            address: this.props.address, //the restaurant's address
            distance: this.props.distance, //its distance from the user's current location
            category: this.props.category, //what type of restaurant is it
            type: this.props.type, //type of food
            hours: this.props.hours, //its business hours
            open: this.props.open, //is the restaurant currently open
            placeInfo: this.props.placeInfo
        });
    }

    componentWillMount() {
        if (this.props.placeInfo !== undefined) {
            this.setLogo(this.state.placeInfo.image);
            price = this.state.placeInfo.price;
        }
    }

    setLogo(imageUrl) {
        if (imageUrl !== '') {
            this.setState({ img: ({ uri: imageUrl }) });
        }
    }

    /* checks if the restaurant is currently open or not */
    isOpen() {
        if (this.state.open !== undefined) {
            if (this.state.open) {
                return (
                    <Text style={[{ color: 'green' }, styles.centeredText]}>Open</Text>
                );
            }
            else {
                return (
                    <Text style={[{ color: 'red' }, styles.centeredText]}>Closed</Text>
                );
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: deviceWidth * 0.40, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={this.state.img} style={styles.logo} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[styles.title, { marginBottom: 10 }]}>{this.state.title}</Text>
                        <Text style={[styles.address, { marginBottom: 5 }]}>{this.state.address}</Text>

                        <Text style={{ position: 'absolute', bottom: 0, left: 5, fontWeight: '600', color: 'orange' }}>
                            {price}
                        </Text>
                        <Text style={[styles.address, { position: 'absolute', bottom: 0, right: 0, fontWeight: '600', color: 'orange' }]}>
                            <EvilIcons name='location' style={{ fontSize: 15, fontWeight: '600', color: 'orange' }} />
                            {this.state.distance}m
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    logo: {
        flex: 1,
        height: 150,
        marginLeft: 5
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#474747'
    },
    address: {
        color: '#a0a0a0',
        fontWeight: '400',
        fontSize: 15
    },
    textContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 10
    }
});

Card.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string,
    type: PropTypes.string,
    hours: PropTypes.string,
    open: PropTypes.bool,
    placeInfo: PropTypes.object
};
