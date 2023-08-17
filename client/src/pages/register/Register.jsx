import { useRef } from "react";
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./register.scss";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    

    const emailRef = useRef();   //usesRef to take control with the referenced element in DOM   
    const passwordRef = useRef();
    const usernameRef = useRef();

    const navigate = useNavigate();
    

    const handleStart = () => {
        setEmail(emailRef.current.value);
        
    };
    const handleFinish = async (e) => {
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        
            try {
                await axios.post("auth/register", { email,username, password });
                navigate("/login");
                toast.success("User Register Success");
            } catch (err) {
                toast.error("User Register Field !");
            }
        

    };
    return (
        <div className="register">
        <div className="top">
            <div className="wrapper">
            <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
            />
            <button className="loginButton"   >Sign In</button>
            </div>
            
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
            Ready to watch? Enter your email to create or restart your membership .
            </p>
            {!email ? ( // if not email show email input if email show password input
            <div className="input">
                <input type="email" placeholder="email address"   ref={emailRef} />    
                <button className="registerButton" onClick={handleStart}>
                Get Started
                </button>
            </div>
            ) : (
            <form className="input">
                <input type="username" placeholder="username"  ref={usernameRef} />
                <input type="password" placeholder="password"  ref={passwordRef} />
                <button className="registerButton" onClick={handleFinish}>
                Start
                </button>
            </form>
            )}
        </div>
        </div>
    );
}