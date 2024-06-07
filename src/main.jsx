import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes/AppRouter'
import { Provider } from 'react-redux'
import store from './Redux/store'
import './main.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
   <AppRouter/>
   </Provider>
  </React.StrictMode>
);
