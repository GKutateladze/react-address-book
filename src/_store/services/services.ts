import Axios from "axios-observable";
import {map} from "rxjs/operators";

export const getData = () => {
    return Axios.get('/').pipe(map(({ data }) => data))
};
