import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {
    const {setUserLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const params = useParams();
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
            fetch(`https://nhatrovietnam.herokuapp.com/api/verify/activate-account/${code}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
        }
    };

    async function login () {
        console.warn(email, password);
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
                alert('Tài Khoản chưa được kích hoạt, Vui lòng vào Email kích hoạt');
            }
            else {
                localStorage.setItem('user', JSON.stringify(result));
                setUserLogin();
                console.log(result);
                history.push('/');
            }
        }).catch(function (error) {
            alert('Sai email hoặc password');
        });

    }

    return (
        <div className="Login">
            <Form className="mt-5">
                <div className="form-title">
                    <h2>Đăng Nhập</h2>
                </div>
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
                    <Form.Check className="float-left" type="checkbox" label="Nhớ mật khẩu"/>
                </Form.Group>
                <Button className="mt-3 btn btn-default text-white" onClick={login} variant="primary">
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
}

export default Login;