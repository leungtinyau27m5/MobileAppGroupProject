import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    AppState,
    BackHandler,
    ToastAndroid
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'

import { ItemContainer } from '../Components/ItemContainer'
import { Items } from '../Components/Items'
import { TimerCountDown } from '../Components/Timer'
//the sceen allows player to remember the items
export default class Prepare extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() { //adding back button handler
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange);
        //BackHandler.addEventListener('hardwareBackPress', () => this.backButtonPress('SelectGame'))
        BackHandler.addEventListener('hardwareBackPress', this.toastWarningMsg)
    }
    componentWillUnmount() { //unmount the back button listener to prevent collision and illegal state update in react-native
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange);
        //BackHandler.removeEventListener('hardwareBackPress', () => this.backButtonPress('SelectGame'))
        BackHandler.removeEventListener('hardwareBackPress', this.toastWarningMsg)
        BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        BackgroundTimer.clearTimeout(this.doubleBack)
    }
    toastWarningMsg = () => { //toast warning msg if player want to leave the game
        ToastAndroid.show('Double press to forgive the game!', ToastAndroid.SHORT)
        BackHandler.addEventListener('hardwareBackPress', this.doubleBackButtonPress)
        this.doubleBack = BackgroundTimer.setTimeout(() => { //adding time out event for listening second back button click to exit app
            BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        }, 2000)
        return true
    }
    doubleBackButtonPress = () => { //player double press back button
        this.props.navigation.navigate('SelectGame')
        return true
    }
    backButtonPress = (route) => { //not in used 
        this.props.navigation.navigate(route)
        return true
    }
    _renderTutorial = () => {
        //let temp = this.props.screenProps.generateItem(1, settings.color, settings.turning, settings.text)
        let firstItem = {
            id: `tutorial-1`,
            shape: 0,
            color: 0,
            turning: false,
            isReverse: null,
            text: null,
            isCorrect: false,
        }
        let secondItem = {
            id: `tutorial-2`,
            shape: 1,
            color: 1,
            turning: false,
            isReverse: null,
            text: null,
            isCorrect: false
        }
        let combined = {
            id: `tutorial-3`,
            shape: 0,
            color: 1,
            turning: false,
            isReverse: null,
            text: null,
            isCorrect: false
        }
        let newArr = []
        newArr.push(
            <View 
                style={styles.tutorialContainer}
                key={`tut-items-1`}
            >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Items 
                        shape={ firstItem.shape }
                        color={ firstItem.color }
                        //turning={ this.state.turning }
                        turning={ firstItem.turning }
                        isReverse={ firstItem.isReverse }
                        isText={ firstItem.text }
                    />
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.tutorialText}>+</Text>
                    </View>
                </View>
                <Text style={styles.tutorialText}> (shap) </Text>
            </View>
        )
        newArr.push(
            <View 
                style={styles.tutorialContainer}
                key={`tut-items-2`}
            >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Items 
                    shape={ secondItem.shape }
                    color={ secondItem.color }
                    //turning={ this.state.turning }
                    turning={ secondItem.turning }
                    isReverse={ secondItem.isReverse }
                    isText={ secondItem.text }
                />
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.tutorialText}>=</Text>
                </View>
            </View>
            <Text style={styles.tutorialText}> (color) </Text>
            </View>
        )
        newArr.push(
            <View 
                style={styles.tutorialContainer}
                key={`tut-items-3`}
            >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Items 
                    shape={ combined.shape }
                    color={ combined.color }
                    //turning={ this.state.turning }
                    turning={ combined.turning }
                    isReverse={ combined.isReverse }
                    isText={ combined.text }
                />
            </View>
            <Text style={[styles.tutorialText, {alignSelf: 'center'}]}> Answer </Text>
            </View>
        )
        return newArr
    }
    navigateToSearchScene = () => { //go to search scene to start the searching
        let targets = this.props.screenProps.target
        let settings = this.props.screenProps.levelSettings
        let rows = settings.Rows
        let cols = settings.Cols
        let allItems = []
        targets.forEach(function(element, index) {
            let detail = {
                id: `ans-${index}`,
                shape: element.shape,
                color: element.color,
                turning: element.turning,
                isReverse: element.isReverse,
                text: element.text,
                isCorrect: true
            }
            allItems.push(detail)
        });
        let wrongOptions = []
        let j = 0
        do {
            let temp = this.props.screenProps.generateItem(1, settings.color, settings.turning, settings.text)
            let isDuplicated = false
            for (let z = 0; z < targets.length; z++) {
                if (targets[z].shape == temp[0].shape && targets[z].color == temp[0].color) {
                    isDuplicated = true
                    //return
                    z = targets.length
                }
            }
            if (!isDuplicated) {
                let isDuplicatedInWrong = false
                for (let w = 0; w< wrongOptions.length; w++) {
                    if (wrongOptions[w].shape === temp[0].shape && wrongOptions[w].color === temp[0].color) {
                        isDuplicatedInWrong = true
                        //return 
                        w = wrongOptions.length
                    }
                }
                if (!isDuplicatedInWrong) {
                    wrongOptions.push(temp[0])
                    j = j + 1
                }
            }
        } while(j <= rows * cols - settings.number)
        wrongOptions.forEach(function(element, index) {
            let detail = {
                id: `oth-${index}`,
                shape: element.shape,
                color: element.color,
                turning: element.turning,
                isReverse: element.isReverse,
                text: element.text,
                isCorrect: false,
            }
            allItems.push(detail)
        })

        for (let i = 0; i < allItems.length; i++) {
            let pos = Math.floor(Math.random() * allItems.length)
            let temp = allItems[pos]
            allItems[pos] = allItems[i]
            allItems[i] = temp
        }
        
        this.props.navigation.navigate('Search', { 
            allItems: allItems
        })
    }
    generatedItemContainer = () => {
        let containers = []
        const formElement = this.props.screenProps.target
        for (let i = 0; i < formElement.length; i++) {
            
            containers.push(<ItemContainer 
                                key={ i }
                                target={ formElement[i] }
                                onClick={ this.props.screenProps.onClick }
                                levelSettings={ this.props.screenProps.levelSettings }
                            />
                            )
                            
        }
        return containers
    }
    render() {
        //console.error(this.props.screenProps.androidBackHandler)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E8E8F2' }}>
                <View style={ styles.topTextContainer }>
                    <Text style={ styles.textBig }>Level { this.props.screenProps.level }</Text>
                    <Text style={ styles.textMid }>Memoerize Time !</Text>
                </View>
                <View style={[this.props.screenProps.level < 3 ? {
                                display: 'flex', 
                                flexDirection: 'row', 
                                marginTop: 15, 
                                alignItems: 'center'
                            } : {
                                display: 'none', 
                                marginTop: 0
                                }
                            ]}
                >
                    { this._renderTutorial() }
                </View>
                <View style={ this.props.screenProps.level < 3 ? {flex: 7} : styles.hintsContainer}>
                   { this.generatedItemContainer() }
                </View>
                <View style={ styles.counterContainer }>
                    <TimerCountDown 
                        switchToSearch={ this.navigateToSearchScene }
                        addTotalTimePlayed={ this.props.screenProps.addTotalTimePlayed }
                    />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    topTextContainer:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
    },
    textBig: {
        fontSize: 28,
        fontFamily: 'Roboto'
    },
    textMid: {
        fontSize: 21,
    },
    itemContainer: {
        backgroundColor: "#FFFFFF",
    },
    hintsContainer: {
        flex: 9,
    },
    counterContainer: {
        flex: 1,
    },
    tutorialContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingVertical: 8
    },
    tutorialText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})