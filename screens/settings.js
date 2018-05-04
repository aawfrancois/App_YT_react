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
import {connect} from 'react-redux'
import { CONFIG } from '../constants/index';

class SettingsScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            country: [],
            locale: ""
        }
    }

    updateCountry = (Country) => {
        this.setState({
            country: Country
        })
        AsyncStorage.setItem(CONFIG.STORAGE.AVAILABLE_REGIONS, Country);
    };


    updateLocale = (locale) => {
        this.setState({ locale: locale })
        AsyncStorage.setItem(CONFIG.STORAGE.CURRENT_REGION, locale);
    };

    componentDidMount(){
        fetch(`${CONFIG.YOUTUBE.BASE_URL}/i18nRegions?part=snippet,id&key=${CONFIG.YOUTUBE.API_KEY}`)
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
        const items = this.state.country.map((item) => {
            return(
                <Picker.Item label={item.snippet.name} value={item.snippet.gl} />
            )
        })
        return (
            <View>
                <Text style = {styles.text}>Select your language</Text>
                <Picker selectedValue = {this.state.locale} onValueChange = {this.updateLocale}>
                    {items}
                </Picker>
            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        country: state.country,
        locale: state.locale
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: '#000'
    }
})

export default connect(mapStateToProps)(SettingsScreen)