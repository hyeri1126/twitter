import React from "react";
import { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount, setNewAccount] =useState(true);
    const [error, setError] = useState("");
    
    const onChange = (event) => {
        const {
         target : {name, value},
        } = event;
        if (name === "email"){
         setEmail(value);
        }else if (name === "password"){
         setPassword(value);
        }
     } 
     const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email,password
                )
            } else{
                data = await authService.signInWithEmailAndPassword(
                    email, password
                )
            }
            console.log(data)
        } catch(error){
           setError(error.message);
        }
       
    }  
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type="submit" value={newAccount ? "Create Account" : "Login" }></input>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Login": "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;