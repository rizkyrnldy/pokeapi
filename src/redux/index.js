import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AllReducer from './reducers';

export default function configureStore() {
  const commposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(AllReducer,
    commposeEnhancers(
      applyMiddleware(thunk),
    )
  )    
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}