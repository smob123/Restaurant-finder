import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            img: require('../images/Restaurant.png'), //list item's logo
            title: this.props.title, //the name of the restaurant
            address: this.props.address, //the restaurant's address
            distance: this.props.distance, //its distance from the user's current location
            category: this.props.category, //what type of restaurant is it
            type: this.props.type, //type of food
            hours: this.props.hours, //its business hours
            open: this.props.open //is the restaurant currently open
        });
    }

    componentWillMount() {
        this.setLogo(this.state.category);
    }

    setLogo(category) {
        //iterate through the categories list
        this.categories().forEach((cat, index) => {
            //if the category exists in one of the arrays
            if (cat.titles.indexOf(category) >= 0) {
                //set the current card item's logo to that category
                this.setState({ img: cat.img });
                return;
            }
        });
    }

    /* available categories and their logos */
    categories() {
        const cat1 = {
            titles: ['SnacksFastfood'],
            img: require('../images/Fastfood.png')
        }

        const cat2 = {
            titles: ['Coffee', 'CoffeeTea'],
            img: require('../images/Coffeeshop.png')
        }

        const cat3 = {
            titles: ['BarPub'],
            img: require('../images/Bar.png')
        }

        const cat4 = {
            titles: ['Kiosk247ConvenienceStore'],
            img: require('../images/GroceryStore.png')
        }

        const cat5 = {
            titles: ['EatDrink', 'FoodDrink'],
            img: require('../images/Coffee.png')
        }

        return [cat1, cat2, cat3, cat4, cat5];
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
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <View>
                        <Image source={this.state.img} style={styles.logo} />
                        <Text>{this.state.distance}m away</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <Text style={styles.centeredText}>{this.state.address}</Text>
                    </View>

                    <View>
                        <Text style={styles.centeredText}>{this.state.type}</Text>
                        {this.isOpen()}
                    </View>
                </View>

                <View style={styles.hours}>
                    <Text style={styles.centeredText}>
                        {this.state.hours}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderColor: 'rgba(255, 145, 73, .5)',
        borderWidth: 3,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    logo: {
        width: 70,
        height: 60
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#474747',
        textAlign: 'center'
    },
    address: {
        color: '#474747'
    },
    inlineView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hours: {
        flex: 0
    },
    centeredText: {
        textAlign: 'center'
    }
});

Card.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string,
    type: PropTypes.string,
    hours: PropTypes.string,
    open: PropTypes.bool
};
