import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUserAlt, FaKey} from "react-icons/fa";
import '../../css/admin-login.css';
import Alert from "../common/alert";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    return (
        <>
            <div className="admin-login-form">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src="/NTVN-logo.png" width="70" className="brand_logo" alt="Logo"/>
                            </div>
                        </div>
                        <h3 className="text-center text-white mt-5 pt-4">Quản trị viên</h3>
                        <div className="d-flex justify-content-center form_container">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><FaUserAlt/></span>
                                    </div>
                                    <input type="text" name="" className="form-control input_user" value=""
                                           placeholder="Tài khoản"/>
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><FaKey/></span>
                                    </div>
                                    <input type="password" name="" className="form-control input_pass" value=""
                                           placeholder="Mật khẩu"/>
                                </div>

                                <div className="d-flex justify-content-center mt-4 login_container">
                                    <button type="button" name="button" className="btn login_btn btn-default">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert = {setAlertStatus}
            />
        </>
    );
}

export default Login;