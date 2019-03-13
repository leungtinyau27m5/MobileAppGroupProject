import React, { Component } from 'react'
import {
    Text,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animateable from 'react-native-animatable'

const iconsPackage = [
    "md-cart",
    "md-construct",
    "ios-appstore",
    "ios-archive",
    "ios-flame",
    "ios-flower",
    "ios-settings",
    "logo-html5",
    "md-heart",
    "md-pricetag",
    "md-water",
    "md-umbrella",
    "md-trash",
    "md-trophy",
    "md-mail",
    "md-cube",
    "md-desktop",
    "md-battery-full",
    "md-beer",
    "logo-skype",
    "logo-tux",
    "logo-twitter",
    "logo-python",
    "logo-octocat",
    "logo-game-controller-b",
    "logo-game-controller-a",
    "logo-android",
    "ios-woman",
    "ios-wallet",
    "ios-tennisball",
    "ios-rocket",
    "ios-person"
]

const colors = [
    "#FF0000",  //RED
    "#800000",  //Maroon
    "#000000",  //Black
    "#00FF00",  //Lime
    "#008000",  //Green
    "#0000FF",  //Blue
    "#000080",  //Navy
    "#FF00FF",  //Fuchsia
    "#808000",  //Olive
    "#FFA500",  //orange
]

export class Items extends Component {
    constructor(props) {
        super()
    }
    render() {
        //console.error(this.props)
        return(
            <Animateable.View
                animation={ this.props.turning ? 'rotate' : ''}
                direction={ this.props.isReverse ? 'reverse' : 'normal'}
                iterationCount='infinite'
            >
            <Ionicons
                name={ iconsPackage[this.props.shape] }
                color={ (this.props.color == null || this.props.color == undefined) ? colors[9] : colors[this.props.color] }
                size={ 55 }
            />
            </Animateable.View>
        )
    }
}
