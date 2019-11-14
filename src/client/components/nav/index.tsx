import * as React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
    <ul>
        <li><Link to="/login">please login</Link></li>
        <li><Link to="/report">go to report</Link></li>
        <li><Link to="/home">back to home</Link></li>
    </ul>
)
export default Nav;