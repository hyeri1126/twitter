import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Navigation = ({userObj}) => (
    <nav>
        <ul>
            
           <li><Link to="/">Home</Link></li>
           <li><Link to="/profile">{userObj.displayName}의 My Profile</Link></li>
        </ul>
    </nav>
)

export default Navigation;