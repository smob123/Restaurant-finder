import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: this.props.title,
            address: this.props.address
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View styels={styles.logoContainer}>
                    <Image source={require('../images/list-logo.png')} style={styles.logo} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flex: end }}>
                    <Text style={{ fontSize: 20 }}>{this.state.title}</Text>
                    <Text>{this.state.address}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 3,
        backgroundColor: '#eff1f4',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logoContainer: {
        width: '40%'
    },
    logo: {
        width: 100,
        height: 90
    },
    inlineView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%'
    },
    img: {
        width: 40,
        height: 40
    }
});

Card.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};
