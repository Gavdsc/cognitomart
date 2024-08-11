import React from "react";
import { useRouteError } from "react-router-dom";

/**
 * Props interface for router errors.
 */
interface RouterError {
    statusText: string, 
    message: string
}

/**
 * Component to display a simple error page.
 * @constructor
 */
const ErrorPage: React.FC<LibraryComponent> = () => {
    const error: RouterError = useRouteError() as RouterError;
    console.error(error);

    return (
        <div>
            <h1>Error!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;