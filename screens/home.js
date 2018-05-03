import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {CONFIG} from '../constants/index';
import {Icon} from 'react-native-elements'

export default class MainStack extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: []
        }
    }


    video = (header, id) => {
        let link = "https://www.youtube.com/watch?v=" + id
        this.props.navigation.navigate("video", {header, link})
    };

    static navigationOptions = ({navigation}) => {
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


    componentDidMount() {
        fetch(`${CONFIG.YOUTUBE.BASE_URL}/search/?key=${CONFIG.YOUTUBE.API_KEY}&chart=mostPopular&part=snippet,id&regionCode=FR&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}`)
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


    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        {this.state.video.map((item) =>
                            <TouchableOpacity
                                key={item.id.videoId}
                                onPress={() => this.video(item.snippet.title, item.id.videoId)}>
                                <View style={styles.vids}>
                                    <Image
                                        source={{uri: item.snippet.thumbnails.medium.url}}
                                        style={{width: 320, height: 180}}/>
                                    <View style={styles.vidItems}>
                                        <Image
                                            style={{width: 40, height: 40, borderRadius: 20, marginRight: 5}}/>
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
