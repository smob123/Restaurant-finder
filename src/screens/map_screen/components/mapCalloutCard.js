import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';


export default class MapCalloutCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: ''
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            location: this.props.location
        });
    }

    componentDidUpdate() {
        if (this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.centeredTxt}>{this.state.name}</Text>
                <Text style={styles.centeredTxt}>{this.state.location}</Text>
                <Text style={styles.centeredTxt}>Rating: 0</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 220,
        alignItems: 'center'
    },
    centeredTxt: {
        textAlign: 'center'
    }
});

MapCalloutCard.propTypes = {
    name: PropTypes.string
};

MapCalloutCard.propTypes = {
    location: PropTypes.string
};
