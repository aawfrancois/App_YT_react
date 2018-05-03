import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import  MainStack  from './screens/home';
import  SettingsScreen  from './screens/settings';
import  VideoScreen  from './screens/video';


console.disableYellowBox = true;

const RootStack = StackNavigator(
    {
        home: {
            screen: MainStack,
        },
        settings: {
            screen: SettingsScreen,
        },
        video: {
            screen: VideoScreen,
        }
    },
);

export default class App extends React.Component {
    render() {
        return (
            <RootStack/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
