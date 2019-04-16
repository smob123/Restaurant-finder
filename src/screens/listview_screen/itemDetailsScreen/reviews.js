import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MText from '../../../components/myTextView';

const { width } = Dimensions.get('screen');

export default class Reviews extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Icon name='star' size={30} color='yellow' />
                    <MText fontFamily='oswald' style={{ fontWeight: '300' }}>{this.props.rating} / 10</MText>
                </View>
                <View style={styles.itemContainer}>
                    <Icon name='comment' size={30} color='gray' />
                    <MText fontFamily='oswald' style={{ fontWeight: '300' }}>Reviews</MText>
                </View>
                <View style={styles.itemContainer}>
                    <Icon name='heart' size={30} color='red' />
                    <MText fontFamily='oswald' style={{ fontWeight: '300' }}>Add to favourites</MText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer: {
        width: width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(155, 155, 155, 0.5)',
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10
    }
});