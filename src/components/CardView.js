import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesome} from '@expo/vector-icons';

let icon = {
    defaultLike: { icon: 'thumbs-o-up', color: 'black' },
    activeLike: { icon: 'thumbs-up', color: 'blue' },
    defaultDislike: { icon: 'thumbs-o-down', color: 'black' },
    activeDislike: { icon: 'thumbs-down', color: 'red'}
};

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: this.props.title,
            address: this.props.address,
            likeStatus: icon.defaultLike.icon,
            likeColor: icon.defaultLike.color,
            dislikeStatus: icon.defaultDislike.icon,
            dislikeColor: icon.defaultDislike.color
        });
    }
    
    handleLike() {
        if (this.state.likeStatus === icon.defaultLike.icon) {
            this.setState({
                likeStatus: icon.activeLike.icon,
                likeColor: icon.activeLike.color,
                dislikeStatus: icon.defaultDislike.icon,
                dislikeColor: icon.defaultDislike.color
            });
        }
        else {
            this.setState({
                likeStatus: icon.defaultLike.icon,
                likeColor: icon.defaultLike.color
            });
        }
    }

    handleDislike() {
        if (this.state.dislikeStatus === icon.defaultDislike.icon) {
            this.setState({
                dislikeStatus: icon.activeDislike.icon,
                dislikeColor: icon.activeDislike.color,
                likeStatus: icon.defaultLike.icon,
                likeColor: icon.defaultLike.color
            });
        }
        else {
            this.setState({
                dislikeStatus: icon.defaultDislike.icon,
                dislikeColor: icon.defaultDislike.color
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text style={{fontSize: 20}}>{this.state.title}</Text>
                    <Text>{this.state.address}</Text>
                    
                    <View style={styles.inlineView}>
                    <TouchableOpacity onPress={this.handleLike.bind(this)}>
                        <FontAwesome name={this.state.likeStatus} size={35} color={this.state.likeColor} />
                        </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleDislike.bind(this)}>
                        <FontAwesome name={this.state.dislikeStatus} size={35} color={this.state.dislikeColor} />
                        </TouchableOpacity>
                    </View>
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
