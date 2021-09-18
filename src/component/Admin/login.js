import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUserAlt, FaKey} from "react-icons/fa";
import '../../css/admin-login.css';
import Alert from "../common/alert";
import {API_URL} from "../../config";

function Login(props) {
    const {setAdminLogin} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        if (loading === true) {
            setLoading(false);
        }
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmitLogin = async() => {
        if(email == ""){
            setErrorMessage("Vui lòng nhập địa chỉ email");
            setAlertStatus(true);
            setAlertType("error");
        } else if (password == "") {
            setErrorMessage("Vui lòng nhập mật khẩu")
            setAlertStatus(true)
            setAlertType("error")
        } else {
            let item = {email, password};
            await fetch(API_URL + 'admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(async function (response) {
                const result = await response.json();
                if (result.status === 0) {
                    setErrorMessage("Tài Khoản không hợp lệ");
                    setAlertStatus(true);
                    setAlertType("error");
                }
                else {
                    localStorage.setItem('admin', JSON.stringify(result));
                    setAdminLogin();
                    console.log(result);
                    history.push('/admin');
                }
            }).then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).catch(function (error) {
                console.log(error)
                setErrorMessage("Sai email hoặc mật khẩu");
                setAlertStatus(true);
                setAlertType("error");
            });
        }
    }

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
                                    <input type="mail" name="username" className="form-control input_user"
                                           placeholder="Tài khoản"
                                           value={email}
                                           onChange={handleEmailChange}/>
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><FaKey/></span>
                                    </div>
                                    <input type="password" name="password" className="form-control input_pass"
                                           placeholder="Mật khẩu"
                                           value={password}
                                           onChange={handlePasswordChange}/>
                                </div>

                                <div className="d-flex justify-content-center mt-4 login_container">
                                    <button type="button" name="button" className="btn login_btn btn-default" onClick={handleSubmitLogin}>Login</button>
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