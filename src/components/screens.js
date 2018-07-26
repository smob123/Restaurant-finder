import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from './Maps';
import ListView from './ListView';
import Profile from './Profile';
import PropTypes from 'prop-types';

export default class Screens extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.view,
            location: this.props.location,
            locationFetched: this.props.locationFetched,
            loading: this.props.loading
        };
    }

    componentDidUpdate() {
        if (this.state.active !== this.props.view) {
            this.setState({active: this.props.view, location: this.props.location});
        }
    }

    render() {
        return(
                <View>
                    { this.state.active === 'map' &&
                                    <Map location={this.state.location} locationFetched={this.state.locationFetched} />
                    }
                
                    {
                        this.state.active === 'list' &&
                                    <ListView location={this.state.location} />
                    }
                
                    {
                        this.state.active === 'profile' &&
                                    <Profile />
                    }
                </View>
                );
    }
}

Screens.propTypes = {
    view: PropTypes.string
};

Screens.propTypes = {
    location: PropTypes.array
};

Screens.propTypes = {
    locationFetched: PropTypes.bool
};

Screens.propTypes = {
    loading: PropTypes.bool
};