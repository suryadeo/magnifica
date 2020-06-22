import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native'

import Restriction from '../Auth/Restriction'
import Header from '../../components/Header'
import { setMember } from '../../stores/actions/memberAction'
import { Styles } from '../../utils/'
import { isObjectExist } from '../../utils/common'

class Settings extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
  }

  state = {
    loading: false
  }

  handleSignOut() {
    this.props.dispatch(setMember({}))
  }

  render() {
    const { navigation, member } = this.props
    const isAuthenticated = isObjectExist(member.data)

    if (isAuthenticated) {
      return (
        <SafeAreaView style={[Styles.Container]}>
          <Header navigation={navigation} main={true} title={'Settings'} />
          <ScrollView contentContainerStyle={[Styles.ContainerGap3, Styles.FlexCenter]}>
            <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius3, Styles.BgBlack, Styles.H8, Styles.W32]} onPress={() => this.handleSignOut()}>
              <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>SIGN OUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )
    }

    return (
      <Restriction navigation={navigation} />
    )
  }
}

const mapStateToProps = state => ({
  member: state.member,
  lang: state.lang
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
