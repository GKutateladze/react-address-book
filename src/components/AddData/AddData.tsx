import React from 'react';
import './AddData.scss';
import {useReactiveForm} from "use-reactive-form";
import Input from "../Input/Input";
import {number, object, string} from "yup";
import {useDispatch} from "react-redux";
import {PostData} from "../../_store/actions/actions";
import Button from "../Button/Button";

interface IProps {
    onClose: () => void;
}

const AddData: React.FC<IProps> = ({onClose}) => {

        const dispatch = useDispatch();

        const fields = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: {
                streetAddress: '',
                city: '',
                state: '',
                zip: '',
            }
        };

        const schema = object().shape({
            firstName: string().required('This field is required!'),
            lastName: string().required('This field is required!'),
            email: string().email('Invalid email address!').required('This field is required!'),
            phone: number().required('This field is required!'),
            address: object().shape({
                streetAddress: string().required('This field is required!'),
                city: string().required('This field is required!'),
                state: string().required('This field is required!'),
                zip: number().required('This field is required!'),
            })
        });

        const config = {
            fields, schema
        };
        const {values, ref, getErrors, validate} = useReactiveForm(config);

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            if (validate()) {
                console.log(values());
                const id = Math.floor(Math.random() * 1000000);
                dispatch({
                        type: PostData.Success, payload: {
                            ...values(),
                            id
                        }
                    }
                );
                onClose();
            } else {
                console.log(getErrors())
            }

        };

        return (
            <div className="add-data">
                <form className="form" ref={ref} onSubmit={handleSubmit}>
                    <div className="form__row">
                        <Input name="firstName" type="text" placeholder="First Name"/>
                    </div>
                    <div className="form__row">
                        <Input name="lastName" type="text" placeholder="Last Name"/>
                    </div>
                    <div className="form__row">
                        <Input name="email" type="text" placeholder="Email"/>
                    </div>
                    <div className="form__row">
                        <Input name="phone" type="text" placeholder="Phone"/>
                    </div>
                    <div className="form__row">
                        <Input name="address_state" type="text" placeholder="State"/>
                    </div>
                    <div className="form__row">
                        <Input name="address_city" type="text" placeholder="City"/>
                    </div>
                    <div className="form__row">
                        <Input name="address_streetAddress" type="text" placeholder="Street"/>
                    </div>
                    <div className="form__row">
                        <Input name="address_zip" type="text" placeholder="Zip"/>
                    </div>
                    <div className="form__row">
                        <Button type="submit">Submit</Button>
                    </div>
                    <div className="form__row">
                        <Button type="button" onClick={onClose}>Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }
;

export default AddData;
