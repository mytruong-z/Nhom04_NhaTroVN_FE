import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const request = () => {
        let item = {email};
        fetch('https://nhatrovn.herokuapp.com/api/reset_password', {
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
        }).then(function (response) {
            const result = response.json();
            console.log(result);
        }).catch(function (error) {
            alert('Tài khoản không tồn tại vui lòng kiểm tra lại');
        });

    };

    return (
        <div className="Login">
            <Form className="mt-5">
                <div className="form-title">
                    <h2>Tạo Mới Mật Khẩu</h2>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="float-left">Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email"/>
                </Form.Group>
                <Button className="mt-3 btn btn-default text-white" onClick={request} variant="primary">
                    Gửi yêu cầu
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;