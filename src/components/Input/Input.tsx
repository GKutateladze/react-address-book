import React, {useEffect, useRef} from 'react';
import './Input.scss';
import {fromEvent} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {useDispatch} from "react-redux";

interface IProps {
    className?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    onChange?: (d: string) => void;
}

const Input: React.FC<IProps> = ({className, placeholder, type="text", name, onChange}) => {

    const dispatch = useDispatch();

    /** Ссылка на Input **/
    const input = useRef<HTMLInputElement>(null);

    /** Добавляем debounce **/
    useEffect(() => {
        /** Подписка на поле ввода **/
        let subscription$: any;
        if (input.current) {
            /** Создаем поток на KEYUP ивенте на элементе инпут **/
            subscription$ = fromEvent(input.current, "keyup")
                .pipe(
                    debounceTime(250),
                    map((event: Event) => (event.target as HTMLInputElement).value)
                )
                .subscribe((data: string) => {
                    onChange && onChange(data)
                })
        }
        return () => {
            if (subscription$) {
                subscription$.unsubscribe()
            }
        }
    }, [dispatch]);


    return (
        <input autoComplete="off" className="input" type={type} name={name} placeholder={placeholder} ref={input}/>
    );
};

export default Input;
