import langs from '../../public/langs'

function lang(state = { data: { lang: 'id', langs: langs } }, action) {
  switch (action.type) {
    case 'SET_LANG':
      return {
        ...state,
        data: { lang: action.data, langs: langs }
      }
    default:
      return state
  }
}

export default lang
