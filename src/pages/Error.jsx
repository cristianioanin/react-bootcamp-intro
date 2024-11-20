import { useRouteError } from 'react-router-dom';

function Error() {
    const error = useRouteError();

    return (
        <main>
            <h1>Oops...</h1>
            <p>Something went wrong :|</p>
            <p>
                <em>
                    <strong>{error.status}</strong> {error.statusText}
                </em>
            </p>
            <p>
                <em>{error.message}</em>
            </p>
        </main>
    );
}

export default Error;
