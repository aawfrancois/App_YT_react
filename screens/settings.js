import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    Picker,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { CONFIG } from '../constants/index';

export default class SettingsScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            country: []
        }
    }

    componentDidMount(){
        fetch(`${CONFIG.YOUTUBE.BASE_URL}/i18nRegions`)
            .then(res => res.json())
            .then(res => {
                const Country = [];

                res.items.forEach(item => {
                    Country.push(item)
                });
                this.setState({
                    country: Country
                })
            })
            .catch(error => {
                console.error(error)
            })
    }


    render() {
        return (
            <View>

            </View>
        )
    }
}