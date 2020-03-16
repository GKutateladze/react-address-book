import {handleActions} from "redux-actions";
import {IData, IPagination, ISort} from "../interfaces/interfaces";
import {GetData, PostData, SetPage, SetSearch, SetSorting} from "../actions/actions";

export interface IDataState {
    collection: IData[];
    selections: {
        list: IData[];
        search: string;
        sorting: ISort;
        pagination: IPagination;
    };
    loaded: boolean;
}

const initialState: IDataState  = {
    collection: [],
    selections: {
        list: [],
        search: '',
        sorting: {
            key: '',
            order: true
        },
        pagination: {
            size: 50,
            page: 1
        }
    },
    loaded: false
};


const dataReducer = handleActions(
    {
        [GetData.Success]: (state: IDataState, action: any) => {
            return {
                ...state,
                collection: action.payload,
                selections: {
                    ...state.selections,
                    list: action.payload
                },
                loaded: true
            }
        },
        [SetSearch.Success]: (state: IDataState, action: any) => {
            return {
                ...state,
                selections: {
                    ...state.selections,
                    search: action.payload
                }
            }
        },
        [SetSorting.Success]: (state: IDataState, action: any) => {

            let value = state.selections.sorting.order;
            if (value === undefined) {
                value = false
            }

            value = !value;

            return {
                ...state,
                selections: {
                    ...state.selections,
                    sorting: {
                        key: action.payload,
                        order: action.payload === state.selections.sorting.key ? !state.selections.sorting.order : true
                    }
                }
            }
        },
        [PostData.Success]: (state: IDataState, action: any) => {
            return {
                ...state,
                selections: {
                    ...state.selections,
                    list: [action.payload, ...state.selections.list]
                },
                collection: {
                    ...state.collection,
                    list: [action.payload, ...state.collection]
                }
            }
        },
        [SetPage.Success]: (state: IDataState, action: any) => {
            return {
                ...state,
                selections: {
                    ...state.selections,
                    pagination: {
                        ...state.selections.pagination,
                        page: state.selections.pagination.page + action.payload
                    }
                }
            }
        }
    },
    initialState
);

export default dataReducer;
