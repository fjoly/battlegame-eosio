import React from 'react';
import './Button.css'

//User isLoading Props
interface Props {
    isLoading : boolean | undefined,
}
//Button wrapped component
const Button: React.FC<Props &  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ className,style,onClick,children,isLoading ,type}) => {
    // Enable the loading CSS class if either the private state attribute `loading`
    // or the props `loading` is true
    //Disable button if isLoading to true
    return (
        <button disabled={isLoading}
            className={`Button${ className ? ' ' + className : '' }${ isLoading ? ' loading' : '' }`}
            { ...{ type, style, onClick } }
        >{ children }</button>
    );
}
export default Button;

