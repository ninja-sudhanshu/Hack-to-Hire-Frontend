import { Link } from "react-router-dom";
import './../components-style/HeaderBar.css'

function HeaderBar(){
    return (
        <div className="fixed-top w-100 pt-4">
            <nav className="container headerbar-bg p-3 rounded-pill mx-auto d-flex align-items-center justify-content-between">
                <Link to="/">
                    <img src="https://s6web-prod.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png" height={30} className="ms-4" />
                </Link>

                <div>
                    <ul className="list-inline m-0">
                        <li className="list-inline-item pe-2">
                            <Link to="/booking" className="text-decoration-none text-dark">
                                Book Flight
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="/admin">
                                <button className="btn btn-dark rounded-pill px-3 py-2">Airlines Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default HeaderBar;