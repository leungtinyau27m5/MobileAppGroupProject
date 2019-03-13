import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

import { createSwitchNavigator } from 'react-navigation'

import Sound from 'react-native-sound'
Sound.setCategory('Playback')

import Prepare from './Prepare'
import Search from './Search'

const level = 
    {
        relax: { //1-5
            number: 1,
            turning: false,
            text: false,
            color: true,
            Rows: 3,
            Cols: 3,
        },
        easy: { //6-16
            number: 2,
            turning: false,
            text: false,
            color: true,
            Rows: 5,
            Cols: 5,
        },
        normal : { //17-25
            number: 2,
            turning: true,
            text:false,
            color: true,
            Rows: 5,
            Cols: 5
        },
        hard: { //26-40
            number: 3,
            turning: true,
            text: false,
            color: true,
            Rows: 5,
            Cols: 5,
        },
        crazy: { //41-60
            number: 4,
            turning: true,
            text: false,
            color: true,
            Rows: 7,
            Cols: 7
        },
        insane: { //61-84
            number: 4,
            turning: true,
            text: true,
            color: true,
            Rows: 8,
            Cols: 8
        },
        incredibe: { //84-100
            number: 4,
            turning: true,
            text: true,
            color: true,
            Rows: 11,
            Cols: 11
        }
    }


const SwitchScreens = createSwitchNavigator({
    Prepare:{
        screen: Prepare
    },
    Search: {
        screen: Search
    }
}, {
    initialRouteName: 'Prepare'
})


let target = []
let others = []
let lv = null
export default class Game extends Component {
    static router = SwitchScreens.router
    constructor(props) {
        super()
        this.state = {
            level: 1,
            iconsNumber: 32,
            colorNumber: 10,
        }

        this._nextGame = this._nextGame.bind(this)

        this._nextGame()
    }
    componentDidMount() {
        let bgMusic = new Sound('bg_music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error)
                return
            }
            bgMusic.setVolume(0.1)
            bgMusic.setNumberOfLoops(-1)
            //bgMusic.play()
        }) 
    }
    checkWin = () => {

    }
    handleClick = (shape, color, turning, text) => {
        console.error('byebye')
    }
    randomNumber = (max) => {
        return Math.floor((Math.random() * max))
    }
    generateItemProfile = (n, isColor, isTurning, isText) => {
        let items = []
        for (let i = 0; i < n; i++) {
            let color = null, shape = null, isReverse = null, text = null
            shape = this.randomNumber(this.state.iconsNumber)
            if (isColor) color = this.randomNumber(this.state.colorNumber)
            if (isTurning) isReverse = (this.randomNumber(2) == 0) ? true : false
            let item = {
                shape: shape,
                color: color,
                turning: isTurning,
                isReverse: isReverse,
                text: text
            }
            items.push(item)
        }
        return items
    }
    _nextGame() {
        const currentLevel = this.state.level
        target = []
        others = []
        lv = level.relax
        if (currentLevel < 6) {//relax shape only 1, 3x3
            lv = level.relax
        } else if (currentLevel < 17) {//easy color 2, 5x5
            lv = level.easy
        } else if (currentLevel < 26) {//normal color turning 2, 5x5
            lv = level.normal
        } else if (currentLevel < 41) {//hard color turning  3, 5x5
            lv = level.hard
        } else if (currentLevel < 61) {//crazy color turning 4, 8x8
            lv = level.crazy
        } else if (currentLevel < 83) {//insane color turning text 4 8x8
            lv = level.insane
        } else {//incredibe 4 11x11
            lv = level.incredibe
        }

        const cn = lv.number
        const isColor = lv.color, isTurning = lv.turning, isText = lv.text

        let corrects = []
        corrects = this.generateItemProfile(cn, isColor, isTurning, isText)
        target = corrects

    }
    render() {
        const { navigation } = this.props
        const screenProps = {
            target: target,
            levelSettings: lv,
            onClick: this.randomNumber,
            handleClick: this.handleClick,
            generateItem: this.generateItemProfile,
        }
        return (
            <SwitchScreens
                navigation={ navigation }
                screenProps={ screenProps }
            />
        )
    }
}
