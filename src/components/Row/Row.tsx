import React from 'react';
import './Row.scss';
import {IData} from "../../_store/interfaces/interfaces";
import UserImage from "../UserImage/UserImage";

interface IProps {
    item: IData
}

const Row: React.FC<IProps> = ({item}) => {
    return (
        <div className='row'>
            <UserImage item={item}/>
            <div className="row__name">{item.firstName}</div>
            <div className="row__surname">{item.lastName}</div>
            <div className="row__email">{item.email}</div>
            <div className="row__phone">{item.phone}</div>
            <div className="row__state">{item.address.state}</div>
            <div className="row__city">{item.address.city}</div>
            <div className="row__address">{item.address.streetAddress}</div>
            <div className="row__zip">{item.address.zip}</div>
        </div>
    );
};

export default Row;
