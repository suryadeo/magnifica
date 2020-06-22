import React from 'react'
import PropTypes from 'prop-types'
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Header from '../../components/Header'
import ImageLoad from '../../components/ImageLoad'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import { Aspect, Colors, Styles } from '../../utils/'
import { fetchie, caseToTitle } from '../../utils/common'

class ProposalForm extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    modal: 0,
    data: null,
    type: null,
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  componentDidMount() {
    this.handleData()
  }

  handleData() {
    const { params } = this.props.navigation.state

    if (params && params.data) {
      this.setState({ data: params.data, type: 'update' })
    } else {
      this.setState({
        data: {
          id: '',
          property_hunt_id: params.property_hunt_id || '',
          code: '',
          area: '',
          address: '',
          owner_name: '',
          owner_phone: '',
          surface_area: '',
          electricity_usage: '',
          water_source: '',
          annual_rent_price: '',
          interior_pictures: [],
          exterior_pictures: [],
          traffic_pictures: [],
          canceled_at: '',
          confirmed_at: '',
          is_canceled: '',
          is_confirmed: ''
        },
        type: 'create'
      }, () => {
        this.handleProposal()
      })
    }
  }

  handleDataChange(label, value) {
    this.setState({ data: { ...this.state.data, [label]: value } }, () => {
      console.log(label, value, this.state.data)
    })
  }

  handleProposal(type) {
    const { data } = this.state

    this.setState({ loading: true })
    fetchie('/property_hunts/' + data.property_hunt_id + '/proposals' + (type ? ('/' + data.id + '/' + type) : ''), {
      method: 'POST',
      body: 'property_hunt_id=' + data.property_hunt_id + (type ? '&id=' + data.id : '')
    }, (response) => {
      this.setState({ loading: false }, () => {
        if (type) {
          this.handleDataChange('is_' + type + 'ed', true)
          Alert.alert('Success', 'Proposal ' + caseToTitle(type) + ' Berhasil', [{ text: 'OK' }])
        } else {
          this.handleDataChange('id', response.data.proposal.id)
        }
      })
    }, (message) => {
      this.setState({ loading: false }, () => {
        if (type) {
          Alert.alert('Error', message, [{ text: 'OK' }])
        }
      })
    })
  }

  handleInputFile(title, name, category) {
    const { data } = this.state

    ImagePicker.showImagePicker({
      title: 'Pilih ' + title,
      storageOptions: { skipBackup: true, path: 'images' }
    }, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        Alert.alert('Error', response.error, [{ text: 'OK' }])
      } else {
        const form = new FormData()

        form.append('file', {
          uri: response.uri,
          type: 'image/jpg',
          name: name
        })
        form.append('category', category)

        this.setState({ loading: true })
        fetchie('/proposals/' + data.id + '/proposal_pictures', {
          method: 'POST',
          body: form
        }, (response) => {
          this.setState({ loading: false }, () => {
            this.handleDataChange(name, data[name].concat(response.data.proposal_picture))
          })
        }, (message) => {
          this.setState({ loading: false }, () => {
            Alert.alert('Error', message, [{ text: 'OK' }])
          })
        }, true)
      }
    })
  }

  handleSubmit(valid) {
    const { data } = this.state

    if (valid) {
      this.setState({ loading: true })
      fetchie('/property_hunts/' + data.property_hunt_id + '/proposals' + (data.id ? '/' + data.id : ''), {
        method: data.id ? 'PUT' : 'POST',
        body: 'property_hunt_id=' + data.property_hunt_id + (data.id ? '&id=' + data.id : '') + '&area=' + data.area + '&address=' + data.address + '&owner_name=' + data.owner_name + '&owner_phone=' + data.owner_phone + '&surface_area=' + data.surface_area + '&electricity_usage=' + data.electricity_usage + '&water_source=' + data.water_source + '&annual_rent_price=' + data.annual_rent_price + '&interior_pictures=' + data.interior_pictures + '&exterior_pictures=' + data.exterior_pictures + '&traffic_pictures=' + data.traffic_pictures
      }, (response) => {
        this.setState({ success: true, loading: false })
      }, (message) => {
        this.setState({ message: message, error: true, loading: false })
      })
    } else {
      Alert.alert('Error', 'Harap lengkapi data proposal Anda', [{ text: 'OK' }])
    }
  }

  render() {
    const { navigation } = this.props
    const { modal, data, type, loading, success, error, message } = this.state
    const isCreate = type === 'create'
    const isFilled = {
      dataProperti: data ? (data.area || data.address || data.owner_name || data.owner_phone || data.surface_area || data.electricity_usage || data.water_source || data.annual_rent_price) : 0,
      fotoInterior: data ? (data.interior_pictures && data.interior_pictures.length) : 0,
      fotoExterior: data ? (data.exterior_pictures && data.exterior_pictures.length) : 0,
      fotoTraffic: data ? (data.traffic_pictures && data.traffic_pictures.length) : 0
    }
    const steps = (isFilled.dataProperti ? 1 : 0) + (isFilled.fotoInterior ? 1 : 0) + (isFilled.fotoExterior ? 1 : 0) + (isFilled.fotoTraffic ? 1 : 0)
    const Dimensions = {
      Foto: {
        width: (Aspect.Width - 50) / 3,
        height: (Aspect.Width - 50) / 3
      }
    }

    return (
      <SafeAreaView style={[Styles.Container]}>
        <Header navigation={navigation} main={false} title={'Proposal Form'} />
        {data ? (
          <View style={[Styles.Flex1]}>
            <ScrollView contentContainerStyle={[Styles.Container]}>
              {!success ? (
                <View style={[Styles.Section]}>
                  <View style={[Styles.Margin3]}>
                    <View>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text3]}>Harap Melengkapi Data Berikut</Text>
                      <View style={[Styles.H3]} />
                      <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>Kelengkapan Data ({steps }/4)</Text>
                      {error ? (
                        <View>
                          <View style={[Styles.H05]} />
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>{message}</Text>
                        </View>
                      ) : null}
                    </View>
                    <View style={[Styles.MarginVer3, Styles.PaddingVer3]}>
                      <TouchableOpacity style={[Styles.FlexRow, Styles.FlexAlignCenter, Styles.MarginHor3_, Styles.PaddingHor3, Styles.PaddingVer2, Styles.BorderBot1, Styles.BorderGrayLight]} onPress={() => this.setState({ modal: 1 })}>
                        <AntDesign name={isFilled.dataProperti ? 'checkcircle' : 'exclamationcircle'} size={30} color={isFilled.dataProperti ? Colors.Green : Colors.Orange} />
                        <View style={[Styles.W3]} />
                        <Text style={[Styles.Flex1, Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text2]}>DATA PROPERTI</Text>
                        <View style={[Styles.W3]} />
                        <Ionicons name="ios-arrow-forward" size={20} color={Colors.Gray} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[Styles.FlexRow, Styles.FlexAlignCenter, Styles.MarginHor3_, Styles.PaddingHor3, Styles.PaddingVer2, Styles.BorderBot1, Styles.BorderGrayLight]} onPress={() => this.setState({ modal: 2 })}>
                        <AntDesign name={isFilled.fotoInterior ? 'checkcircle' : 'exclamationcircle'} size={30} color={isFilled.fotoInterior ? Colors.Green : Colors.Orange} />
                        <View style={[Styles.W3]} />
                        <Text style={[Styles.Flex1, Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text2]}>FOTO INTERIOR</Text>
                        <View style={[Styles.W3]} />
                        <Ionicons name="ios-arrow-forward" size={20} color={Colors.Gray} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[Styles.FlexRow, Styles.FlexAlignCenter, Styles.MarginHor3_, Styles.PaddingHor3, Styles.PaddingVer2, Styles.BorderBot1, Styles.BorderGrayLight]} onPress={() => this.setState({ modal: 3 })}>
                        <AntDesign name={isFilled.fotoExterior ? 'checkcircle' : 'exclamationcircle'} size={30} color={isFilled.fotoExterior ? Colors.Green : Colors.Orange} />
                        <View style={[Styles.W3]} />
                        <Text style={[Styles.Flex1, Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text2]}>FOTO EKSTERIOR</Text>
                        <View style={[Styles.W3]} />
                        <Ionicons name="ios-arrow-forward" size={20} color={Colors.Gray} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[Styles.FlexRow, Styles.FlexAlignCenter, Styles.MarginHor3_, Styles.PaddingHor3, Styles.PaddingVer2, Styles.BorderBot1, Styles.BorderGrayLight]} onPress={() => this.setState({ modal: 4 })}>
                        <AntDesign name={isFilled.fotoTraffic ? 'checkcircle' : 'exclamationcircle'} size={30} color={isFilled.fotoTraffic ? Colors.Green : Colors.Orange} />
                        <View style={[Styles.W3]} />
                        <Text style={[Styles.Flex1, Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text2]}>FOTO TRAFFIC</Text>
                        <View style={[Styles.W3]} />
                        <Ionicons name="ios-arrow-forward" size={20} color={Colors.Gray} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={[Styles.Section]}>
                  <View style={[Styles.Margin3]}>
                    <View>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text3]}>{isCreate ? 'Berhasil Buat Proposal' : 'Berhasil Update Proposal'}</Text>
                      <View style={[Styles.H3]} />
                      <TouchableOpacity style={[Styles.Flex1, Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]} onPress={() => navigation.navigate('Home')}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              {!isCreate ? (
                <View>
                  {!data.is_canceled || !data.is_confirmed ? (
                    <View style={[Styles.FlexRow, Styles.Flex1, Styles.PaddingHor2, Styles.BgWhite, { top: -35 }]}>
                      <TouchableOpacity style={[Styles.Flex1, Styles.FlexCenter, Styles.BorderRadius2, Styles.BgRed, Styles.H8]} onPress={() => this.handleProposal('cancel')}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{'Cancel Proposal'}</Text>
                      </TouchableOpacity>
                      <View style={[Styles.W2]} />
                      <TouchableOpacity style={[Styles.Flex1, Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => this.handleProposal('confirm')}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{'Confirm Proposal'}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={[Styles.FontMainRegular, Styles.TextCenter, data.is_canceled ? Styles.TextRed : Styles.TextGeen]}>Proposal is {data.is_canceled ? 'Canceled' : 'Confirmed'}</Text>
                  )}
                </View>
              ) : null}
            </ScrollView>
            <View style={[Styles.Section]}>
              <View style={[Styles.FlexRow, Styles.Flex1, Styles.PosAbsBot, Styles.BoxShadow, Styles.PaddingVer2, Styles.PaddingHor2, Styles.BgWhite]}>
                <TouchableOpacity style={[Styles.Flex1, Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => this.handleSubmit(steps === 4)}>
                  <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{isCreate ? 'Buat Proposal' : 'Update Proposal'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[Styles.Section]}>
              <Modal
                title={'Data Properti'}
                visible={modal === 1}
                dismiss={() => this.setState({ modal: 0 })}
                callback={() => this.setState({ modal: 0 })}
                loading={loading}>
                <ScrollView contentContainerStyle={[Styles.ContainerGap3]}>
                  <View style={[Styles.Section]}>
                    <View style={[Styles.Margin3]}>
                      <View>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text3]}>Data Properti</Text>
                        <View style={[Styles.H3]} />
                        <View>
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Area</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.area}
                            onSubmitEditing={() => { this.address.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('area', text)}
                          />
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Address</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.address}
                            ref={(ref) => { this.address = ref }}
                            onSubmitEditing={() => { this.owner_name.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular]}
                            onChangeText={(text) => this.handleDataChange('address', text)}
                            multiline={true}
                            numberOfLines={3}
                          />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Nama Owner</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.owner_name}
                            ref={(ref) => { this.owner_name = ref }}
                            onSubmitEditing={() => { this.ownerPhone.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('owner_name', text)}
                          />
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>No. Handphone</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.owner_phone}
                            ref={(ref) => { this.ownerPhone = ref }}
                            onSubmitEditing={() => { this.surface_area.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('owner_phone', text)}
                          />
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Luas</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.surface_area}
                            ref={(ref) => { this.surface_area = ref }}
                            onSubmitEditing={() => { this.electricity.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('surface_area', text)}
                          />
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Listrik</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.electricity_usage}
                            ref={(ref) => { this.electricity_usage = ref }}
                            onSubmitEditing={() => { this.water_source.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('electricity_usage', text)}
                          />
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Air</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={data.water_source}
                            ref={(ref) => { this.water_source = ref }}
                            onSubmitEditing={() => { this.annual_rent_price.focus() }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('water_source', text)}
                          />
                          <View style={[Styles.H2]} />
                          <Text style={[Styles.FontMainDemiBold, Styles.Text1, Styles.TextGray]}>Harga per Tahun</Text>
                          <TextInput
                            autoCapitalize="none"
                            returnKeyType="next"
                            value={String(Number(data.annual_rent_price))}
                            ref={(ref) => { this.annual_rent_price = ref }}
                            onSubmitEditing={() => { console.log('Submit') }}
                            style={[Styles.Padding0, Styles.PaddingVer1, Styles.PaddingHor3, Styles.MarginVer1, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.FontMainRegular, Styles.H8]}
                            onChangeText={(text) => this.handleDataChange('annual_rent_price', text)}
                          />
                          <View style={[Styles.H2]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Modal>
              <Modal
                title={'Foto Interior'}
                visible={modal === 2}
                dismiss={() => this.setState({ modal: 0 })}
                callback={() => this.setState({ modal: 0 })}
                loading={loading}>
                <ScrollView contentContainerStyle={[Styles.ContainerGap3]}>
                  <View style={[Styles.Section]}>
                    <View style={[Styles.Margin3]}>
                      <View>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text3]}>Foto Interior</Text>
                        {!data.interior_pictures.length ? (
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>Anda belum mengupload foto traffic properti</Text>
                        ) : null}
                        <View style={[Styles.H3]} />
                        <View style={[Styles.FlexRow, Styles.FlexWrap, Styles.Margin1_]}>
                          {data.interior_pictures.map((item, index) => {
                            return (
                              <View key={index} style={[Styles.Margin1]}>
                                <ImageLoad
                                  placeholderSource={require('../../../assets/images/placeholder.png')}
                                  resizeMode={'cover'}
                                  source={{ uri: item.medium_file_url || '' }}
                                  style={[Styles.BorderRadius2, Styles.OverflowHidden, Dimensions.Foto]}
                                />
                                <TouchableOpacity style={[Styles.PosAbs, Styles.Top0, Styles.Right0, Styles.PaddingVer1, Styles.PaddingHor2, Styles.Hidden]}>
                                  <Ionicons name="ios-trash" size={20} color={Colors.White} />
                                </TouchableOpacity>
                              </View>
                            )
                          })}
                        </View>
                        <View style={[Styles.H3]} />
                        <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.BgWhite, Styles.H8]} onPress={() => this.handleInputFile('Foto Interior', 'interior_pictures', 1)}>
                          <Text style={[Styles.FontMainDemiBold, Styles.TextGray]}>Tambah Gambar Properti</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Modal>
              <Modal
                title={'Foto Eksterior'}
                visible={modal === 3}
                dismiss={() => this.setState({ modal: 0 })}
                callback={() => this.setState({ modal: 0 })}
                loading={loading}>
                <ScrollView contentContainerStyle={[Styles.ContainerGap3]}>
                  <View style={[Styles.Section]}>
                    <View style={[Styles.Margin3]}>
                      <View>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text3]}>Foto Eksterior</Text>
                        {!data.exterior_pictures.length ? (
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>Anda belum mengupload foto traffic properti</Text>
                        ) : null}
                        <View style={[Styles.H3]} />
                        <View style={[Styles.FlexRow, Styles.FlexWrap, Styles.Margin1_]}>
                          {data.exterior_pictures.map((item, index) => {
                            return (
                              <View key={index} style={[Styles.Margin1]}>
                                <ImageLoad
                                  placeholderSource={require('../../../assets/images/placeholder.png')}
                                  resizeMode={'cover'}
                                  source={{ uri: item.medium_file_url || '' }}
                                  style={[Styles.BorderRadius2, Styles.OverflowHidden, Dimensions.Foto]}
                                />
                                <TouchableOpacity style={[Styles.PosAbs, Styles.Top0, Styles.Right0, Styles.PaddingVer1, Styles.PaddingHor2, Styles.Hidden]}>
                                  <Ionicons name="ios-trash" size={20} color={Colors.White} />
                                </TouchableOpacity>
                              </View>
                            )
                          })}
                        </View>
                        <View style={[Styles.H3]} />
                        <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.BgWhite, Styles.H8]} onPress={() => this.handleInputFile('Foto Eksterior', 'exterior_pictures', 2)}>
                          <Text style={[Styles.FontMainDemiBold, Styles.TextGray]}>Tambah Gambar Properti</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Modal>
              <Modal
                title={'Foto Traffic'}
                visible={modal === 4}
                dismiss={() => this.setState({ modal: 0 })}
                callback={() => this.setState({ modal: 0 })}
                loading={loading}>
                <ScrollView contentContainerStyle={[Styles.ContainerGap3]}>
                  <View style={[Styles.Section]}>
                    <View style={[Styles.Margin3]}>
                      <View>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text3]}>Foto Traffic</Text>
                        {!data.traffic_pictures.length ? (
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>Anda belum mengupload foto traffic properti</Text>
                        ) : null}
                        <View style={[Styles.H3]} />
                        <View style={[Styles.FlexRow, Styles.FlexWrap, Styles.Margin1_]}>
                          {data.traffic_pictures.map((item, index) => {
                            return (
                              <View key={index} style={[Styles.Margin1]}>
                                <ImageLoad
                                  placeholderSource={require('../../../assets/images/placeholder.png')}
                                  resizeMode={'cover'}
                                  source={{ uri: item.medium_file_url || '' }}
                                  style={[Styles.BorderRadius2, Styles.OverflowHidden, Dimensions.Foto]}
                                />
                                <TouchableOpacity style={[Styles.PosAbs, Styles.Top0, Styles.Right0, Styles.PaddingVer1, Styles.PaddingHor2, Styles.Hidden]}>
                                  <Ionicons name="ios-trash" size={20} color={Colors.White} />
                                </TouchableOpacity>
                              </View>
                            )
                          })}
                        </View>
                        <View style={[Styles.H3]} />
                        <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderGray, Styles.BorderRadius2, Styles.BgWhite, Styles.H8]} onPress={() => this.handleInputFile('Foto Traffic', 'traffic_pictures', 4)}>
                          <Text style={[Styles.FontMainDemiBold, Styles.TextGray]}>Tambah Gambar Properti</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Modal>
            </View>
            {loading ? (
              <Loading />
            ) : null}
          </View>
        ) : null}
      </SafeAreaView>
    )
  }
}

export default ProposalForm
