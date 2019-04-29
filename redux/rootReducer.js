const SET_SPACES = 'SET_SPACES'
const SET_DIRECTIONS = 'SET_DIRECTIONS'

const setSpaces = spaces => {
  return {
    type: SET_SPACES,
    spaces
  }
}

const setDirections = directions => {
  return { type: SET_DIRECTIONS, directions }
}

export const getSpaces = () => dispatch => {
  fetch(
    'http://172.16.21.191:1337/api/spaces'
    // 'http://192.168.1.2:1337/api/spaces'
  )
    .then(res => res.json())
    .then(data => {
      dispatch(setSpaces(data))
    })
    .catch(err => console.log(err))
}

export const getDirections = (
  currentLat,
  currentLng,
  latitude,
  longitude
) => dispatch => {
  fetch(
    `http://www.mapquestapi.com/directions/v2/route?key=BGCVggKXKVscIKMloZtIWNJ3iufKg02c&from=${currentLat},${currentLng}&to=${latitude},${longitude}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=true&enhancedNarrative=false&avoidTimedConditions=false`
  )
    .then(res => res.json())
    .then(data => dispatch(setDirections(data)))
    .catch(err => console.log(err))
}

const initialState = { spaces: [], directions: {} }

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPACES:
      return { ...state, spaces: action.spaces }
    case SET_DIRECTIONS:
      return { ...state, directions: action.directions }
    default:
      return state
  }
}

export default rootReducer
