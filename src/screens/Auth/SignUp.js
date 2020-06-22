import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { setMember, fetchMember } from '../../stores/actions/memberAction'
import { Styles } from '../../utils/'
import { fetchie, isEmail } from '../../utils/common'

class SignUp extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    data: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm: ''
    },
    error: false,
    success: false,
    loading: false
  }

  componentDidMount() {
    this.handleResetMessage()
  }

  handleResetMessage() {
    const { lang, langs } = this.props.lang.data
    const l = langs[lang].sign_up

    this.setState({ message: l.message })
  }

  handleSignUp(type) {
    const { dispatch } = this.props
    const { name, email, phone, password, confirm } = this.state.data
    const { lang, langs } = this.props.lang.data
    const l = langs[lang].general

    this.setState({ error: false })
    this.handleResetMessage()

    if (!name) {
      this.setState({ error: true, message: l.valid_full_name })
    } else if (!isEmail(email)) {
      this.setState({ error: true, message: email.length === 0 ? l.valid_email_empty : l.valid_email })
    } else if (!phone || phone.length < 10 || phone.length > 13) {
      this.setState({ error: true, message: phone.length === 0 ? l.valid_phone_empty : l.valid_phone })
    } else if (!password || password.length < 6) {
      this.setState({ error: true, message: password.length === 0 ? l.valid_password_empty : l.valid_password })
    } else if (!confirm || confirm !== password) {
      this.setState({ error: true, message: confirm.length === 0 ? l.valid_password_confirmation_empty : l.valid_password_confirmation })
    } else {
      this.setState({ loading: true, error: false }, () => {
        this.handleResetMessage()
      })

      fetchie('/account/member', {
        method: 'POST',
        body: 'name=' + name + '&email=' + email + '&mobile_phone_number=' + phone + '&password=' + password
      }, (response) => {
        this.setState({ loading: false })
        dispatch(setMember(response.data))
        // dispatch(fetchMember())
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
    const l = Object.assign(langs[lang].general, langs[lang].sign_up)
    const { message, error, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container]}>
        <Header navigation={navigation} main={false} title={l.label_register} />
        <KeyboardAwareScrollView contentContainerStyle={[Styles.ContainerGap3]} enableOnAndroid={true} extraScrollHeight={30}>
          <View style={[Styles.Section]}>
            <View style={[Styles.H6]} />
            <View style={[Styles.FlexRow]}>
              <View style={[Styles.W6]} />
              <View style={[Styles.Flex1]}>
                <Text style={[Styles.FontMainRegular, Styles.TextCenter, Styles.Text1, error ? Styles.TextRed : Styles.TextGray]}>{message}</Text>
                <View style={[Styles.H4]} />
                <View>
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_full_name}</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoFocus={true}
                    returnKeyType="next"
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    onSubmitEditing={() => { this.email.focus() }}
                    onChangeText={(text) => this.handleDataChange('name', text)}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_email}</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    ref={(ref) => { this.email = ref }}
                    onSubmitEditing={() => { this.phoneNumber.focus() }}
                    onChangeText={(text) => this.handleDataChange('email', text)}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_phone}</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    ref={(ref) => { this.phoneNumber = ref }}
                    onSubmitEditing={() => { this.password.focus() }}
                    onChangeText={(text) => this.handleDataChange('phone', text)}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_password}</Text>
                  <TextInput
                    autoCapitalize="none"
                    returnKeyType="next"
                    secureTextEntry={true}
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    ref={(ref) => { this.password = ref }}
                    onSubmitEditing={() => { this.passwordConfirmation.focus() }}
                    onChangeText={(text) => this.handleDataChange('password', text)}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_password_confirmation}</Text>
                  <TextInput
                    autoCapitalize={'none'}
                    returnKeyType="done"
                    secureTextEntry={true}
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    ref={(ref) => { this.passwordConfirmation = ref }}
                    onSubmitEditing={() => { this.handleSignUp() }}
                    onChangeText={(text) => this.handleDataChange('confirm', text)}
                  />
                  <View style={[Styles.H1]} />
                  <View style={[Styles.H8]} />
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderWhite, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => this.handleSignUp()}>
                    <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{l.label_register}</Text>
                  </TouchableOpacity>
                </View>
                <View style={[Styles.H4]} />
                <Text style={[Styles.FontMainRegular, Styles.TextCenter]}>{l.or}</Text>
                <View style={[Styles.H4]} />
                <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderGreen, Styles.BgorderRadius2, Styles.BgGWhite, Styles.H8]} onPress={() => navigation.navigate('SignIn')}>
                  <Text style={[Styles.FontMainDemiBold, Styles.TextGreen]}>{l.label_log_in}</Text>
                </TouchableOpacity>
              </View>
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

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
