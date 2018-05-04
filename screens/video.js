import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    WebView
} from 'react-native';

export default class VideoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.header,
        };
    };


    render() {
        const { params } = this.props.navigation.state;
        const link = params ? params.link : null;
        return(
            <WebView
                source={{uri: `${link}`}}
                style={{marginTop: 20}}
            />
        );
    }
}