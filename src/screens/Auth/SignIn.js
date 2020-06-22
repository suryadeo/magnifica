import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { setMember, fetchMember } from '../../stores/actions/memberAction'
import { Styles } from '../../utils/'
import { fetchie } from '../../utils/common'

class SignIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    data: {
      email: 'agent@gmail.com',
      password: 'agent1234A'
    },
    message: '',
    error: false,
    loading: false
  }

  componentDidMount() {
    this.handleResetMessage()
  }

  handleResetMessage() {
    const { lang, langs } = this.props.lang.data
    const l = langs[lang].sign_in

    this.setState({ message: l.message })
  }

  handleSignIn() {
    const { dispatch } = this.props
    const { email, password } = this.state.data

    this.setState({ error: false, loading: true })
    this.handleResetMessage()

    fetchie('/sessions', {
      method: 'POST',
      body: 'email=' + email + '&password=' + password
    }, (response) => {
      this.setState({ loading: false })
      dispatch(setMember(response.data))
      // dispatch(fetchMember())
    }, (message) => {
      this.setState({ message: message, error: true, loading: false })
    })
  }

  handleDataChange(label, value) {
    this.setState({ data: { ...this.state.data, [label]: value } })
  }

  render() {
    const { navigation } = this.props
    const { lang, langs } = this.props.lang.data
    const l = Object.assign(langs[lang].general, langs[lang].sign_in)
    const { data, message, error, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container]}>
        <Header navigation={navigation} main={false} title={l.label_log_in} />
        <KeyboardAwareScrollView contentContainerStyle={[Styles.ContainerGap3]} enableOnAndroid={true} extraScrollHeight={30}>
          <View style={[Styles.Section]}>
            <View style={[Styles.H6]} />
            <View style={[Styles.FlexRow]}>
              <View style={[Styles.W6]} />
              <View style={[Styles.Flex1]}>
                <Text style={[Styles.FontMainRegular, Styles.TextCenter, Styles.Text1, error ? Styles.TextRed : Styles.TextGray]}>{message}</Text>
                <View style={[Styles.H4]} />
                <View>
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_email}</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoFocus={true}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    onSubmitEditing={() => { this.password.focus() }}
                    onChangeText={(text) => this.handleDataChange('email', text)}
                    value={data.email}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>{l.label_password}</Text>
                  <TextInput
                    autoCapitalize={'none'}
                    returnKeyType="done"
                    secureTextEntry={true}
                    style={[Styles.Padding0, Styles.BorderBot1, Styles.BorderGray, Styles.FontMainRegular, Styles.H8]}
                    ref={(ref) => { this.password = ref }}
                    onSubmitEditing={() => { this.handleSignIn() }}
                    onChangeText={(text) => this.handleDataChange('password', text)}
                    value={data.password}
                  />
                  <View style={[Styles.H1]} />
                  <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={[Styles.FontMainRegular, Styles.TextRight]}>{l.label_forgot_password} ?</Text>
                  </TouchableOpacity>
                  <View style={[Styles.H8]} />
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => this.handleSignIn()}>
                    <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{l.label_log_in}</Text>
                  </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
