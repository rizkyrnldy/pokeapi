import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import configureStore from './redux';
import * as serviceWorker from './serviceWorker';
const store = configureStore();

class AppWeb extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider >
    )
  }
}

ReactDOM.render(<AppWeb />, document.getElementById('root'));
serviceWorker.unregister();
