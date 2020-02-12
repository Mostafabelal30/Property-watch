import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
