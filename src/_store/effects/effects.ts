import {ActionsObservable, ofType} from "redux-observable";
import {Action} from "redux-actions";
import {map, switchMap} from "rxjs/operators";
import {IData} from "../interfaces/interfaces";
import {GetData} from "../actions/actions";
import {getData} from "../services/services";

export const GetDataEffect$ = (actions$: ActionsObservable<Action<undefined>>) =>
    actions$.pipe(
        ofType(GetData.Pending),
        switchMap((action) => {
            return getData().pipe(
                map((data: IData[]) => {
                    return {
                        type: GetData.Success,
                        payload: data
                    }
                })
            )
        })
    );


