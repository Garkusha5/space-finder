import axios from 'axios'

const SET_SPACES = 'SET_SPACES'

const setSpaces = spaces => {
  return {
    type: SET_SPACES,
    spaces
  }
}

export const getSpaces = () => dispatch => {
  fetch('/api/spaces')
    .then(res => dispatch(setSpaces(res.data)))
    .catch()
}

const initialState = []

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPACES:
      return [...state, action.spaces]
    default:
      return state
  }
}

export default rootReducer
