import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
// import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
