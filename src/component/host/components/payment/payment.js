import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../../../common/alert"
import './payment.css';
import { div } from 'antd';

function Payment() {

    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);
    const [userID, setId] = useState([]);
    const [Notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push('/');
        }
        else {
            setId(initial.id)
        }
    }, []);

    const showNotificationModal = () => {
        setShowNotification(true);
    };

    const hideNotificationModal = () => {
        setShowNotification(false);
    };

    async function payment(sub_id) {
        let item = { userID, sub_id };
        await fetch('https://nhatrovn.herokuapp.com/api/payment/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(async function (response) {
            const result = await response.json();
            setNotification('Hóa đơn ' + result.uuid + ' đã được ghi nhận. \nVui lòng chuyển khoản vào số ngân hàng trên (ghi rõ số hóa đơn) và chờ xử lý');
            showNotificationModal();

        }).catch(function (error) {

            setErrorMessage('Thanh toán trước đó chưa được xử lý vui lòng chờ')
            setAlertStatus(true)
            setAlertType('error')
        });

    }

    return (
        <div>
            <div className="mt-3 mb-3 lasagna">
                <div className="upgrade">
                    <h2>Mua quyền <b>Đăng Nhà trọ</b></h2>
                    <div>Để có thể tăng số lượng và thời gian bài đăng</div>
                </div>
                <div className="plan mt-4">
                    <h3><b>Gói Đồng</b></h3>
                    <div>$199.000 vnd</div>
                    <Button className="mt-3 mb-3 btn btn-default text-white "
                        onClick={() => { payment(2); }}>Mua</Button>
                    &nbsp;
                    <div className="includes">
                        Bao gồm
                        <ul>
                            <li>Có thể đăng và duy trì bài đăng trong 3 tháng</li>
                        </ul>
                    </div>
                </div>
                <div className="plan mt-4">
                    <h3><b>Gói Bạc</b></h3>
                    <div>$399.000 vnd</div>
                    <div></div>
                    <Button className="mt-3 mb-3 btn btn-default text-white "
                        onClick={() => { payment(3); }}>Mua</Button>
                    &nbsp;
                    <div className="includes">
                        Bao gồm
                        <ul>
                            <li>Có thể đăng và duy trì bài đăng trong 5 tháng</li>
                        </ul>
                    </div>
                </div>
                <div className="plan mt-4">
                    <h3><b>Gói Vàng</b></h3>
                    <div>$599.000 vnd</div>
                    <Button className="mt-3 mb-3 btn btn-default text-white "
                        onClick={() => { payment(4); }}>Mua</Button>
                    &nbsp;
                    <div className="includes">
                        Bao gồm
                        <ul>
                            <li>Có thể đăng và duy trì bài đăng trong 12 tháng</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal
                className="details_modal"
                show={showNotification}
                onHide={hideNotificationModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="mt-0 mb-0"><h4 className="float-left">Thông báo</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-3 mb-3">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="">From: Admin Nhà Trọ VN</Form.Label><br/>
                            <Form.Label className="">Số ngân hàng: 0254159898416</Form.Label><br/>
                            <Form.Label className="float-left">Thông báo : {Notification}</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert = {setAlertStatus}
            />
        </div>
    );
}

export default Payment;