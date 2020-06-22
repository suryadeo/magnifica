import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Image, ImageBackground, View } from 'react-native'

import { Styles } from '../utils/'

class ImageLoad extends React.Component {
  static propTypes = {
    placeholderSource: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    resizeMode: PropTypes.string,
    source: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    children: PropTypes.node
  }

  static defaultProps = {
    isShowActivity: true
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      isError: false
    }
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    })
  }

  onError() {
    this.setState({
      isError: true
    })
  }

  render() {
    const { placeholderSource, resizeMode, source, style, children } = this.props
    const { isLoaded, isError } = this.state

    return (
      <ImageBackground
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={[Styles.PosRel, style]}
        source={source}
        resizeMode={resizeMode}
      >
        {
          (isLoaded && !isError) ? children
            : (
              <View
                style={[Styles.Flex1, Styles.FlexCenter, Styles.BgGrayLight]}
              >
                {
                  (!isError) &&
                  <ActivityIndicator
                    style={[Styles.PosAbs, { margin: 'auto', zIndex: 1 }]}
                    size={'small'}
                    color={'gray'}
                  />
                }
                <Image
                  style={style}
                  source={placeholderSource || require('../../assets/images/placeholder-rect.png')}
                >
                </Image>
              </View>
            )
        }
        {
          this.props.children &&
          <View style={[Styles.PosAbsFull, Styles.BgTransparent]}>
            {
              this.props.children
            }
          </View>
        }
      </ImageBackground>
    )
  }
}

export default ImageLoad
