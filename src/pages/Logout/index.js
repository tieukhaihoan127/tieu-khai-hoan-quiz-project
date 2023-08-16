import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../helpers/cookie";
import { useEffect } from "react";
import { authen } from "../../actions/authen";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    deleteCookie("id");
    deleteCookie("fullName");
    deleteCookie("email");
    deleteCookie("token");

    useEffect(() => {
        Swal.fire({
            title: 'Bạn có chắc muốn thoát?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(authen(false));
                navigate("/login");
            }
            else {
                navigate("/");
            }
        })

    }, [])
    return (
        <>
        </>
    )
}

export default Logout;