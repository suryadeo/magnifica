import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import Restriction from '../Auth/Restriction'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import Slider from '../../components/Slider'
import { Styles } from '../../utils/'
import { fetchie, prices, isObjectExist } from '../../utils/common'

class Proposal extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired
  }

  state = {
    data: null,
    loading: false,
    error: ''
  }

  componentDidMount() {
    this.handleData()
  }

  handleData() {
    const { id, property_hunt_id } = this.props.navigation.state.params
    this.setState({ loading: true })
    fetchie('/property_hunts/' + property_hunt_id + '/proposals/' + id, {
      method: 'GET'
    }, (response) => {
      const { data } = response
      data.pictures = [].concat(data.exterior_pictures).concat(data.interior_pictures).concat(data.neighbourhood_pictures).concat(data.traffic_pictures)
      this.setState({ data: data || null, loading: false })
    }, (message) => {
      this.setState({ error: message, loading: false })
    })
  }

  render() {
    const { navigation, member } = this.props
    const { data, loading } = this.state
    const isAuthenticated = isObjectExist(member.data)

    if (isAuthenticated) {
      return (
        <SafeAreaView style={[Styles.Container]}>
          <Header navigation={navigation} main={false} title={'Proposal'} />
          {data ? (
            <View style={[Styles.Flex1]}>
              <ScrollView contentContainerStyle={[Styles.ContainerGap3]}>
                <View style={[Styles.Section]}>
                  <View style={[Styles.Margin3]}>
                    <Slider
                      data={data.pictures}
                      ratio={1}
                      offset={30}
                      name={'large_file_url'}
                    />
                  </View>
                </View>
                <View style={[Styles.Section]}>
                  <View style={[Styles.Margin3]}>
                    <View style={[Styles.FlexCenter]}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextBlack, Styles.TextCenter, Styles.Text4]}>{data.code || '-'}</Text>
                      <View style={[Styles.H2]} />
                      <Text style={[Styles.FontMainRegular, Styles.TextGray, Styles.TextCenter, Styles.Text3]}>{data.area || '-'}</Text>
                      <View style={[Styles.H1]} />
                      <Text style={[Styles.FontMainRegular, Styles.TextGray, Styles.TextCenter, Styles.Text3]}>{data.address || '-'}</Text>
                    </View>
                    <View style={[Styles.MarginVer3, Styles.PaddingVer3]}>
                      <View style={[Styles.FlexRow, Styles.FlexContentBetween, Styles.MarginVer05]}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextGray, Styles.Text2]}>Nama Owner</Text>
                        <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>{data.owner_name || 'Cicilsewa'}</Text>
                      </View>
                      <View style={[Styles.FlexRow, Styles.FlexContentBetween, Styles.MarginVer05]}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextGray, Styles.Text2]}>No. Handphone</Text>
                        <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>{data.owner_phone || '02122715593'}</Text>
                      </View>
                      <View style={[Styles.FlexRow, Styles.FlexContentBetween, Styles.MarginVer05]}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextGray, Styles.Text2]}>Luas</Text>
                        <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>{data.surface_area || '-'}</Text>
                      </View>
                      <View style={[Styles.FlexRow, Styles.FlexContentBetween, Styles.MarginVer05]}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextGray, Styles.Text2]}>Listrik</Text>
                        <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>{data.electricity_usage || '-'}</Text>
                      </View>
                      <View style={[Styles.FlexRow, Styles.FlexContentBetween, Styles.MarginVer05]}>
                        <Text style={[Styles.FontMainDemiBold, Styles.TextGray, Styles.Text2]}>Air</Text>
                        <Text style={[Styles.FontMainRegular, Styles.TextBlack, Styles.Text2]}>{data.water_source || '-'}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexCenter]}>
                      <Text style={[Styles.FontMainDemiBold, Styles.TextGreen, Styles.Text4]}>{prices('IDR', data.annual_rent_price || 0)} / tahun</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View style={[Styles.Section]}>
                <View style={[Styles.Flex1, Styles.PosAbsBot, Styles.BoxShadow, Styles.PaddingVer2, Styles.PaddingHor2, Styles.BgWhite]}>
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.BorderRadius2, Styles.BgGreen, Styles.H8]} onPress={() => navigation.navigate('ProposalForm', { data: data })}>
                    <Text style={[Styles.FontMainDemiBold, Styles.TextWhite]}>Update Proposal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
          {loading ? (
            <Loading />
          ) : null}
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

export default connect(mapStateToProps)(Proposal)
