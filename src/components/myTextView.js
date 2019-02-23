import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export default class MText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontFamily: 'sans-serif'
        }
    }

    componentDidMount() {
        this.setFontFamily(this.props.fontFamily);
    }

    setFontFamily(fontFamily) {
        this.setState({ fontFamily });

        console.log(this.state.fontFamily, this.props.children);
    }

    render() {
        const styles = this.props.style || {};
        return (
            <Text style={[{ fontFamily: this.state.fontFamily }, styles]}>{this.props.children}</Text>
        );
    }
}

MText.propTypes = {
    fontFamily: PropTypes.string
};
