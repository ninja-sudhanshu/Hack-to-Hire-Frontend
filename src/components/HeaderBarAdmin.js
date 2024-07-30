import { Link, useNavigate } from "react-router-dom";
import './../components-style/HeaderBar.css'

function logout(){
    localStorage.clear();
    window.location.href = "/";
}

function HeaderBarAdmin(){
    return (
        <div className="fixed-top w-100 headerbar-bg">
            <nav className="container p-3 mx-auto d-flex align-items-center justify-content-between">
                <Link to="/">
                    <img src="https://s6web-prod.goindigo.in/content/dam/s6web/in/en/assets/logo/IndiGo_logo_2x.png" height={30} className="ms-4" />
                </Link>

                <div>
                    <ul className="list-inline m-0">
                        <li className="list-inline-item">
                            <button className="btn btn-dark rounded-pill px-3 py-2" onClick={()=>{logout()}}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default HeaderBarAdmin;