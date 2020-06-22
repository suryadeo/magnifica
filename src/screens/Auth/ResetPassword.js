import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { Styles } from '../../utils/'
import { fetchie, isEmail } from '../../utils/common'

class ResetPassword extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired
  }

  state = {
    data: {
      email: ''
    },
    message: '',
    error: false,
    success: false,
    loading: false
  }

  componentDidMount() {
    this.handleResetMessage()
  }

  handleResetMessage() {
    const { lang, langs } = this.props.lang.data
    const l = langs[lang].reset_password

    this.setState({ message: l.message })
  }

  handleResetPassword() {
    const { email } = this.state.data
    const { lang, langs } = this.props.lang.data
    const l = langs[lang].general

    this.setState({ error: false })
    this.handleResetMessage()

    if (!isEmail(email)) {
      this.setState({ error: true, message: email.length === 0 ? l.valid_email_empty : l.valid_email })
    } else {
      this.setState({ loading: true })
      fetchie('/resetpassword', {
        method: 'POST',
        body: 'email=' + email
      }, (response) => {
        this.setState({ success: true, loading: false })
      }, (message) => {
        this.setState({ message: message, error: true, loading: false })
      })
    }
  }

  handleDataChange(label, value) {
    this.setState({ data: { ...this.state.data, [label]: value } })
  }

  render() {
    const { navigation } = this.props
    const { lang, langs } = this.props.lang.data
    const l = Object.assign(langs[lang].general, langs[lang].reset_password)
    const { message, error, success, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container]}>
        <Header navigation={navigation} main={false} title={l.reset_password} />
        <KeyboardAwareScrollView contentContainerStyle={[Styles.ContainerGap3]} enableOnAndroid={true} extraScrollHeight={30}>
          <View style={[Styles.Section]}>
            <View style={[Styles.H6]} />
            <View style={[Styles.FlexRow]}>
              <View style={[Styles.W6]} />
              {success ? (
                <View style={[Styles.Flex1]}>
                  <Text style={[Styles.FontMainRegular, Styles.TextCenter, Styles.Text1, error ? Styles.TextRed : Styles.TextGray]}>{l.thanks}</Text>
                  <Text style={[Styles.FontMainRegular, Styles.TextCenter, Styles.Text1, error ? Styles.TextRed : Styles.TextGray]}>{l.please}</Text>
                </View>
              ) : (
                <View style={[Styles.Flex1]}>
                  <Text style={[Styles.FontMainRegular, Styles.TextCenter, Styles.Text1, error ? Styles.TextRed : Styles.TextGray]}>{message}</Text>
                  <View>
                    <View style={[Styles.H4]} />
                    <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_email}</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoFocus={true}
                      keyboardType="email-address"
                      returnKeyType="done"
                      style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                      onSubmitEditing={() => { this.handleResetPassword() }}
                      onChangeText={(text) => this.handleDataChange('email', text)}
                    />
                    <View style={[Styles.H8]} />
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => this.handleResetPassword()}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{l.reset_password}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={[Styles.W6]} />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {loading ? (
          <Loading />
        ) : null}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  lang: state.lang
})

export default connect(mapStateToProps)(ResetPassword)
