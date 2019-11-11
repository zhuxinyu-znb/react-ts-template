import * as React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
    <ul>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/report">report</Link></li>
    </ul>
)
export default Nav;