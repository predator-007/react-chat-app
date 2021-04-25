import './style.css';
import logo from "./../../images/icons8-chat.gif";
const Welcome:React.FC=()=>{
    const divStyle={marginLeft:"25vw",padding:'10vh',};
    return(
        <div className="Welcome" style={{width:"65vw"}}>
            <div style={divStyle}>
                <img className="logoStyle" src={logo}></img>
            </div>
        </div>
    );
}
export default Welcome;