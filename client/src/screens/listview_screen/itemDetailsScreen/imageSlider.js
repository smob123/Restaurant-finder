import React, { Component } from 'react';
import { View, Image, ScrollView, ViewPagerAndroid, FlatList, StyleSheet, Platform, Dimensions } from 'react-native';
import { getImages } from '../../../config/fetchPlaces';

let imageUrls = []; //list of the restaurant's images
const { width, height } = Dimensions.get('screen'); //width, and height of the screen

export default class ImageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        if (this.props.articleUrl !== undefined) {
            imageUrls = await getImages(this.props.articleUrl);
        }

        this.setState({ loading: false });
    }

    componentWillUnmount() {
        imageUrls = [];
    }

    getSlides() {
        return (
            !this.state.loading && imageUrls.length > 0 ?
                <FlatList
                    horizontal={true}
                    data={imageUrls}
                    keyExtractor={(item, index) => item}
                    renderItem={({ item, index }) => <Image source={{ uri: item }} key={item + index}
                        style={styles.image} resizeMode='contain' />}
                />

                :
                <Image source={require('../../../images/food.jpeg')} style={styles.image} resizeMode='contain' />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS == 'ios' ?
                    <ScrollView style={{ width: '100%', height: '100%' }} pagingEnabled={true}>
                        <View>
                            {
                                this.getSlides()
                            }
                        </View>
                    </ScrollView>
                    :
                    <ViewPagerAndroid initialPage={0} style={{ width: '100%', height: '100%' }}>
                        <View>
                            {
                                this.getSlides()
                            }
                        </View>
                    </ViewPagerAndroid>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: height / 3
    },
    image: {
        width: width,
        height: height / 3,
        flex: 1
    }
});