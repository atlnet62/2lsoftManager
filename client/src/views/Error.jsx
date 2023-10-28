import { useRouteError, Link } from "react-router-dom";

export default function Error() {
    const error = useRouteError();

    return (
        <main id="error-page">
            <h2>Fatale error</h2>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="btn">
                Home
            </Link>
        </main>
    );
}
