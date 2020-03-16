import React from 'react';
import '../FirstRow/FirstRow.scss';
import UserImage from "../UserImage/UserImage";
import {IData} from "../../_store/interfaces/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {SetSorting} from "../../_store/actions/actions";
import {IStore} from "../../_store";
import {ReactComponent as ArrowUp} from "../../assets/arrowup.svg";
import {ReactComponent as ArrowDown} from "../../assets/arrowdown.svg";

interface IProps {
    item: IData
}

const Row: React.FC<IProps> = ({item}) => {

    const dispatch = useDispatch();

    const getKey = (event: React.MouseEvent) => {
        const element = event.target as HTMLElement;
        const key = element.getAttribute("data-key");
        if (key) {
            dispatch({type: SetSorting.Success, payload: key})
        }
    };

    /** Порядок сортировки */
    const sorting = useSelector((store: IStore) => store.data.selections.sorting);

    return (
        <div className='row' onClick={getKey}>
            <div className="image-placeholder"></div>
            <div data-key="firstName" className="row__name">{item.firstName}{sorting.key === "firstName" ? sorting.order ? <ArrowUp/> : <ArrowDown/> : null}</div>
            <div data-key="lastName" className="row__surname">{item.lastName}{sorting.key === "lastName" ? sorting.order ? <ArrowUp/> : <ArrowDown/> : null}</div>
            <div data-key="email" className="row__email">{item.email}{sorting.key === "email" ? sorting.order ? <ArrowUp/> : <ArrowDown/> : null}</div>
            <div data-key="phone" className="row__phone">{item.phone}{sorting.key === "phone" ? sorting.order ? <ArrowUp/> : <ArrowDown/> : null}</div>
            <div className="row__state">{item.address.state}</div>
            <div className="row__city">{item.address.city}</div>
            <div className="row__address">{item.address.streetAddress}</div>
            <div className="row__zip">{item.address.zip}</div>

        </div>
    );
};

export default Row;
