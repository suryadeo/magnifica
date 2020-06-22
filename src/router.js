import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import Welcome from './screens/Auth/Welcome'
import SignUp from './screens/Auth/SignUp'
import SignIn from './screens/Auth/SignIn'
import ResetPassword from './screens/Auth/ResetPassword'
import Proposal from './screens/Browse/Proposal'
import Proposals from './screens/Browse/Proposals'
import ProposalForm from './screens/Browse/ProposalForm'
import Main from './screens/Main'

export const SignedOut = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  SignUp: {
    screen: SignUp
  },
  SignIn: {
    screen: SignIn
  },
  ResetPassword: {
    screen: ResetPassword
  }
}, {
  headerMode: 'none',
  mode: 'card'
})

export const SignedIn = createStackNavigator({
  Main: {
    screen: Main
  },
  Proposal: {
    screen: Proposal
  },
  Proposals: {
    screen: Proposals
  },
  ProposalForm: {
    screen: ProposalForm
  }
}, {
  headerMode: 'none',
  mode: 'card'
})

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator({
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    }, {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    })
  )
}
