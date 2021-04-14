import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from "./redux/root-reducer";
import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

const logger = createLogger()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
