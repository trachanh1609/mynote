import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider, connect } from 'react-redux';
import App from './App';
import { createStore } from 'redux';
import { searchRobots } from './reducers';

// const store = createStore(rootReducer);
const store = createStore(searchRobots);


// ReactDOM.render(<App store={store}/>, document.getElementById('root'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));