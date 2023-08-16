import { setCookie } from "../../helpers/cookie";
import { checkLogin } from "../../services/usersServices";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authen";
import 'animate.css';
import {  FaCircleUser, FaLock } from "react-icons/fa6";
import pic from "../../image/thư mục không có tiêu đề/thư mục không có tiêu đề/Thêm_tiêu_đề-removebg-preview.png";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const response = await checkLogin(email, password);
        if (response.length > 0) {
            const { id, fullName, email, token } = response[0];
            setCookie("id", id, 10);
            setCookie("fullName", fullName, 10);
            setCookie("email", email, 10);
            setCookie("token", token, 10);
            navigate("/");
            dispatch(authen(true));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bạn đã đăng nhập thành công!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi đăng nhập!',
                text: 'Tài khoản hoặc mật khẩu không đúng',
                footer: '<a href="http://localhost:3000/login">Thử lại</a>'
            })
        }
    };
    const handleClick = () => {
        navigate("/register");
    };
    return (
        <>
            <div className="login animate__animated animate__fadeInDown">
                <div className="login__logo">
                    <img src={pic} />
                </div>
                <h3 className="login__title">Login</h3>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__email">
                        <input className="login__input" type="email" name="email" placeholder="Email" required />
                        <span className="login__icon"><FaCircleUser /></span>
                    </div>
                    <div className="login__password">
                        <input className="login__input" type="password" name="password" placeholder="Password" required />
                        <span className="login__icon"><FaLock /></span>
                    </div>
                    <div className="login__submit">
                        <button className="login__button">Login</button>
                    </div>
                </form>
                <div className="login__account" onClick={handleClick}>Create Account</div>
            </div>
        </>
    )
}

export default Login;