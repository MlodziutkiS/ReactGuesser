
import './Button.css';

function Button(props) {
    if(props.style=="olx"){
        return (
            <button className='menu-nav'>{props.text}</button>
        );
    }else if(props.style=="olx-select"){
        return (
            <button className='menu-nav, mode-nav' onClick={props.onClick} >{props.text}</button>
        );
    }else{
        return (
            <button className='other' onClick={props.onClick}>{props.text}</button>
        );
    }

}

export default Button;
