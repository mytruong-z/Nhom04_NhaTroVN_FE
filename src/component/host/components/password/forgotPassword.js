import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '../../../common/alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [keycode, setKeyCode] = useState('');
    const [userId, setUserId] = useState(0);
    const [newPassword, setNewPassWord] = useState('');
    const [screen, setScreen] = useState(1);
    const history = useHistory();
    const [alertError, setAlertError] = useState('');
    const [alertSuccess, setAlertSuccess] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [isAlertSuccess, setIsAlertSuccess] = useState(false);

    const request = (type) => {
        let item = {email};
        fetch('https://nhatrovn.herokuapp.com/api/password/recover-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (response.status === 204) {
                setIsAlert(true);
                setAlertError('Vượt quá số lượt cho phép trong ngày (3 lượt). Vui lòng quay lại sau!');
            } else if (response.ok) {
                if(type === 2) {
                    setIsAlertSuccess(true);
                    setAlertSuccess('Yêu cầu tạo lại mã đã được gửi. Vui lòng kiểm tra Email!');
                }
                setScreen(2);
                return response;
            } else {
                setIsAlert(true);
                setAlertError('Tài khoản không tồn tại vui lòng kiểm tra lại');
            }
        }).catch(function (error) {
            setAlertError('Tài khoản không tồn tại vui lòng kiểm tra lại');
        });
    };

    const confirmCode = () => {
        let item = {keycode};
        fetch('https://nhatrovn.herokuapp.com/api/password/keycode-verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (response.ok) {
                setScreen(3);
                return response.json();
            } else {
                setAlertError('Sai mã xác nhận. Vui lòng kiểm tra lại Email!');
            }
        }).then(function (response) {
            if (typeof response) {
                setUserId(response);
            }
        }).catch(function (error) {
            setAlertError('Sai mã xác nhận. Vui lòng kiểm tra lại Email!');
        });
    };

    const changePass = () => {
        let item = {userId, newPassword};
        fetch('https://nhatrovn.herokuapp.com/api/password/recover-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                setAlertError('Thay đổi mật khẩu không thành công. Vui lòng thử lại!');
            } else {
                history.push('/login');
                return response;
            }
        }).catch(function (error) {
            setAlertError('Thay đổi mật khẩu không thành công. Vui lòng thử lại!');
        });
    };

    return (
        <div className="Login">
            <Alert status={isAlert} setIsAlert={setIsAlert} type="error" title={alertError}/>
            <Alert status={isAlertSuccess} setIsAlert={setIsAlertSuccess} type="success" title={alertSuccess}/>
            <Form className="mt-5">
                {
                    screen === 1 ?
                        <div>
                            <div className="form-title">
                                <h2>Tạo Mới Mật Khẩu</h2>
                            </div>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left'>Email</Form.Label>
                                <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)}
                                              placeholder="Nhập email"/>
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={() => request(1)} variant="primary">
                                Gửi yêu cầu
                            </Button>
                        </div> : ''
                }

                {
                    screen === 2 ?
                        <div>
                            <div className="form-title">
                                <h2>Nhập Mã Xác Nhận</h2>
                            </div>
                            < Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left'>Mã xác nhận</Form.Label>
                                <Form.Control required type="number" onChange={(e) => setKeyCode(e.target.value)}
                                              placeholder="Nhập mã xác nhận"/>
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={confirmCode} variant="primary">
                                Xác Nhận Mã OTP
                            </Button>
                            <Button className="mt-3 btn btn-default text-white" onClick={() => request(2)} variant="primary">
                                Gửi lại xác nhận
                            </Button>
                        </div> : ''
                }

                {
                    screen === 3 ?
                        <div>
                            <div className="form-title">
                                <h2>Nhập mật khẩu mới</h2>
                            </div>
                            < Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left'>Mật Khẩu</Form.Label>
                                <Form.Control required type="password" onChange={(e) => setNewPassWord(e.target.value)}
                                              placeholder="Nhập mật khẩu"/>
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={changePass} variant="primary">
                                Gửi yêu cầu
                            </Button>
                        </div> : ''
                }
            </Form>
        </div>
    );
};

export default ForgotPassword;