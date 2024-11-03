import Home from "../Home/Home";
import Button from "../Button/Button";

function Navi(){
    return (
        <div className='banner'>
            <Home/>
            <Button text="muza" style="olx"/>
            <Button text="Kinematografia" style="olx"/>
            <Button text="Info" style="olx"/>
            <Button text="Przegladaj gruzy" style="olx"/>
        </div>
    );
}
export default Navi;