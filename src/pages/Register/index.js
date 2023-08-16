import { generateToken } from "../../helpers/generateToken";
import { checkExistedEmail, postListUsers } from "../../services/usersServices";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import "animate.css";
import { FaUserLarge, FaEnvelope, FaLock } from "react-icons/fa6";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import pic from "../../image/thư mục không có tiêu đề/thư mục không có tiêu đề/Thêm_tiêu_đề-removebg-preview.png";
import 'sweetalert2/src/sweetalert2.scss'
function Register() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const existEmail = await checkExistedEmail(email);
        if (existEmail.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email đã tồn tại!!',
                footer: '<a href="http://localhost:3000/register">Thử lại</a>'
              })
        }
        else {
            const token = generateToken();
            let options = {
                fullName: fullName,
                email: email,
                password: password,
                token: token
            }
            const response = await postListUsers(options);
            if (response) {
                Swal.fire(
                    'Register Successfully!',
                    'Bạn đã đăng kí thành công!',
                    'success'
                )
                navigate("/login");
            }
            else {
                alert("Đăng nhập thất bại!");
            }
        }
    }
    return (
        <>
            <div className="register animate__animated animate__fadeInDown">
                <div className="register__logo">
                    <img src={pic} />
                </div>
                <h3 className="register__title">Register</h3>
                <form className="register__form" onSubmit={handleSubmit}>
                    <div className="register__name">
                        <input className="register__input" type="text" name="fullName" placeholder="Full Name" required />
                        <span className="register__icon"><FaUserLarge /></span>
                    </div>
                    <div className="register__email">
                        <input className="register__input" type="email" name="email" placeholder="Email" required />
                        <span className="register__icon"><FaEnvelope /></span>
                    </div>
                    <div className="register__password">
                        <input className="register__input" type="password" name="password" placeholder="Password" required />
                        <span className="register__icon"><FaLock /></span>
                    </div>
                    <div className="register__submit">
                        <button className="register__button">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;