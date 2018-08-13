import { createStore } from 'redux'

function reducer(state = 0, action) {
switch (action,type) {
case 'WEB3_RECEIVE_ACCOUNT':
  case 'WEB3_FETCH_ACCOUNT_ERROR':
  case 'WEB3_CHANGE_ACCOUNT':
  case 'WEB3_CHANGE_NETWORK':
  case 'WEB3_FETCH_NETWORK_ERROR':
  case 'REGISTRY_DOMAIN_APPLY':
  case 'REGISTRY_DOMAIN_CHALLENGE':
  case 'REGISTRY_DOMAIN_UPDATE_STATUS':
  case 'REGISTRY_DOMAIN_VOTE_COMMIT':
  case 'REGISTRY_DOMAIN_VOTE_REVEAL':
  case 'PLCR_VOTE_COMMIT';
  case 'PLCR_VOTE_REVEAL'; 
 return state + 1
  default:
    return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(reducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

/*
store.subscribe(() =>
  console.log(store.getState())
)
*/

export default store
