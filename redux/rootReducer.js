const SET_SPACES = 'SET_SPACES'

const setSpaces = spaces => {
  return {
    type: SET_SPACES,
    spaces
  }
}

export const getSpaces = () => dispatch => {
  fetch('http://172.16.21.191:1337/api/spaces')
    .then(res => res.json())
    .then(data => {
      dispatch(setSpaces(data))
    })
    .catch(err => console.log(err))
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
