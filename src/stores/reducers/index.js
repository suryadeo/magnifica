import { combineReducers } from 'redux'
import langReducer from './langReducer'
import memberReducer from './memberReducer'

const reducer = combineReducers({
  lang: langReducer,
  member: memberReducer
})

export default reducer
