import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import MText from '../../../components/myTextView';
import PropTypes from 'prop-types';
let restaurantData = { title: '', address: '', distance: '', price: '' };

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            img: require('../../../images/food.jpeg'), //list item's logo
            loading: true
        });

        for (let val in restaurantData) {
            restaurantData[val] = this.props.data.placeInfo[val];

            if (restaurantData[val] === undefined) {
                restaurantData[val] = 'N/A';
            }
        }
    }

    componentWillMount() {
        if (this.props.data.placeInfo.image !== undefined) {
            this.setLogo(this.props.data.placeInfo.image);
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListItem', { data: { ...this.state, ...this.props.data.placeInfo } })}
                style={styles.container}>
                {
                    !this.state.loading &&

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.logoContainer}>
                            <Image source={this.state.img} style={styles.logo} />
                        </View>

                        <View style={styles.textContainer}>
                            <View>
                                <MText fontFamily='oswald' style={styles.title}>{restaurantData.title}</MText>
                                <MText fontFamily='quick-sand-medium' style={styles.address}>{restaurantData.address}</MText>
                            </View>
                            <View style={styles.bottomTxtContainer}>
                                <MText fontFamily='quick-sand-medium' style={styles.price}>
                                    {restaurantData.price}
                                </MText>
                                <MText style={styles.distance}>
                                    <EvilIcons name='location' style={styles.distanceIcon} />
                                    {restaurantData.distance}m
                        </MText>
                            </View>
                        </View>
                    </View>
                }
            </TouchableOpacity>
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
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 10
    },
    title: {
        fontSize: 20,
        color: '#474747',
        marginBottom: 10
    },
    address: {
        color: '#a0a0a0',
        fontSize: 15
    },
    bottomTxtContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    price: {
        color: 'orange',
        fontWeight: '600'
    },
    distance: {
        color: 'orange',
        fontWeight: '600'
    },
    distanceIcon: {
        fontFamily: 'quick-sand-bold',
        fontSize: 15,
        color: 'orange'
    }
});

Card.propTypes = {
    data: PropTypes.object
};
