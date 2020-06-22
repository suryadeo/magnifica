import { Alert, Linking, Platform } from 'react-native'
import { store } from '../stores'

// const api = 'https://sun.cicilsewa.id'
const api = 'https://hunter-weyewe1.c9users.io/api/v1'
const version = '1.0'

const common = {
  API: api,

  fetchie(url, options, success, error, multipart) {
    const auth = common.oauth()
    const get = options.method === 'GET'
    const opts = Object.assign({ credentials: 'same-origin' }, {
      headers: Object.assign(
        auth ? {
          'Authorization': auth.token_type || 'Bearer' + ' ' + auth.access_token
        } : {},
        !get ? {
          'Content-Type': multipart ? 'multipart/form-data; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8'
        } : {}
      )
    }, options)

    fetch(api + url, opts)
      .then(res => res.json().then(data => ({ status: res.status, data: data })))
      .then((object) => {
        const { data } = object
        console.log(api + url, opts, data)

        if (object.status === 200 || object.status === 201) {
          if (typeof (success) === 'function') {
            success(data)
          }
        } else {
          if (typeof (error) === 'function') {
            if (data.errors || data.error) {
              error((data.errors ? data.errors[0] : data.error.message) || 'Error')
            } else {
              error(null)
            }
          }
        }
      })
      .catch((ex) => {
        if (typeof (error) === 'function') {
          error('ERROR')
        }
        console.log('ERROR', url, ex)
      })
  },

  oauth() {
    if (store && common.isObjectExist(store.getState().member.data)) {
      return store.getState().member.data
    }

    return false
  },

  urls(string, url) {
    if (url) {
      if (string.startsWith('http')) {
        const urla = string.split('/')
        const urls = string.split('/').splice(3, urla.length)
        urls[1] = urls[1] = urls[1] + 's'

        return '/' + urls.toString().replace(/,/g, '/')
      }

      return string
    }

    const strung = String(string)
    return strung.trim()
      .replace(/[^\w\s/]+/gi, '')
      .replace((/[\s]+/g), '-')
      .toLowerCase()
  },

  prices(prefix, price) {
    return !isNaN(price) && (prefix ? prefix + ' ' : '') + (Math.round(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },

  sanitizer(string) {
    return string && (string).replace(/<p>&nbsp;<\/p>/gi, '')
  },

  isObjectExist(obj) {
    return obj && Object.getOwnPropertyNames(obj).length > 0
  },

  objectToArray(obj) {
    return obj && Object.keys(obj).map((key) => obj[key])
  },

  isMobile() {
    return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
  },

  isEmail(email) {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
  },

  isLetter(letter) {
    return (/^[a-zA-Z\s]+$/).test(letter)
  },

  isNumber(number) {
    return (/^[0-9\b]+$/).test(number)
  },

  isPhone(number) {
    return (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im).test(number)
  },

  caseToTitle(string) {
    return string && string.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
  },

  throttle(fn, wait) {
    let time = Date.now()
    return () => {
      if ((time + (wait || 800) - Date.now()) < 0) {
        fn()
        time = Date.now()
      }
    }
  },

  debounce(fn, delay, ...arg) {
    let timer = null
    return function () {
      const context = this
      const args = arg

      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay || 200)
    }
  },

  handleCheckVersion(callback) {
    const ios = Platform.OS === 'ios'

    common.fetchie('/versions/device/' + Platform.OS, {
      method: 'GET'
    }, (response) => {
      const ver = (response.data.version).replace(/[^\d.-]/g, '')
      if (common.versionCompare(version, ver) < 0) {
        callback(true)
        Alert.alert(
          'Update Available',
          'This version of the app is outdated. Please update app from the ' + (ios ? 'App Store.' : 'Play Store.'),
          [{ text: 'Update Now',
            onPress: () => {
              callback(false)
              if (Platform.OS === 'ios') {
                Linking.openURL('itms://itunes.apple.com/us/app/cicilsewa/id1260457905?mt=8&uo=4').catch(err => console.error('An error occurred', err))
              } else {
                Linking.openURL('market://details?id=com.cicilsewa.propertyhunter').catch(err => console.error('An error occurred', err))
              }
            }
          }],
          { cancelable: false }
        )
      }
    }, (error) => {
      console.log(error)
    })
  },

  versionCompare(v1, v2, options) {
    const lexicographical = options && options.lexicographical
    const zeroExtend = options && options.zeroExtend
    let v1parts = v1.split('.')
    let v2parts = v2.split('.')

    function isValidPart(x) {
      return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x)
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN
    }

    if (zeroExtend) {
      while (v1parts.length < v2parts.length) v1parts.push('0')
      while (v2parts.length < v1parts.length) v2parts.push('0')
    }

    if (!lexicographical) {
      v1parts = v1parts.map(Number)
      v2parts = v2parts.map(Number)
    }

    for (let i = 0; i < v1parts.length; ++i) {
      if (v2parts.length === i) {
        return 1
      }

      if (v1parts[i] === v2parts[i]) {
        continue
      } else if (v1parts[i] > v2parts[i]) {
        return 1
      } else {
        return -1
      }
    }

    if (v1parts.length !== v2parts.length) {
      return -1
    }

    return 0
  }
}

module.exports = common
