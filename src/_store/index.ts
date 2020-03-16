import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {GetDataEffect$} from "./effects/effects";
import dataReducer, {IDataState} from "./reducers/reducers";

export interface IStore {
    data: IDataState;
}

const observableMiddleware = createEpicMiddleware();

const reducers = combineReducers({
    data: dataReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(observableMiddleware)))

// @ts-ignore
observableMiddleware.run(combineEpics(
    GetDataEffect$
));
