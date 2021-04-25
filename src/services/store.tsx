import { createStore,combineReducers} from "redux";
import {allreducer} from './reducers';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persitConfig={
    key:"root",
    storage:storage,
    whitelist:['user'],
}
const pReducer=persistReducer<any,any>(persitConfig,combineReducers(allreducer));

const store=createStore(pReducer,(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
const persistor=persistStore(store);
export {store,persistor};
