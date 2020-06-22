function member(state = { data: {} }, action) {
  switch (action.type) {
    case 'SET_MEMBER':
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

export default member
