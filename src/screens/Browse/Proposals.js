import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Header from '../../components/Header'
import ImageLoad from '../../components/ImageLoad'
import Loading from '../../components/Loading'
import { Colors, Styles } from '../../utils/'
import { fetchie, prices, debounce } from '../../utils/common'

class Proposals extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    search: '',
    data: [],
    index: 0,
    limit: 10,
    loading: false,
    refreshing: false,
    ending: false
  }

  componentDidMount() {
    this.handleData(0)
    this.handleSearch = debounce(this.handleSearch)
  }

  handleSearch() {
    this.handleData(0)
  }

  handleData(index) {
    const { property_hunt_id } = this.props.navigation.state.params
    const { search, data, limit } = this.state

    // console.log('/limit/' + limit + '/position/' + (index * limit) + '/query/' + search)
    fetchie(property_hunt_id ? ('/property_hunts/' + property_hunt_id + '/proposals') : '/proposals', {
      method: 'GET'
    }, (response) => {
      const records = response.data

      if (records.length) {
        this.setState({
          data: index ? data.concat(records) : records,
          index: index,
          loading: false,
          refreshing: false,
          ending: records.length < limit
        })
      } else {
        this.setState({
          data: [],
          index: 0,
          loading: false,
          refreshing: false,
          ending: true
        })
      }
    }, (message) => {
      this.setState({ message: message })
    })
  }

  render() {
    const { navigation } = this.props
    const { property_hunt_id } = navigation.state.params
    const { search, data, index, loading, refreshing, ending } = this.state

    return (
      <SafeAreaView style={[Styles.Container]}>
        <Header navigation={navigation} main={false} title={'Proposal List'} />
        <View style={[Styles.Flex1]}>
          <View style={[Styles.Section, Styles.BgWhite, Styles.BorderBot1, Styles.BorderGrayLight]}>
            <View style={[Styles.H2]} />
            <View style={[Styles.FlexRow]}>
              <View style={[Styles.W2]} />
              <View style={[Styles.FlexRow, Styles.Flex1, Styles.BgGrayLight, Styles.BorderRadius2]}>
                <View style={[Styles.FlexCenter, Styles.W8, Styles.H8]}>
                  <Ionicons name="ios-search" size={20} color={Colors.Gray} />
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Search ..."
                  placeholderTextColor={Colors.Gray}
                  returnKeyType="search"
                  style={[Styles.Flex1, Styles.Padding0, Styles.FontMainRegular, Styles.H8]}
                  value={search}
                  onChangeText={(text) => this.setState({ search: text }, () => this.handleSearch())}
                  onSubmitEditing={() => this.handleSearch()}
                />
                <TouchableOpacity style={[Styles.FlexCenter, Styles.W8, Styles.H8]} onPress={() => this.setState({ search: '' }, () => this.handleSearch())}>
                  <Ionicons name="md-close" size={20} color={Colors.Gray} />
                </TouchableOpacity>
              </View>
              <View style={[Styles.W2]} />
            </View>
            <View style={[Styles.H2]} />
          </View>
          <View style={[Styles.Container, Styles.Flex1]}>
            <FlatList
              contentContainerStyle={[!data.length ? Styles.Flex1 : {}, Styles.MarginHor3]}
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity key={index} style={[Styles.FlexRow, Styles.PaddingVer2, Styles.BorderBot1, Styles.BorderGrayLight]} onPress={() => navigation.navigate('Proposal', { id: item.id, property_hunt_id: item.property_hunt_id })}>
                    <ImageLoad
                      placeholderSource={require('../../../assets/images/placeholder.png')}
                      source={{ uri: item.main_picture_medium_url || '' }}
                      resizeMode={'cover'}
                      style={[Styles.W12, Styles.H12, Styles.BorderRadius2, Styles.OverflowHidden]}
                    />
                    <View style={[Styles.W2]} />
                    <View style={[Styles.FlexRow, Styles.Flex1, Styles.FlexAlignCenter]}>
                      <View style={[Styles.Flex1]}>
                        <View style={[Styles.Flex1, Styles.FlexRow, Styles.FlexContentBetween]}>
                          <Text style={[Styles.FontMainDemiBold, Styles.TextBlack]}>{item.code || '-'}</Text>
                          <Text style={[Styles.FontMainDemiBold, Styles.TextGreen]}>{prices('IDR', item.annual_rent_price || 0)} / tahun</Text>
                        </View>
                        <View style={[Styles.H05]} />
                        <Text style={[Styles.FontMainDemiBold, Styles.TextGray]}>{item.title || '-'}</Text>
                        <View style={[Styles.H05]} />
                        <View style={[Styles.Flex1, Styles.FlexRow, Styles.FlexContentBetween]}>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>Luas</Text>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>{item.surface_area || '-'}</Text>
                        </View>
                        <View style={[Styles.H05]} />
                        <View style={[Styles.Flex1, Styles.FlexRow, Styles.FlexContentBetween]}>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>Listrik</Text>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>{item.electricity_usage || '-'}</Text>
                        </View>
                        <View style={[Styles.H05]} />
                        <View style={[Styles.Flex1, Styles.FlexRow, Styles.FlexContentBetween]}>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>Air</Text>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>{item.water_source || '-'}</Text>
                        </View>
                        <View style={[Styles.H05]} />
                        <View style={[Styles.Flex1, Styles.FlexRow, Styles.FlexContentBetween]}>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>Status</Text>
                          <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text1]}>{item.status || '-'}</Text>
                        </View>
                        <View style={[Styles.H05]} />
                        <Text style={[Styles.FontMainRegular, Styles.TextGray, Styles.Text1]}>{item.feedback || 'Feedback'}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={() => Math.random().toString(36).substring(7)}
              refreshing={refreshing}
              removeClippedSubviews={false}
              onRefresh={() => {
                if (!refreshing) {
                  this.setState({ refreshing: true }, () => {
                    this.handleData(0)
                  })
                }
              }}
              onEndReached={() => {
                if (!loading && !ending) {
                  this.setState({ loading: true }, () => {
                    this.handleData(index + 1)
                  })
                }
              }}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={() => {
                if (!index && ending) {
                  return (
                    <View style={[Styles.Container, Styles.FlexCenter]}>
                      <Image
                        source={require('../../../assets/images/brand-rect.png')}
                        resizeMode={'contain'}
                        style={[Styles.W16, Styles.H16]}
                      />
                      <Text style={[Styles.FontMainRegular, Styles.TextGray, Styles.Text2]}>Tidak ada proposal</Text>
                    </View>
                  )
                }

                return (
                  <Loading />
                )
              }}
              ListFooterComponent={() => {
                if (index && !ending) {
                  return (
                    <View style={[Styles.FlexCenter, Styles.H10]}>
                      <ActivityIndicator color={Colors.BlackTranscluent} size={'small'} />
                    </View>
                  )
                }

                return (
                  <View style={[Styles.H3]} />
                )
              }}
            />
          </View>
          <View style={[Styles.PosAbs, Styles.Bot1, Styles.Right1, Styles.Z1]}>
            <TouchableOpacity style={[Styles.Margin2, Styles.PaddingVer1, Styles.PaddingHor3, Styles.BorderRadius5, Styles.BgGreen, Styles.W10, Styles.H10]} onPress={() => navigation.navigate('ProposalForm', { property_hunt_id: property_hunt_id })}>
              <Ionicons name="ios-add" size={40} color={Colors.White} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default Proposals
