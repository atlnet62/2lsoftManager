import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link className="btn" to="/home">Home</Link>
            <Link className="btn" to="/contact">Contact</Link>
            <Link className="btn" to="/Signin">Sign-in/up</Link>
        </nav>
    )
}