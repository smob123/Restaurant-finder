import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import MText from '../../../components/myTextView';
import PropTypes from 'prop-types';

let price = 'N/A';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            img: require('../../../images/food.jpeg'), //list item's logo
            title: this.props.title, //the name of the restaurant
            address: this.props.address, //the restaurant's address
            distance: this.props.distance, //its distance from the user's current location
            category: this.props.category, //what type of restaurant is it
            type: this.props.type, //type of food
            hours: this.props.hours, //its business hours
            open: this.props.open, //is the restaurant currently open
            placeInfo: this.props.placeInfo,
            loading: true
        });
    }

    componentWillMount() {
        if (this.props.placeInfo !== undefined) {
            price = this.state.placeInfo.price;
            this.setLogo(this.state.placeInfo.image);
        }

        this.setState({ loading: false });
    }

    setLogo(imageUrl) {
        if (imageUrl !== '') {
            this.setState({ img: ({ uri: imageUrl }) });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    !this.state.loading &&

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.logoContainer}>
                            <Image source={this.state.img} style={styles.logo} />
                        </View>

                        <View style={styles.textContainer}>
                            <MText fontFamily='oswald' style={styles.title}>{this.state.title}</MText>
                            <MText fontFamily='quick-sand-medium' style={styles.address}>{this.state.address}</MText>

                            <MText fontFamily='quick-sand-medium' style={styles.price}>
                                {price}
                            </MText>
                            <MText style={styles.distance}>
                                <EvilIcons name='location' style={styles.distanceIcon} />
                                {this.state.distance}m
                        </MText>
                        </View>
                    </View>
                }
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
    logoContainer: {
        width: '45%',
        height: 150
    },
    logo: {
        flex: 1,
        width: null,
        height: null
    },
    title: {
        fontSize: 20,
        color: '#474747',
        marginBottom: 10
    },
    address: {
        color: '#a0a0a0',
        fontSize: 15,
        marginBottom: 5
    },
    price: {
        position: 'absolute',
        bottom: 0,
        left: 5,
        color: 'orange'
    },
    distance: {
        fontSize: 15,
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontWeight: '600',
        color: 'orange'
    },
    distanceIcon: {
        fontFamily: 'quick-sand-bold',
        fontSize: 15,
        color: 'orange'
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
