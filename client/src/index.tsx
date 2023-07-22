import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux'
import store from './store'

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App  />       
        </BrowserRouter>
    </Provider>
);

