import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { authenReducer } from "../../reducers/authen";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa6";
import pic from "../../image/thư mục không có tiêu đề/thư mục không có tiêu đề/Thêm_tiêu_đề-removebg-preview.png";
function LayoutHeader() {
    const token = getCookie("token");
    const authen = useSelector(state => state.authenReducer);
    return(

        <>
        <header className="header">
                <div className="header__logo">
                    <Link to="/" className="header__title">
                        <img src={pic} alt="picture"/>
                    </Link>
                </div>
                {token && (
                    <ul className="header__menu">
                        <li className="header__home">
                            <NavLink to="/" className="header__title">
                                <button className="header__button" ><span className="text">Home</span></button>
                            </NavLink>
                        </li>
                        <li className="header__topic">
                            <NavLink to="/topic" className="header__title">
                                <button className="header__button" ><span className="text">Topic</span></button>
                            </NavLink>
                        </li>
                        <li className="header__answer">
                            <NavLink to="/answers" className="header__title">
                                <button className="header__button" ><span className="text">Answer</span></button>
                            </NavLink>
                        </li>
                    </ul>
                )}

                <ul className="header__menu">
                    {token ? (<>
                        <li  className="header__logout">
                            <NavLink to="/logout" className="header__title">
                            <button className="header__button" ><span className="text">Logout</span></button>
                            </NavLink>
                        </li>
                        <li className="header__bar">
                                <FaBars />
                                <ul className="header__menu--sub">
                                    <li className="header__board">
                                        <NavLink to="/" className="header__title--sub">
                                            <div className="header__border--1" ><span className="text">Home</span></div>
                                        </NavLink>
                                    </li>
                                    <li className="header__board">
                                        <NavLink to="/topic" className="header__title--sub">
                                            <div className="header__border--3" ><span className="text">Topic</span></div>
                                        </NavLink>
                                    </li>
                                    <li className="header__board">
                                        <NavLink to="/answers" className="header__title--sub">
                                            <div className="header__border--3" ><span className="text">Answer</span></div>
                                        </NavLink>
                                    </li>
                                    <li className="header__board">
                                        <NavLink to="/logout" className="header__title--sub">
                                            <div className="header__border--2" ><span className="text">Logout</span></div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                    </>) :
                        (<>
                            <li className="header__login">
                                <NavLink to="/login" className="header__title">
                                    <button className="header__button" ><span className="text">Login</span></button>
                                </NavLink>
                            </li>
                            <li className="header__register">
                                <NavLink to="/register" className="header__title">
                                    <button className="header__button" ><span className="text">Register</span></button>
                                </NavLink>
                            </li>
                            <li className="header__bar">
                                <FaBars />
                                <ul className="header__menu--sub">
                                    <li className="header__board">
                                        <NavLink to="/login" className="header__title--sub">
                                            <div className="header__border--1"><span className="text">Login</span></div>
                                        </NavLink>
                                    </li>
                                    <li className="header__board">
                                        <NavLink to="/register" className="header__title--sub">
                                            <div className="header__border--2"><span className="text">Register</span></div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </>)}
                </ul>
            </header>
        </>
    )
}

export default LayoutHeader;