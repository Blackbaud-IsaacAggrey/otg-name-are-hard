/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Button,
    List,
    ListItem,
    CheckBox,
    Slider,
    Card
} from 'react-native-elements';

var REQUEST_URL = 'http://10.84.211.156:8022/segment/constituents?set_from=0&set_size=20';

let randomLegoAvatars = [
    'https://randomuser.me/api/portraits/lego/0.jpg',
    'https://randomuser.me/api/portraits/lego/1.jpg',
    'https://randomuser.me/api/portraits/lego/2.jpg',
    'https://randomuser.me/api/portraits/lego/3.jpg',
    'https://randomuser.me/api/portraits/lego/4.jpg',
    'https://randomuser.me/api/portraits/lego/5.jpg',
    'https://randomuser.me/api/portraits/lego/6.jpg',
    'https://randomuser.me/api/portraits/lego/7.jpg',
    'https://randomuser.me/api/portraits/lego/8.jpg'
];

export default class mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            selectedIndex: 1,
            value: (0.5 * 1),
            vip_checked: false,
            everyday_checked: false,
            media_checked: false
        };
        this.updateIndex = this.updateIndex.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({latitude: position.coords.latitude,
                    longitude: position.coords.longitude,});
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    _setVIPCheckbox = (checked) => {
        this.setState({vip_checked: checked});
    };

    _setEverydayCheckbox = (checked) => {
        this.setState({everyday_checked: checked});
    };

    _setMediaCheckbox = (checked) => {
        this.setState({media_checked: checked});
    };

    render() {
        if (!this.state.loaded) {
            return this._renderInitView();
        } else {
            return this._renderListView();
        }
    }

    _renderInitView() {
        return (
            <View style={styles.container}>
                <CheckBox
                    center
                    title='VIPs'
                    uncheckedIcon='trophy'
                    checkedColor='green'
                    onPress={() => this._setVIPCheckbox(!this.state.vip_checked)}
                    onIconPress={() => this._setVIPCheckbox(!this.state.vip_checked)}
                    checked={this.state.vip_checked}
                    right
                />
                <CheckBox
                    center
                    title='Media influencers'
                    uncheckedIcon='newspaper-o'
                    onPress={() => this._setMediaCheckbox(!this.state.media_checked)}
                    onIconPress={() => this._setMediaCheckbox(!this.state.media_checked)}
                    checked={this.state.media_checked}
                    right
                />
                <CheckBox
                    center
                    title='Everyday'
                    uncheckedIcon='bullhorn'
                    onPress={() => this._setEverydayCheckbox(!this.state.everyday_checked)}
                    onIconPress={() => this._setEverydayCheckbox(!this.state.everyday_checked)}
                    checked={this.state.everyday_checked}
                    right
                />
                <Card
                    containerStyle={{marginTop: 15, marginBottom: 15}}
                    title='Within ...'>
                    <View>
                        <Slider
                            value={this.state.value}
                            onValueChange={(value) => this.setState({value})}/>
                        <Text>{Math.round(this.state.value * 100)} miles of you</Text>
                    </View>
                </Card>
                <Button
                    large
                    raised
                    onPress={this._goToResults}
                    title="Find constituents"
                    backgroundColor="#1c84c6"
                />
            </View>
        );
    }

    _goToResults = () => {
        this._fetchData();
    };

    _fetchData() {
        let socialTags = [];
        if (this.state.vip_checked) {
            socialTags.push('vip');
        }
        if (this.state.media_checked) {
            socialTags.push('media');
        }
        if (this.state.everyday_checked) {
            socialTags.push('everyday');
        }
        fetch(REQUEST_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "filters": [
                    {
                        "type": "value", "field": "social.aiTags",
                        "values": socialTags
                    },
                    {
                        "type": "geo",
                        "field": "geolocation",
                        "distance": (this.state.value * 100) + "mi",
                        "latitude": this.state.latitude,
                        "longitude":this.state.longitude,
                        "address": "deez nuts"
                    }
                ],
                "fieldSorts": [{"field": "cons_name.last", "ordering": "ASCENDING"},
                    {"field": "cons_name.first", "ordering": "ASCENDING"}], "returnedFields": []
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.searchHits),
                    loaded: true
                });
            })
            .done();
    }

    _renderListView() {
        return (
            <List>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderSearchHits}
                />
            </List>
        );
    }

    renderSearchHits(searchHits, sectionID) {
        return (
            <ListItem
                roundAvatar
                key={sectionID}
                title={`${searchHits.fields.cons_name.first} ${searchHits.fields.cons_name.last}`}
                subtitle={searchHits.fields.social.aiTags}
                avatar={{uri: randomLegoAvatars[Math.floor(Math.random() * 9)]}}
            />
        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22
    },
    hero: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    slider: {
        backgroundColor: 'grey'
    },
    titleContainer: {},
    button: {
        marginTop: 15
    }
});

AppRegistry.registerComponent('mobile', () => mobile);
