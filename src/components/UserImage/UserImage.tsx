import React from 'react';
import './UserImage.scss';
import {IData} from "../../_store/interfaces/interfaces";

interface IProps {
    item: IData
}

const UserImage: React.FC<IProps> = ({item: {firstName, lastName}}) => {

    return (
        <div className="user-image">
            {firstName[0]}{lastName[0]}
        </div>
    );
};

export default UserImage;
