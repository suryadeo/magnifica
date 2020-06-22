import { fetchie } from '../../utils/common'

export function setMember(data) {
  return {
    type: 'SET_MEMBER',
    data: data
  }
}

export function fetchMember() {
  return (dispatch, getState) => {
    return fetchie('/member/id/my/set/first', { method: 'GET' }, (response) => {
      dispatch(setMember(Object.assign(getState().member.data, response.data.records)))
    })
  }
}
