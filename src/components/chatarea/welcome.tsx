import './style.css';
import logo from "./../../images/logo2.png";
const Welcome:React.FC=()=>{
    return(
        <div className="Welcome">
            <div>
                <img src={logo}></img>
            </div>
        </div>
    );
}
export default Welcome;