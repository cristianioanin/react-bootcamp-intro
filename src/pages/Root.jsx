import { Link, Outlet } from 'react-router-dom';

function Root() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={'/home'}>Home</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    );
}

export default Root;
