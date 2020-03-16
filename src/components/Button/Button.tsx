import React from 'react';
import './Button.scss';

interface IProps {
    children: React.ReactNode | React.ReactNode[];
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<IProps> = ({type = "button", className, disabled, onClick, children}) => {

    return (
        <button  className={`button ${className}`} type={type} onClick={onClick} disabled={disabled} >{children}</button>
    );
};

export default Button;
