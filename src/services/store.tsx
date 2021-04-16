import { createStore,combineReducers} from "redux";
import {allreducer} from './reducers';
export const store=createStore(combineReducers(allreducer),(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())