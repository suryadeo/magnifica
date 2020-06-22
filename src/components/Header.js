import React from 'react'
import PropTypes from 'prop-types'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Colors, Styles } from '../utils/'

class Header extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    main: PropTypes.bool,
    title: PropTypes.string
  }

  handleTitle(title) {
    if (title.length > 25) {
      return title.substr(0, 22) + '...'
    }

    return title
  }

  render() {
    const { navigation, main, title } = this.props
    const isHome = title === 'HOME'

    return (
      <View style={[Styles.FlexColumn, Styles.BorderBot1, Styles.BorderGrayLight, Styles.Z1]}>
        <StatusBar animated={true} hidden={false} backgroundColor={Colors.White} barStyle={'dark-content'} />
        <View style={[Styles.FlexRow, Styles.FlexCenter, Styles.BgWhite, Styles.H10]}>
          <TouchableOpacity
            style={[Styles.FlexCenter, Styles.H10, Styles.W10]}
            onPress={() => {
              if (!main) {
                navigation.dispatch(NavigationActions.back())
              }
            }}
          >
            {!main ? (
              <Ionicons name="ios-arrow-back" size={30} color={Colors.Black} />
            ) : null}
          </TouchableOpacity>
          <View style={[Styles.Flex1, Styles.FlexAlignCenter]}>
            {title && isHome ? (
              <Image
                source={require('../../assets/images/brand-rect.png')}
                resizeMode={'contain'}
                style={[Styles.W12]}
              />
            ) : null}
            {title && !isHome ? (
              <Text style={[Styles.FontSecondBold, Styles.TextCenter, Styles.Text4]}>{this.handleTitle(title)}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={[Styles.FlexCenter, Styles.H10, Styles.W10]}
            onPress={() => null}
          >
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Header
