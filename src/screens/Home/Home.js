import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Restriction from '../Auth/Restriction'
import Header from '../../components/Header'
import ImageLoad from '../../components/ImageLoad'
import Loading from '../../components/Loading'
import { Colors, Styles } from '../../utils/'
import { fetchie, prices, isObjectExist } from '../../utils/common'

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired
  }

  state = {
    summary: {
      total: '20000000',
      proposal: '12',
      approved: '5',
      comission: '20%'
    },
    data: [],
    loading: false,
    error: ''
  }

  componentDidMount() {
    this.handleData()
  }

  handleData() {
    this.setState({ loading: true })
    fetchie('/proposals', {
      method: 'GET'
    }, (response) => {
      this.setState({ data: response.data || [], loading: false })
    }, (message) => {
      this.setState({ error: message, loading: false })
    })
  }

  render() {
    const { navigation, member } = this.props
    const { summary, data, loading } = this.state
    const isAuthenticated = isObjectExist(member.data)

    if (isAuthenticated) {
      return (
        <SafeAreaView style={[Styles.Container]}>
          <Header navigation={navigation} main={true} title={'HOME'} />
          <ScrollView contentContainerStyle={[Styles.ContainerGap4]}>
            <View style={[Styles.Section]}>
              <View style={[Styles.Margin3, Styles.BgGreen, Styles.BorderRadius2]}>
                <View style={[Styles.Padding3]}>
                  <View style={[Styles.H2]} />
                  <View style={[Styles.Flex1, Styles.FlexCenter]}>
                    <Text style={[Styles.FontMainDemiBold, Styles.TextWhite, Styles.Text4]}>{prices('IDR', summary.total)}</Text>
                    <Text style={[Styles.FontMainRegular, Styles.TextWhite]}>Total Keuntungan Anda</Text>
                  </View>
                  <View style={[Styles.H6]} />
                  <View style={[Styles.FlexRow, Styles.FlexCenter, Styles.FlexContentBetween]}>
                    <View style={[Styles.FlexCenter]}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{summary.proposal}</Text>
                      <Text style={[Styles.FontMainRegular, Styles.TextWhite]}>Total Proposal</Text>
                    </View>
                    <View style={[Styles.FlexCenter]}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{summary.approved}</Text>
                      <Text style={[Styles.FontMainRegular, Styles.TextWhite]}>Disetujui</Text>
                    </View>
                    <View style={[Styles.FlexCenter]}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>{summary.comission}</Text>
                      <Text style={[Styles.FontMainRegular, Styles.TextWhite]}>Komisi</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={[Styles.Section]}>
              <View style={[Styles.Margin3]}>
                <View style={[Styles.FlexCenter]}>
                  <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.Text4]}>Proposal Anda</Text>
                </View>
                <View style={[Styles.H3]} />
                {data.length ? (
                  <View>
                    {data.map((item, index) => {
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
                              <Text style={[Styles.FontMainDemiBold, Styles.TextBlack]}>{item.code || '-'}</Text>
                              <View style={[Styles.H05]} />
                              <Text style={[Styles.FontMainRegular, Styles.TextGray]}>{item.area || '-'}</Text>
                              <View style={[Styles.H05]} />
                              <Text style={[Styles.FontMainRegular, Styles.TextGray, Styles.Text1]}>{item.address || '-'}</Text>
                              <View style={[Styles.H05]} />
                              <Text style={[Styles.FontMainDemiBold, Styles.TextGreen, Styles.Text1]}>{prices('IDR', item.annual_rent_price || 0)} / tahun</Text>
                            </View>
                            <View style={[Styles.W2]} />
                            <Ionicons name="ios-arrow-forward" size={20} color={Colors.Gray} />
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                ) : null}
                {!data.length && !loading ? (
                  <View style={[Styles.FlexCenter]}>
                    <View style={[Styles.H3]} />
                    <Text style={[Styles.FontMainRegular, Styles.TextBlack]}>Maaf, Anda belum memiliki proposal.</Text>
                    <Text style={[Styles.FontMainRegular, Styles.TextBlack]}>Segera buat proposal Anda.</Text>
                    <View style={[Styles.H3]} />
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8, Styles.W20]} onPress={() => navigation.navigate('Browse')}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>Browse</Text>
                    </TouchableOpacity>
                    <View style={[Styles.H3]} />
                  </View>
                ) : null}
              </View>
            </View>
            {loading ? (
              <Loading />
            ) : null}
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
  member: state.member
})

export default connect(mapStateToProps)(Home)
