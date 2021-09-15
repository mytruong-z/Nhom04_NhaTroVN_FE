import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push('/');
        }
        else {
            const user = localStorage.getItem('user');
            const initial = JSON.parse(user);
            setUserId(initial.id);
        }
    }, []);

    const request = () => {
        let item = {userId, oldPassword, newPassword};
        fetch('https://nhatrovn.herokuapp.com/api/password/change-profile-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (response.ok) {
                alert('Thay đổi thành công!');
            } else {
                alert('Không thể thay đổi mật khẩu. Vui lòng thử lại!');
            }
        }).catch(function (error) {
            alert('Không thể thay đổi mật khẩu. Vui lòng thử lại!');
        });
    };

    return (
        <div className="mt-3 mb-3 lasagna">
            <Form className="mt-5">
                <div>
                    <div className="form-title">
                        <h3 className="bold">Thay Đổi Mật Khẩu</h3>
                    </div>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='float-left bold'>Mật Khẩu Cũ</Form.Label>
                        <Form.Control type="password" onChange={(e) => setOldPassword(e.target.value)}
                                      placeholder="Nhập mật khẩu cũ"/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='float-left bold'>Mật Khẩu Mới</Form.Label>
                        <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)}
                                      placeholder="Nhập mật khẩu mới"/>
                    </Form.Group>
                    <Button className="mt-3 btn btn-default text-white" onClick={request} variant="primary">
                        Gửi yêu cầu
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPassword;