import {createSelector} from "reselect";
import {IStore} from "../index";
import {IData, IPagination, ISort} from "../interfaces/interfaces";

export const selectData = createSelector(
    (store: IStore) => store.data.selections.list,
    (store: IStore) => store.data.selections.search,
    (store: IStore) => store.data.selections.sorting,
    (store: IStore) => store.data.selections.pagination,
    (list: IData[], search: string, sorting: ISort, pagination: IPagination) => {
        let result: IData[] = list;
        let total = list.length / pagination.size;

        result = [...list]
            .filter((item: IData) => {
                let valid = true;
                const searchWords = search.split(" ");
                searchWords.forEach(word => {
                    if (word &&
                        !item.firstName.toLowerCase().includes(word.toLowerCase()) &&
                        !item.lastName.toLowerCase().includes(word.toLowerCase()) &&
                        !item.address.state.toLowerCase().includes(word.toLowerCase()) &&
                        !item.address.city.toLowerCase().includes(word.toLowerCase()) &&
                        !item.address.streetAddress.toLowerCase().includes(word.toLowerCase())) {
                        valid = false;
                    }
                });
                return valid;
            });
        total = Math.floor(result.length /pagination.size);
        result = result
            .slice((pagination.page - 1) * pagination.size, pagination.page * pagination.size)
            .sort((a: IData, b: IData) => {
                // @ts-ignore
                if (a[sorting.key] > b[sorting.key]) return sorting.order ? 1 : -1;
                // @ts-ignore
                if (a[sorting.key] < b[sorting.key]) return sorting.order ? -1 : 1;
                else return 0;
            });

        return {
            list: result,
            total
        }
    }
);
