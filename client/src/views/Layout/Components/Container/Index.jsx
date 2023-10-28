import { Outlet, useLocation } from "react-router-dom";
import Home from "../../../../views/Home";
import Title from "./Components/Title";
import Main from "./Components/Main";

export default function Container({ id }) {
    const location = useLocation;

    switch (location().pathname) {
        case "/":
        case "/home":
            id = "home";
            break;
        case "/signin":
            id = "signin";
            break;
        case "/signup":
            id = "signup";
            break;

        default:
            break;
    }

    return (
        <>
            <Title id={id} />
            <Main id={id} children={location().pathname !== "/" ? <Outlet /> : <Home />} />
        </>
    );
}
