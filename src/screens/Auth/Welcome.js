import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Aspect, Styles } from '../../utils/'
import { caseToTitle } from '../../utils/common'

class Welcome extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired
  }

  componentDidMount() {
    // this.props.navigation.navigate('Home')
  }

  render() {
    const { navigation } = this.props
    const { lang, langs } = this.props.lang.data
    const l = Object.assign(langs[lang].general, langs[lang].home)

    return (
      <SafeAreaView style={[Styles.Container]}>
        <ScrollView contentContainerStyle={[Styles.ContainerGap3, Styles.FlexContentCenter]}>
          <View style={[Styles.Section]}>
            <View style={[Styles.FlexAlignCenter]}>
              <Image source={require('../../../assets/images/brand-rect.png')} resizeMode="contain" style={[{ width: Aspect.Width / 3, height: Aspect.Width / 3 }]} />
              <View style={[Styles.FlexRow]}>
                <View style={[Styles.W6]} />
                <View style={[Styles.Flex1]}>
                  <Text style={[Styles.FontMainRegular, Styles.Text3, Styles.TextGray, Styles.TextCenter]}>{caseToTitle(l.bg_caption)}</Text>
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontMainDemiBold, Styles.Text3, Styles.TextBlack, Styles.TextCenter]}>Property Hunter</Text>
                  <View style={[Styles.H12]} />
                  <View style={[Styles.Flex1, Styles.FlexCenter]}>
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderGreen, Styles.BorderRadius2, Styles.BgGreen, Styles.H8, Styles.W24]} onPress={() => navigation.navigate('SignIn')}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{l.label_log_in}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[Styles.H6]} />
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.H8, Styles.Hidden]} onPress={() => navigation.navigate('Home')}>
                    <Text style={[Styles.FontMainDemiBold]}>{l.label_skip}</Text>
                  </TouchableOpacity>
                </View>
                <View style={[Styles.W6]} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  lang: state.lang
})

export default connect(mapStateToProps)(Welcome)
