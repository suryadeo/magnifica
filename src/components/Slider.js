import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import ImageLoad from './ImageLoad'
import { Aspect, Colors, Styles } from '../utils/'

class Slider extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    ratio: PropTypes.number.isRequired,
    offset: PropTypes.number,
    action: PropTypes.func,
    name: PropTypes.string
  }

  state = {
    activeSlide: 0
  }

  renderItem({ item, index }) {
    const { ratio, action, offset, name } = this.props
    const Dimension = {
      width: ((Aspect.Width / 1) - offset),
      height: ((Aspect.Width / 1) - offset) / ratio
    }

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        style={[Styles.BgWhite, Styles.BorderRadius2, Styles.OverflowHidden, Dimension]}
        onPress={() => {
          if (action) {
            action(index)
          }
        }}
      >
        <ImageLoad
          placeholderSource={ratio > 1.25 ? require('../../assets/images/placeholder-rect.png') : ratio < 0.75 ? require('../../assets/images/placeholder-rect-ver.png') : require('../../assets/images/placeholder.png')}
          resizeMode={'cover'}
          source={{ uri: (name ? item[name] : item) || '' }}
          style={[Dimension]}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const { data } = this.props
    const { activeSlide } = this.state

    if (data && data.length) {
      return (
        <View style={[Styles.PosRel]}>
          <Carousel
            ref={(ref) => { this.carouselRef = ref }}
            data={data}
            renderItem={this.renderItem.bind(this)}
            sliderWidth={Aspect.Width}
            itemWidth={(Aspect.Width)}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            enableMomentum={false}
            activeSlideAlignment={'start'}
            containerCustomStyle={[Styles.BgWhite]}
            contentContainerCustomStyle={[Styles.BgWhite]}
            removeClippedSubviews={true}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            enableMomentum={true}
            containerStyle={[{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -10
            }]}
            dotColor={Colors.Black}
            dotStyle={[{
              width: 10,
              height: 10,
              marginHorizontal: -5,
              marginVertical: 5,
              borderRadius: 5
            }]}
            inactiveDotColor={Colors.White}
            inactiveDotOpacity={0.75}
            inactiveDotScale={0.75}
            vertical={false}
            carouselRef={this.carouselRef || {}}
            tappableDots={!!this.carouselRef}
          />
        </View>
      )
    }

    return null
  }
}

export default Slider
