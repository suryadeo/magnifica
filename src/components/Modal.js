import React from 'react'
import PropTypes from 'prop-types'
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Loading from './Loading'
import { Colors, Styles } from '../utils/'

class ModalBase extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    dismiss: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    option: PropTypes.object,
    children: PropTypes.node,
    loading: PropTypes.bool
  }

  render() {
    const { title, visible, dismiss, callback, option, children, loading } = this.props

    return (
      <Modal animationType={'slide'} transparent={true} visible={visible} onRequestClose={() => console.log('Modal Request Close')}>
        <SafeAreaView style={[Styles.Container]}>
          <View style={[Styles.Flex1]}>
            <View style={[Styles.PosAbsFull, Styles.BgWhiteTranscluent]}></View>
            <View style={[Styles.Flex1, Styles.BgWhite]}>
              <View style={[Styles.BorderBot1, Styles.BorderGrayLight, Styles.Z1]}>
                <View style={[Styles.FlexRow, Styles.FlexCenter, Styles.BgWhite, Styles.H10]}>
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.H10, Styles.W10]} onPress={() => dismiss()}>
                    <Ionicons name="ios-close" size={40} color={Colors.Black} />
                  </TouchableOpacity>
                  <View style={[Styles.Flex1]}>
                    <Text style={[Styles.FontSecondBold, Styles.TextCenter, Styles.Text4]}>{title}</Text>
                  </View>
                  {option ? (
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.H10, Styles.W10, { right: 10 }]} onPress={() => option.handler()}>
                      <Text style={[Styles.FontPrimaryRegular, Styles.TextGrey, Styles.TextCenter]}>{option.title}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.H10, Styles.W10, { right: 10 }]} />
                  )}
                </View>
              </View>
              {children}
              <View style={[Styles.Flex1, Styles.PosAbsBot, Styles.BoxShadow, Styles.PaddingVer2, Styles.PaddingHor2, Styles.BgWhite]}>
                <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => callback()}>
                  <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>Selesai</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : null}
      </Modal>
    )
  }
}

export default ModalBase
