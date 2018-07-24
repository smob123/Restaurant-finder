import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends Component {
        constructor(props) {
            super(props);
            this.state = ( {
                title: props.title,
                address: props.address
            });
        }
        
    render() {
        return (
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>{this.state.title}</Text>
                    <Text>{this.state.address}</Text>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 100,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 3,
        backgroundColor: '#eff1f4',
        marginTop: 22,
        alignItems: 'center'
    }
});

Card.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string
};
