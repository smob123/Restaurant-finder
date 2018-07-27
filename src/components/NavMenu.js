import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import PropTypes from 'prop-types';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'map'
        };
    }

    componentDidMount() {
        this.setView(this.state.active);
   }
   
   setView(v) {
       this.setState({active: v});
       this.props.currentView(v);
   }
    
    render() {
        return (
                <View>
                    <BottomNavigation active={this.state.active} hidden={false} >
                        <BottomNavigation.Action
                            key="map"
                            icon="map"
                            label="Map"
                            onPress={() => this.setView('map')}
                            />
                        <BottomNavigation.Action
                            key="list"
                            icon="list"
                            label="List"
                            onPress={() => this.setView('list')}
                            />
                        <BottomNavigation.Action
                            key="person"
                            icon="person"
                            label="Profile"
                            onPress={() => this.setView('profile')}
                            />
                    </BottomNavigation>
                </View>
                    );
                }
            }

Menu.propTypes = {
    currentView: PropTypes.func
};
