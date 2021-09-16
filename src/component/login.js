import React, { useState, useEffect } from 'react';
import {Route, useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
//import ReactJsAlert from "reactjs-alert"
import Alert from "./common/alert"
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
    const {setUserLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const params = useParams();

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    
    const {code} = params;
    const location = window.location.pathname;

    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push('/');
        }

        //activate account
        if (location.startsWith('/activate-account')) {
            activeAccount();
        }
    }, []);

    const activeAccount = () => {
        if (code) {
            let item = {code};
            fetch(`https://nhatrovn.herokuapp.com/api/verify/activate-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                if(typeof (data) !== 'undefined') {
                    alert("Kích hoạt thành công. Vui lòng đăng nhập lại!");
                } else {
                    alert("Đường dẫn kích hoạt không đúng hoặc đã tồn tại!");
                }

            });
        }
    };

    function HideAlert() {
        setAlertStatus(false)
    }
   

    async function login () {
        if(email == ""){
            setErrorMessage("Vui lòng nhập địa chỉ email")
            setAlertStatus(true)
            setAlertType("error")
        }
        else if (password == "") {
            setErrorMessage("Vui lòng nhập mật khẩu")
            setAlertStatus(true)
            setAlertType("error")
        } else {
    
        let item = {email, password};
        await fetch('https://nhatrovn.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(async function (response) {
            const result = await response.json();
            if (result.status === 0) {
                setErrorMessage("Tài Khoản chưa được kích hoạt, Vui lòng vào Email kích hoạt")
            }
            else {
                localStorage.setItem('user', JSON.stringify(result));
                setUserLogin();
                console.log(result);
                history.push('/');
            }
        }).catch(function (error) {
            setErrorMessage("Sai email hoặc mật khẩu")
        });
    }
    }

    return (
        <div className="Login">
            <Form className="mt-5">
                <div className="form-title">
                    <h2>Đăng Nhập</h2>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-danger">{errorMessage}</Form.Label>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="float-left">Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="float-left">Mật Khẩu</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Nhập mật khẩu"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label className="float-right"><a href="/forgot_pass" className="forgot-pass">Quên Mật Khẩu?</a></Form.Label>
                </Form.Group>

                <br/>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check className="float-left" type="checkbox" label="Nhớ mật khẩu"/>
                </Form.Group>
                <Button className="mt-3 btn btn-default text-white" onClick={login} variant="primary">
                    Đăng nhập
                </Button>
            </Form>

        </div>
    );
};

export default Login;