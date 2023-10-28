import { useState } from "react";
import { Link } from "react-router-dom";
import icon_user from "./../../assets/face_co.png";
import Input from "../../Components/Input/Index";

/**
 *
 * @typedef {object} auth // hook content the object
 * @property {string} login
 * @property {string} password
 * @property {string} confirmPassword
 * Registration User Form
 * @returns {() => string} A message to valid or reject the user creation
 *
 */

function Signin() {
    const [auth, setAuth] = useState({ login: "", password: "", confirmPassword: "" });

    return (
        <section className="signin">
            <img src={icon_user} alt="user" />
            <form id="signin-form">
                <Input type="email" placeholder="E-mail@domain.com" value={auth.login} onChange={(e) => setAuth({ ...auth, login: e.target.value })} />
                <Input type="password" placeholder="Password" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} />
                <Input type="submit" value="Register" onChange={(e) => null} />
            </form>
            <p>
                Not Register :<Link to="/signup">Click here</Link>
            </p>
        </section>
    );
}

export default Signin;
