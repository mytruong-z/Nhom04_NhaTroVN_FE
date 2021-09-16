import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Alert from "./common/alert"
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [cardId, setCardId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const history = useHistory()

    async function register() {
        if (name == "" || phone== "" || cardId == "" ||email== "" || password == "") {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin")
            setAlertStatus(true)
            setAlertType("error")
        } else {

        let item = {name, phone, cardId ,email, password }
        await fetch("https://nhatrovn.herokuapp.com/api/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(async function (response) {
            history.push("/login")
            setErrorMessage("Đăng kí thành công!\n Vui lòng kích hoạt tài khoản ở địa chỉ email")
            setAlertStatus(true)
            setAlertType("success")
        }).catch(function (error) {
            setErrorMessage("Email đã được đăng kí")
            setAlertStatus(true)
            setAlertType("error")
        });
    }
    }

    return (
        <div className="Login">
        <Form className="mt-5">
            <div className="form-title">
                <h2>Đăng Kí</h2>
            </div>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="float-left">Họ Tên</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Nhập Họ Tên" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label className="float-left">Điện thoại</Form.Label>
                <Form.Control type="number" onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCardId">
                <Form.Label className="float-left">Chứng minh nhân dân</Form.Label>
                <Form.Control type="number" onChange={(e) => setCardId(e.target.value)} placeholder="Nhập số chứng minh nhân dân" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="float-left">Email</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="float-left">Mật Khẩu</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
            </Form.Group>
            <Button className="mt-3 btn btn-default text-white" onClick={register} variant="primary">
                Đăng kí
            </Button>
        </Form>

        <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert = {setAlertStatus}
            />
        </div>
    );
}

export default Register;