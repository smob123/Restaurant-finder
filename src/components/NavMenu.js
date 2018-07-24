import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation, Drawer } from 'react-native-material-ui';
import Map from './Maps';
import ListView from './ListView';
import Profile from './Profile';
import PropTypes from 'prop-types';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'map',
            location: this.props.location
        };
    }

    render() {
        return (
                <View>
                <View style={{height: '85%'}}>
                    { this.state.active === 'map' &&
                        <Map location={this.state.location}/>
                            
                     }
                     
                     {
                     this.state.active === 'list' &&
                             <ListView location={this.state.location}/>
                    }
                    
                    {
                        this.state.active === 'profile' &&
                                <Profile />
                    }
                </View>
                    <View style={{height: '10%'}}>
                    <BottomNavigation active={this.state.active} hidden={false} >
                        <BottomNavigation.Action
                            key="map"
                            icon="map"
                            label="Map"
                            onPress={() => this.setState({active: 'map' })}
                            />
                        <BottomNavigation.Action
                            key="list"
                            icon="list"
                            label="List"
                            onPress={() => this.setState({active: 'list' })}
                            />
                        <BottomNavigation.Action
                            key="person"
                            icon="person"
                            label="Profile"
                            onPress={() => this.setState({active: 'profile' })}
                            />
                    </BottomNavigation>
                    </View>
                </View>
                    );
                }
            }
            
const styles = StyleSheet.create({
        container: {
         margin: 0,
         padding: 0
        }
});


Menu.propTypes = {
    location: PropTypes.array
};
