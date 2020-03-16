import React from 'react';
import './PageNumber.scss';
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../_store";
import {SetPage} from "../../_store/actions/actions";

interface IProps {
    total: number;
}

const PageNumber: React.FC<IProps> = ({total}) => {
    const dispatch = useDispatch();

    /** Меняем номер страницы */
    const changePage = (n: number) => {
        dispatch({type: SetPage.Success, payload: n})
    };

    /** Номер страницы из редьюсера */
    const page = useSelector((store: IStore) => store.data.selections.pagination.page);

    console.log(total);

    return (
        <div className="page-number">
            <Button type="button" onClick={() => changePage(-1)} disabled={page === 1}>Prev</Button>
            <Button type="button">{page}</Button>
            <Button type="button" onClick={() => changePage(1)} disabled={page === total}>Next</Button>
        </div>
    );
};

export default PageNumber;
