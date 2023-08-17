import { useState } from "react";
import { ArrowDropDown, NotificationsNone, Search } from "@material-ui/icons";
import "./navbar.scss" ;
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthAction";


const Navbar = () => {
    const [isScroled, setisScroled] = useState(false);     
    const { dispatch } = useContext(AuthContext)                            // these state for changing the style of the navbar when you scrollDown take an other style then the first style

    window.onscroll = () => {
        setisScroled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    console.log(isScroled);
    return (
        <div className={isScroled ? "navbar scrolled" : "navbar"} >
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                    alt=""  />
                    <Link to="/" className="link">
                    <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">  {/*this className style to avoid the bad style after links get clicked */}
                        <span className="navbarMainLinks" >Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarMainLinks" >Movies</span>
                    </Link>
                    
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span>KID</span>
                    <NotificationsNone className="icon" />
                <img
                    src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                <div className="profile">
                <ArrowDropDown className="icon" />
                <div className="options">
                    <span>Profile</span>
                    <span onClick={() => dispatch(logout())} >Logout</span>
                </div>
                </div>
                
                </div>
            </div>
        </div>
    );
}

export default Navbar;
