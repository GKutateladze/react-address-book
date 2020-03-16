import React, {useEffect, useState} from 'react';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {GetData, SetPage, SetSearch} from "./_store/actions/actions";
import {IData, IDataPage} from "./_store/interfaces/interfaces";
import {IStore} from "./_store";
import FirstRow from "./components/FirstRow/FirstRow";
import Row from "./components/Row/Row";
import Preloader from "./components/Preloader/Preloader";
import Input from "./components/Input/Input";
import {selectData} from "./_store/selectors/selectors";
import AddData from "./components/AddData/AddData";
import Button from "./components/Button/Button";
import PageNumber from "./components/PageNumber/PageNumber";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: GetData.Pending})
    }, [dispatch]);


    // -----------------------------------------------------------------------------------------------------------------

    /** Подписка на редюсер для получения данных из поля collection **/
    const collection: IDataPage = useSelector(selectData);

    /** Подписка на редюсер для получения данных из поля loaded **/
    const loaded: boolean = useSelector((store: IStore) => store.data.loaded);

    /** Вывод списка **/
    const list = collection.list.map((item: IData) => <Row key={item.id + item.address.zip} item={item}/>);

    // -----------------------------------------------------------------------------------------------------------------

    const fields: IData = {
        id: -1,
        firstName: 'Name',
        lastName: 'Surname',
        email: 'Email',
        phone: 'Phone',
        address: {
            state: 'State',
            city: 'City',
            streetAddress: 'Street',
            zip: 'Zip',
        },
        description: ''
    };

    const [showForm, toggleForm] = useState(false);

    const onChange = (data: string) => {
        dispatch({type: SetSearch.Success, payload: data})
    };
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <div className="root">
            {loaded ?
                <div className="list">
                    <div className="navigation">
                        <Input placeholder="Search" onChange={onChange}/>
                        <Button className="add-button" onClick={() => toggleForm(!showForm)}>Add</Button>
                    </div>
                    {showForm && <AddData onClose={() => toggleForm(false)}/>}
                    <FirstRow item={fields}/>
                    {list}
                    <PageNumber total={collection.total}/>
                </div>
                :
                <Preloader/>}
        </div>
    );
}

export default App;
