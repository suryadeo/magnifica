import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Picker, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import { Styles } from '../utils/'

class ModalPicker extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    dismiss: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    selectedValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string
    ])
  }

  state = {
    item: null
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data) || prevProps.selectedValue !== this.props.selectedValue) {
      const { data, callback, selectedValue } = this.props
      if (data.length && selectedValue) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].value === selectedValue || data[i].id === Number(selectedValue)) {
            callback(data[i], true)
            break
          }
        }
      }
    }
  }

  render() {
    const { data, visible, dismiss, callback, selectedValue } = this.props
    const { item } = this.state

    return (
      <Modal animationType={'slide'} transparent={true} visible={visible} onRequestClose={() => console.log('Modal Picker Request Close')}>
        <TouchableWithoutFeedback onPress={() => dismiss()}>
          <View style={[Styles.Flex1, Styles.FlexContentEnd]}>
            <View style={[Styles.PosAbsFull, Styles.BgWhiteTranscluent]}></View>
            <TouchableWithoutFeedback>
              <View style={[Styles.H40, Styles.BgWhite]}>
                <View style={[Styles.FlexRow, Styles.FlexContentSpaceBetween, Styles.BorderTop1, Styles.BorderBot1, Styles.BorderGrayLight]}>
                  <TouchableOpacity style={[Styles.PaddingVer2, Styles.PaddingHor3]} onPress={() => {
                    dismiss()
                  }}>
                    <Text style={[Styles.FontMainDemiBold, Styles.TextGray]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[Styles.PaddingVer2, Styles.PaddingHor3]} onPress={() => {
                    dismiss()
                    if (item) {
                      callback(item || {})
                    } else {
                      this.setState({ item: data[0] || {} })
                      callback(data[0] || {})
                    }
                  }}>
                    <Text style={[Styles.FontMainDemiBold, Styles.TextGray]}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Picker
                    selectedValue={item ? (item.value || item.id) : selectedValue}
                    onValueChange={(item, index) => this.setState({ item: data[index] })}>
                    {data.map((item, index) => {
                      return (
                        <Picker.Item key={index} label={item.label || item.name} value={item.value || item.id} />
                      )
                    })}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

export default ModalPicker
