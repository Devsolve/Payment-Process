import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import './App.css';
import store from './store';
import PaymentProcess from './payment_gateway/view/PaymentProcess';

function App() {
  return (
    <ReduxProvider store={store}>
      <PaymentProcess/>
    </ReduxProvider>
  );
}

export default App;
