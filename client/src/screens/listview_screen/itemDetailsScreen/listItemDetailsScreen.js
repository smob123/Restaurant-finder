import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ImageSlider from './imageSlider';
import Reviews from './reviews';
import Map from './mapView';

let restaurantData = {};

export default class ListItemDetails extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.title
    })

    constructor(props) {
        super(props);
        const passedProps = this.props.navigation.state.params.data;

        for (val in passedProps) {
            restaurantData[val] = passedProps[val];
        }
    }

    componentWillUnmount() {
        restaurantData = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <ImageSlider articleUrl={restaurantData.articleUrl} />
                </View>

                <View>
                    <Reviews rating={restaurantData.rating} />
                </View>

                <View style={{ flex: 1 }}>
                    <Map lat={restaurantData.lat} lon={restaurantData.lon} logo={restaurantData.image} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 10
    }
});