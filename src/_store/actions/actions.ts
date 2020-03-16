import {createActions} from 'redux-actions';
import {IData} from "../interfaces/interfaces";

export enum GetData {
    Pending = '[Pending] Получаем данные',
    Success = '[Success] Получаем данные'
}

export enum SetSearch {
    Success = '[Success] Активируем поиск'
}

export enum SetSorting {
    Success = '[Success] Активируем сортировку'
}

export enum PostData {
    Success = '[Success] Добавляем данные'
}

export enum SetPage {
    Success = '[Success] Меняем страницу'
}

createActions({
    [GetData.Success]: (payload: string) => payload,
    [SetSearch.Success]: (payload: string) => payload,
    [SetSorting.Success]: (payload: string) => payload,
    [PostData.Success]: (payload: IData) => payload,
    [SetPage.Success]: (payload: number) => payload,
});

