import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Aspect, Styles } from '../../utils/'

class Restriction extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props
    const { lang, langs } = this.props.lang.data
    const l = Object.assign(langs[lang].general, langs[lang].restriction)

    return (
      <SafeAreaView style={[Styles.Container]}>
        <KeyboardAwareScrollView contentContainerStyle={[Styles.ContainerGap3]} enableOnAndroid={true} extraScrollHeight={30}>
          <View style={[Styles.Section]}>
            <View style={[Styles.H12]} />
            <View style={[Styles.FlexAlignCenter]}>
              <Image source={require('../../../assets/images/brand-rect.png')} resizeMode="contain" style={[{ width: Aspect.Width / 3, height: Aspect.Width / 3 }]} />
              <View style={[Styles.W6]} />
              <View style={[Styles.Flex1, Styles.PaddingHor6]}>
                <Text style={[Styles.FontMainRegular, Styles.TextCenter, Styles.TextGray]}>{l.message}</Text>
                <View style={[Styles.H6]} />
                <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => navigation.navigate('SignIn')}>
                  <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{l.got_it}</Text>
                </TouchableOpacity>
              </View>
              <View style={[Styles.W6]} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  lang: state.lang
})

export default connect(mapStateToProps)(Restriction)
