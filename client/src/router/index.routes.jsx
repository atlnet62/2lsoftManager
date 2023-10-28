import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/Layout";
import Home from "../views/Home";
import Signin from "../views/User/Signin";
import Signup from "../views/User/Signup";
import Error from "../views/Error";
import Contact from "../views/Contact";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <Error />,
            children: [
                {
                    path:"/home",
                    element: <Home />,
                },
                {
                    path: "signin",
                    element: <Signin />,
                },
                {
                    path: "signup",
                    element: <Signup />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />
}
