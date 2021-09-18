import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../../../common/alert"
import './profile.css';
import { div } from 'antd';

function Profile () {
    const TYPE_LEVEL_1=1; //goi dong
    const TYPE_LEVEL_2=2; //goi bac
    const TYPE_LEVEL_3=3; //goi vang
    const TYPE_LEVEL_4=4; //goi vang

   
    const saved = localStorage.getItem('user');;
    
    const history = useHistory();

    const [profile, setprofile] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [id, setId] = useState([]);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [cardId, setCardId] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [transactionsProgram, setTransactionsProgram] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(async () => {
        if (!localStorage.getItem('user')) {
            history.push('/');
        }
        else {
            const initial = JSON.parse(saved);
            setId(initial.id);
            await fetch('https://nhatrovn.herokuapp.com/api/user/information/' + initial.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(async function (response) {
                const result = await response.json();
                setprofile(result);
                setName(result.name);
                setEmail(result.email);
                setPhone(result.phone);
                setCardId(result.cardId);

                if(typeof result.transaction_history !== 'undefined') {
                    setTransactions(result.transaction_history);
                }
            }).catch((error) => {
                return error;
            });

            await fetch('https://nhatrovn.herokuapp.com/api/payment/viewByUserId/' + initial.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(async function (response) {
                const result = await response.json();
                setTransactionsProgram([result]);
                
            }).catch((error) => {
                return error;
            });
            
        }
    }, []);
   
   

    const onShowProfile = (e) => {
        showProfileModal();
    };

    const showProfileModal = () => {
        setShowProfile(true);
    };

    const hideDeleteProfileModal = () => {
        setShowProfile(false);
        setName(profile.name);
        setEmail(profile.email);
        setPhone(profile.phone);
        setCardId(profile.cardId);
    };

    const hideProfileModal = () => {
        setShowProfile(false);

    };

    const ChangetxtName = (e) => {
        setName(e.target.value);
    };
    const ChangetxtEmail = (e) => {
        setEmail(e.target.value);
    };
    const ChangetxtPhone = (e) => {
        setPhone(e.target.value);
    };
    const ChangetxtCardId = (e) => {
        setCardId(e.target.value);
    };

    async function saveProfile () {
        const  initial = JSON.parse(saved);
        console.warn(id, name, email, phone, cardId);
        if (phone.length > 10) {
            setErrorMessage("Số điện thoại không vượt quá 10 số")
            setAlertStatus(true)
            setAlertType("error")
            setName(profile.name);
            setEmail(profile.email);
            setPhone(profile.phone);
            setCardId(profile.cardId);
        } else if(cardId.length > 12) {
            setErrorMessage("Số chứng minh không vượt quá 12 số")
            setAlertStatus(true)
            setAlertType("error")
            setName(profile.name);
            setEmail(profile.email);
            setPhone(profile.phone);
            setCardId(profile.cardId);
        }else{
        let item = {id, name, email, phone, cardId};
        await fetch('https://nhatrovn.herokuapp.com/api/user/update', {
            method: 'PATCH',
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
            setErrorMessage("Cập nhật thành công")
            setAlertStatus(true)
            setAlertType("success")
            hideProfileModal();
        }).catch(function (error) {
            setErrorMessage("Cập nhật thất bại")
            setAlertStatus(true)
            setAlertType("error")
        });

        await fetch('https://nhatrovn.herokuapp.com/api/user/information/' + initial.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(async function (response) {
            const result = await response.json();
            setprofile(result);
        }).catch((error) => {
            return error;
        });
    }
    }

    return (
        <div>
            <div className="mt-3">
                <div className="profile">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="w-100 bold">Thông Tin Tài Khoản</h3>
                    </div>
                    <div className="card-body text-left">
                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Họ Tên</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {name}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {email}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Điện Thoại</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {phone}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">CMND</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {cardId}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button className="mt-3 btn btn-default text-white btn-lg" onClick={onShowProfile}>Thay
                            Đổi</Button>
                    </div>
                </div>
                <div className="transactions">
                    <h3 className="bold">Lịch Sử Đã Thanh Toán</h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã Thanh Toán</th>
                            <th>Loại Gói Đăng Ký</th>
                            <th>Ngày Thanh Toán</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            transactions !== null && transactions.length ?
                                transactions.map((item, index) => {
                                    let level = "";
                                    switch (item.subscription_id) {
                                        case TYPE_LEVEL_1:
                                            level = "Gói Đồng";
                                            break;
                                        case TYPE_LEVEL_2:
                                            level = "Gói Bạc";
                                            break;
                                        case TYPE_LEVEL_3:
                                            level = "Gói Vàng";
                                            break;
                                        case TYPE_LEVEL_4:
                                            level = "Gói Vàng";
                                            break;
                                        default:
                                            level = "Không xác định"

                                    }
                                    return (
                                        <tr key ={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.unique_key}</td>
                                            <td>{level}</td>
                                            <td>{item.paid_date}</td>
                                        </tr>
                                    )
                                })
                                : ""
                        }
                        </tbody>
                    </Table>
                </div>

                <div className="transactionsProgram">
                    <h3 className="bold">Lịch Sử Chưa Thanh Toán</h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã Thanh Toán</th>
                            <th>Loại Gói Đăng Ký</th>
                        </tr>
                        </thead>
                        <tbody>
                       
                        { 
                                transactionsProgram.map((item, index) => {
                                    let level = "";
                                    switch (item?.subscription_id) {
                                        case TYPE_LEVEL_1:
                                            level = "Gói Đồng";
                                            break;
                                        case TYPE_LEVEL_2:
                                            level = "Gói Bạc";
                                            break;
                                        case TYPE_LEVEL_3:
                                            level = "Gói Vàng";
                                            break;
                                        case TYPE_LEVEL_4:
                                            level = "Gói Vàng";
                                            break;
                                        default:
                                            level = "Không xác định"

                                    }
                                    return (
                                        <tr>
                                            <td>{1}</td>
                                            <td>{item?.unique_key}</td>
                                            <td>{level}</td>
                                        </tr>
                                    )
                                })
                                
                        }
                        </tbody>
                    </Table>
                </div>
            </div>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={hideProfileModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><div className="float-left">Thay Đổi Thông Tin</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="float-left">Họ Tên</Form.Label>
                            <Form.Control type="text" value={name} onChange={ChangetxtName}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="float-left">Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={ChangetxtEmail}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className="float-left">Điện Thoại</Form.Label>
                            <Form.Control type="number" value={phone} onChange={ChangetxtPhone}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCardId">
                            <Form.Label className="float-left">Chứng Minh Nhân Dân</Form.Label>
                            <Form.Control type="number" value={cardId} onChange={ChangetxtCardId}/>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" variant="primary" onClick={saveProfile}>
                        Lưu
                    </Button>

                    <Button variant="danger" onClick={hideDeleteProfileModal}>
                        Hủy
                    </Button>
                </Modal.Footer>
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

export default Profile;