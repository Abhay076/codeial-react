import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import { configureStore } from './store';
import { BrowserRouter } from 'react-router-dom';
const store = configureStore();
// console.log('store',store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </Provider>
  </BrowserRouter>
);
