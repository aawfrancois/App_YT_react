import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import  MainStack  from './screens/home';
import  SettingsScreen  from './screens/settings';
import  VideoScreen  from './screens/video';
import {Provider} from 'react-redux'
import {createStore} from 'redux'


console.disableYellowBox = true;

const initial_state = {
    country: []
};

function reducer(prev_state = initial_state, action) {
    switch (action.type) {
        case 'ADD_COUNTRYS':
            return Object.assign({}, prev_state, {
                country: action.data.list
            });
        default:
            return prev_state
    }
}

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

const store = createStore(reducer)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack/>
            </Provider>
        )
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
