import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';

// import sagas from "./middleware/sagas/index";
// import rootReducer from "./middleware/reducers/index";


import { customHistory as browserHistory, getConfirmation } from './history';
import App from './App.js';
//import NoAccessPage from './NoAccessPage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const sagaMiddleware = createSagaMiddleWare();
// let createStoreWithMiddleware = composeEnhancers(applyMiddleware(sagaMiddleware))(createStore);
// const store = createStoreWithMiddleware(rootReducer);
// sagaMiddleware.run(sagas);

{/* <Provider store={store}>
        <Router key="router" history={browserHistory} getUserConfirmation={getConfirmation}>
            <Route path="/" component={App} />
        </Router>
    </Provider> */}
render(
    <Router key="router" history={browserHistory} getUserConfirmation={getConfirmation}>
        <Route path="/" component={App} />
    </Router>
    ,
    document.getElementById('root')
);

