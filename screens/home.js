import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    TextInput
} from 'react-native';
import {connect} from 'react-redux'
import {CONFIG} from '../constants/index';
import {Icon} from 'react-native-elements'

class MainStack extends React.Component {


    state = {
        video: [],
        locale: "",
        search: "",
        isSearch: false
    }

    static navigationOptions = ({navigation}) => {
        const { state, setParams, navigate } = navigation;
        return {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerLeft: (
                <TouchableOpacity>
                    <Image
                        style={{height: 22, width: 98, color: '#fff', marginLeft: 25}}
                        source={require('../images/logo.png')}/>
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={{flexDirection: 'row', marginRight: 20}}>
                    <Icon
                        name='search'
                        color='#fff'
                        onPress={() => state.params.search()}
                    />
                    <Icon
                        name='cached'
                        color='#fff'/>
                    <Icon
                        name='favorite'
                        color='#fff'/>
                    <Icon
                        name='settings'
                        color='#fff'
                        onPress={() => navigation.navigate('settings')}
                    />
                </View>
            )
        }

    };


    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem(CONFIG.STORAGE.CURRENT_REGION);
            if (value !== null) {
                this.setState({locale: value})
            }
        }
        catch (error) {
            console.log(error);
        }

        this.props.navigation.setParams({
            search: this._search
        })

        let url = `${CONFIG.YOUTUBE.BASE_URL}/search?key=${CONFIG.YOUTUBE.API_KEY}&chart=mostPopular&order=rating&part=snippet&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}`
        if (this.state.locale) {
            fetch(`${url}&regionCode=${this.state.locale}`)
                .then(res => res.json())
                .then(res => {
                    const videoId = []
                    res.items.forEach(item => {
                        videoId.push(item)
                    });
                    this.setState({
                        video: videoId
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        } else {
            fetch(`${url}&regionCode=${CONFIG.YOUTUBE.DEFAULT_REGION}`)
                .then(res => res.json())
                .then(res => {
                    const videoId = []
                    res.items.forEach(item => {
                        videoId.push(item)
                    })
                    this.setState({
                        video: videoId
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        }


    }

    _search  = ()  => {
        if (this.state.isSearch) {
            this.setState({isSearch: false})

        }
        else {
            this.setState({isSearch: true})
        }
    };

    Buttonsearch = ( )  => {
        fetch(`${CONFIG.YOUTUBE.BASE_URL}/search/?key=${CONFIG.YOUTUBE.API_KEY}&part=snippet,id&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}&q=${this.state.search}`)
            .then(res => res.json())
            .then(res => {
                const video = []
                res.items.forEach(item => {
                    video.push(item)
                })
                this.setState({
                    video: video
                })
            })
            .catch(error => {
                console.error(error)
            })
    };

    _toggleSearch(){
        if (this.state.isSearch) {
            return (
                <TextInput
                    style={{height: 40, borderColor: 'red', borderWidth: 1}}
                    onChangeText={(search) => this.setState({search})}
                    value={this.state.text}
                    onEndEditing={() => this.Buttonsearch( )}
                    placeholder = "Recherchez"
                />
            )
        }
    }

    video = (header, id) => {
        let link = "https://www.youtube.com/watch?v=" + id
        this.props.navigation.navigate("video", {header, link})
    };


    render() {
        return (
            <View style={styles.container}>
                {this._toggleSearch()}
                <ScrollView>
                    <View style={styles.body}>
                        <Text style={styles.title}>Video populaire : {this.state.locale}</Text>
                        {this.state.video.map((item) =>
                            <TouchableOpacity
                                key={item.id.videoId}
                                onPress={() => this.video(item.snippet.title, item.id.videoId)}>
                                <View style={styles.vids}>
                                    <Image
                                        source={{uri: item.snippet.thumbnails.medium.url}}
                                        style={{width: 320, height: 180}}/>
                                    <View style={styles.vidItems}>
                                        <Text style={styles.vidText}>{item.snippet.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        margin: 10,
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 30
    },
    vids: {
        paddingBottom: 30,
        width: 320,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBottomWidth: 0.6,
        borderColor: '#aaa'
    },
    vidItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10
    },
    vidText: {
        padding: 20,
        color: '#000'
    },
    tabBar: {
        backgroundColor: '#fff',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 0.5,
        borderColor: '#bbb'
    },
    tabItems: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },
    tabTitle: {
        fontSize: 11,
        color: '#333',
        paddingTop: 4,
        textDecorationLine: 'underline'
    }
})

function mapStateToProps(state) {
    return {
        country: state.country,
        locale: state.locale
    }
}

export default connect(mapStateToProps)(MainStack)
