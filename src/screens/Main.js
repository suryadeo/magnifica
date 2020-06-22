import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import Home from './Home/Home'
import Browse from './Browse/Browse'
import Settings from './Settings/Settings'

import { Colors, Fonts } from '../utils/'

class Main extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props

    return (
      <MainTab navigation={navigation} />
    )
  }
}

const MainTab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <Image source={focused ? require('../../assets/images/tab-home-active.png') : require('../../assets/images/tab-home-inactive.png')} style={{ width: 26, height: 26 }} />
      )
    }
  },
  Browse: {
    screen: Browse,
    navigationOptions: {
      tabBarLabel: 'Browse',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <Image source={focused ? require('../../assets/images/tab-browse-active.png') : require('../../assets/images/tab-browse-inactive.png')} style={{ width: 20, height: 20, bottom: -1 }} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <Image source={focused ? require('../../assets/images/tab-member-active.png') : require('../../assets/images/tab-member-inactive.png')} style={{ width: 24, height: 24, bottom: -1 }} />
      )
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Colors.Green,
    inactiveTintColor: Colors.Gray,
    upperCaseLabel: false,
    showIcon: true,
    showLabel: true,
    style: {
      borderTopWidth: 1,
      borderTopColor: Colors.GrayLight,
      backgroundColor: Colors.White,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    },
    labelStyle: {
      fontFamily: Fonts.AvenirNext.Regular,
      top: -2
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    }
  },
  swipeEnabled: false,
  lazyLoad: true,
  animationEnabled: false
})

Main.router = MainTab.router

export default Main
