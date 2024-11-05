import Home from "../Home/Home";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import './Navi.css';
function Navi(){
    return (
        <div className='banner'>
            <Link to="/"><Home/></Link>
            <div className="naviButton">
                <Link to="/muza"><Button text="muza" style="olx"/></Link>
                <Link to="/filmy"><Button text="Kinematografia" style="olx"/></Link>
                <Link to="/kontakt"><Button text="Info" style="olx"/></Link>
                <Link to="/game"><Button text="Przegladaj gruzy" style="olx"/></Link>
            </div>
        </div>
    );
}
export default Navi;