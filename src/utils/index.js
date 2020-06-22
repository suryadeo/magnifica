import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const OS = {
  iOS: Platform.OS === 'ios',
  Android: Platform.OS === 'android'
}

const Aspect = {
  Width: width,
  Height: height
}

const Colors = {
  White: '#fff',
  Black: '#000',
  Gray: '#777',
  GrayLight: '#eee',
  GrayTint: '#f2f2f2',
  Red: '#f01614',
  Green: '#00a89e',
  Orange: '#f6921c',
  Transparent: 'transparent',
  WhiteTranscluent: 'rgba(255, 255, 255, 0.5)',
  BlackTranscluent: 'rgba(0, 0, 0, 0.5)',
  Facebook: '#3b5998',
  Google: '#d54c3f',
  Twitter: '#1da1f2'
}

const Fonts = {
  AvenirNext: {
    Bold: 'AvenirNext-Bold',
    DemiBold: 'AvenirNext-DemiBold',
    Regular: 'AvenirNext-Regular'
  },
  CharisSIL: {
    Bold: OS.iOS ? 'CharisSIL-Bold' : 'CharisSIL-B',
    Regular: OS.iOS ? 'CharisSIL' : 'CharisSIL-R'
  }
}

const Styles = {
  Flex1: {
    flex: 1
  },
  Flex2: {
    flex: 2
  },
  Flex3: {
    flex: 3
  },
  Flex4: {
    flex: 4
  },
  Flex5: {
    flex: 5
  },
  Flex6: {
    flex: 6
  },
  FlexCol: {
    flexDirection: 'column'
  },
  FlexRow: {
    flexDirection: 'row'
  },
  FlexCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  FlexAlignCenter: {
    alignItems: 'center'
  },
  FlexAlignStart: {
    alignItems: 'flex-start'
  },
  FlexAlignEnd: {
    alignItems: 'flex-end'
  },
  FlexAlignBetween: {
    alignItems: 'space-between'
  },
  FlexAlignAround: {
    alignItems: 'space-around'
  },
  FlexAlignEvenly: {
    alignItems: 'space-evenly'
  },
  FlexContentCenter: {
    justifyContent: 'center'
  },
  FlexContentStart: {
    justifyContent: 'flex-start'
  },
  FlexContentEnd: {
    justifyContent: 'flex-end'
  },
  FlexContentBetween: {
    justifyContent: 'space-between'
  },
  FlexContentAround: {
    justifyContent: 'space-around'
  },
  FlexContentEvenly: {
    justifyContent: 'space-evenly'
  },
  FlexWrap: {
    flexWrap: 'wrap'
  },
  FlexAbs: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  Container: {
    flexGrow: 1,
    backgroundColor: Colors.White,
    paddingBottom: 0
  },
  ContainerGap: {
    flexGrow: 1,
    paddingBottom: 24
  },
  ContainerGap2: {
    flexGrow: 1,
    paddingBottom: 48
  },
  ContainerGap3: {
    flexGrow: 1,
    paddingBottom: 72
  },
  ContainerGap4: {
    flexGrow: 1,
    paddingBottom: 120
  },
  FontMainBold: {
    fontFamily: Fonts.AvenirNext.Bold
  },
  FontMainDemiBold: {
    fontFamily: Fonts.AvenirNext.DemiBold
  },
  FontMainRegular: {
    fontFamily: Fonts.AvenirNext.Regular
  },
  FontSecondBold: {
    fontFamily: Fonts.CharisSIL.Bold
  },
  FontSecondRegular: {
    fontFamily: Fonts.CharisSIL.Regular
  },
  H0: {
    height: 0
  },
  H05: {
    height: 2.5
  },
  H1: {
    height: 5
  },
  H2: {
    height: 10
  },
  H3: {
    height: 15
  },
  H4: {
    height: 20
  },
  H5: {
    height: 25
  },
  H6: {
    height: 30
  },
  H7: {
    height: 35
  },
  H8: {
    height: 40
  },
  H9: {
    height: 45
  },
  H10: {
    height: 50
  },
  H12: {
    height: 60
  },
  H16: {
    height: 80
  },
  H20: {
    height: 100
  },
  H24: {
    height: 120
  },
  H28: {
    height: 140
  },
  H32: {
    height: 160
  },
  H36: {
    height: 180
  },
  H40: {
    height: 200
  },
  H80: {
    height: 400
  },
  W0: {
    width: 0
  },
  W1: {
    width: 5
  },
  W2: {
    width: 10
  },
  W3: {
    width: 15
  },
  W4: {
    width: 20
  },
  W5: {
    width: 25
  },
  W6: {
    width: 30
  },
  W7: {
    width: 35
  },
  W8: {
    width: 40
  },
  W9: {
    width: 45
  },
  W10: {
    width: 50
  },
  W12: {
    width: 60
  },
  W16: {
    width: 80
  },
  W20: {
    width: 100
  },
  W24: {
    width: 120
  },
  W28: {
    width: 140
  },
  W32: {
    width: 160
  },
  W36: {
    width: 180
  },
  W40: {
    width: 200
  },
  BgWhite: {
    backgroundColor: Colors.White
  },
  BgBlack: {
    backgroundColor: Colors.Black
  },
  BgGray: {
    backgroundColor: Colors.Gray
  },
  BgGrayLight: {
    backgroundColor: Colors.GrayLight
  },
  BgGrayTint: {
    backgroundColor: Colors.GrayTint
  },
  BgRed: {
    backgroundColor: Colors.Red
  },
  BgGreen: {
    backgroundColor: Colors.Green
  },
  BgOrange: {
    backgroundColor: Colors.Orange
  },
  BgTransparent: {
    backgroundColor: Colors.Transparent
  },
  BgWhiteTranscluent: {
    backgroundColor: Colors.WhiteTranscluent
  },
  BgBlackTranscluent: {
    backgroundColor: Colors.BlackTranscluent
  },
  BgFacebook: {
    backgroundColor: Colors.Facebook
  },
  BgGoogle: {
    backgroundColor: Colors.Google
  },
  BgTwitter: {
    backgroundColor: Colors.Twitter
  },
  Text1: {
    fontSize: 12
  },
  Text2: {
    fontSize: 14
  },
  Text3: {
    fontSize: 16
  },
  Text4: {
    fontSize: 18
  },
  Text5: {
    fontSize: 20
  },
  Text6: {
    fontSize: 24
  },
  TextWhite: {
    color: Colors.White
  },
  TextBlack: {
    color: Colors.Black
  },
  TextGray: {
    color: Colors.Gray
  },
  TextGrayLight: {
    color: Colors.GrayLight
  },
  TextGrayTint: {
    color: Colors.GrayTint
  },
  TextRed: {
    color: Colors.Red
  },
  TextGreen: {
    color: Colors.Green
  },
  TextOrange: {
    color: Colors.Orange
  },
  TextLeft: {
    textAlign: 'left'
  },
  TextCenter: {
    textAlign: 'center'
  },
  TextRight: {
    textAlign: 'right'
  },
  TextItalic: {
    fontStyle: 'italic'
  },
  Margin0: {
    margin: 0
  },
  Margin05: {
    margin: 2.5
  },
  Margin1: {
    margin: 5
  },
  Margin2: {
    margin: 10
  },
  Margin3: {
    margin: 15
  },
  Margin05_: {
    margin: -2.5
  },
  Margin1_: {
    margin: -5
  },
  MarginVer05: {
    marginVertical: 2.5
  },
  MarginVer1: {
    marginVertical: 5
  },
  MarginVer2: {
    marginVertical: 10
  },
  MarginVer3: {
    marginVertical: 15
  },
  MarginHor1: {
    marginHorizontal: 5
  },
  MarginHor2: {
    marginHorizontal: 10
  },
  MarginHor3: {
    marginHorizontal: 15
  },
  MarginHor1_: {
    marginHorizontal: -5
  },
  MarginHor2_: {
    marginHorizontal: -10
  },
  MarginHor3_: {
    marginHorizontal: -15
  },
  Padding0: {
    padding: 0
  },
  Padding1: {
    padding: 5
  },
  Padding2: {
    padding: 10
  },
  Padding3: {
    padding: 15
  },
  Padding4: {
    padding: 20
  },
  Padding5: {
    padding: 25
  },
  Padding6: {
    padding: 30
  },
  PaddingVer1: {
    paddingVertical: 5
  },
  PaddingVer2: {
    paddingVertical: 10
  },
  PaddingVer3: {
    paddingVertical: 15
  },
  PaddingVer4: {
    paddingVertical: 20
  },
  PaddingVer5: {
    paddingVertical: 25
  },
  PaddingVer6: {
    paddingVertical: 30
  },
  PaddingHor1: {
    paddingHorizontal: 5
  },
  PaddingHor2: {
    paddingHorizontal: 10
  },
  PaddingHor3: {
    paddingHorizontal: 15
  },
  PaddingHor4: {
    paddingHorizontal: 20
  },
  PaddingHor5: {
    paddingHorizontal: 25
  },
  PaddingHor6: {
    paddingHorizontal: 30
  },
  PaddingLeft1: {
    paddingLeft: 5
  },
  PaddingLeft2: {
    paddingLeft: 10
  },
  PaddingLeft3: {
    paddingLeft: 15
  },
  PaddingLeft4: {
    paddingLeft: 20
  },
  PaddingLeft5: {
    paddingLeft: 25
  },
  PaddingLeft6: {
    paddingLeft: 30
  },
  PaddingRight1: {
    paddingRight: 5
  },
  PaddingRight2: {
    paddingRight: 10
  },
  PaddingRight3: {
    paddingRight: 15
  },
  PaddingRight4: {
    paddingRight: 20
  },
  PaddingRight5: {
    paddingRight: 25
  },
  PaddingRight6: {
    paddingRight: 30
  },
  BorderRadius1: {
    borderRadius: 5
  },
  BorderRadius2: {
    borderRadius: 10
  },
  BorderRadius3: {
    borderRadius: 15
  },
  BorderRadius4: {
    borderRadius: 20
  },
  BorderRadius5: {
    borderRadius: 25
  },
  Border1: {
    borderWidth: 1
  },
  BorderTop1: {
    borderTopWidth: 1
  },
  BorderBot1: {
    borderBottomWidth: 1
  },
  BorderRight1: {
    borderRightWidth: 1
  },
  BorderLeft1: {
    borderLeftWidth: 1
  },
  BorderWhite: {
    borderColor: Colors.White
  },
  BorderBlack: {
    borderColor: Colors.Black
  },
  BorderGray: {
    borderColor: Colors.Gray
  },
  BorderGrayLight: {
    borderColor: Colors.GrayLight
  },
  BorderGrayTint: {
    borderColor: Colors.GrayTint
  },
  BorderRed: {
    borderColor: Colors.Red
  },
  BorderGreen: {
    borderColor: Colors.Green
  },
  BorderOrange: {
    borderColor: Colors.Orange
  },
  BorderTransparent: {
    borderColor: Colors.Transparent
  },
  PosRel: {
    position: 'relative'
  },
  PosAbs: {
    position: 'absolute'
  },
  PosAbsFull: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  PosAbsTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  PosAbsBot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },
  Top0: {
    top: 0
  },
  Top1: {
    top: 5
  },
  Top2: {
    top: 10
  },
  Top3: {
    top: 15
  },
  Top1_: {
    top: -5
  },
  Top2_: {
    top: -10
  },
  Top3_: {
    top: -15
  },
  Right0: {
    right: 0
  },
  Right1: {
    right: 5
  },
  Right2: {
    right: 10
  },
  Right3: {
    right: 15
  },
  Right1_: {
    right: -5
  },
  Right2_: {
    right: -10
  },
  Right3_: {
    right: -15
  },
  Bot0: {
    bottom: 0
  },
  Bot1: {
    bottom: 5
  },
  Bot2: {
    bottom: 10
  },
  Bot3: {
    bottom: 15
  },
  Bot0_: {
    bottom: -0
  },
  Bot1_: {
    bottom: -5
  },
  Bot2_: {
    bottom: -10
  },
  Bot3_: {
    bottom: -15
  },
  Left0: {
    left: 0
  },
  Left1: {
    left: 5
  },
  Left2: {
    left: 10
  },
  Left3: {
    left: 15
  },
  Left1_: {
    left: -5
  },
  Left2_: {
    left: -10
  },
  Left3_: {
    left: -15
  },
  Z1: {
    zIndex: 1
  },
  Z2: {
    zIndex: 2
  },
  Z3: {
    zIndex: 3
  },
  Hidden: {
    width: 0,
    height: 0,
    overflow: 'hidden',
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  },
  OverflowHidden: {
    overflow: 'hidden'
  },
  BoxShadow: {
    shadowColor: Colors.Grey,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 1
  }
}

const UI = {
  OS: OS,
  Aspect: Aspect,
  Colors: Colors,
  Fonts: Fonts,
  Styles: Styles
}

module.exports = UI
