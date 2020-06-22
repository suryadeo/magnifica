import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import { createRootNavigator } from './router'
// import { isObjectExist } from './utils/common'

class App extends React.Component {
  static propTypes = {
    member: PropTypes.object.isRequired
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    // const { member } = this.props
    // const isAuthenticated = isObjectExist(member.data)
    const Layout = createRootNavigator()
    return <Layout />
  }
}

const mapStateToProps = state => ({
  member: state.member
})

export default connect(mapStateToProps)(App)
