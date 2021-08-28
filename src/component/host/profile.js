import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './host.css';

function Profile() {
    const saved = localStorage.getItem("user");
    const initial = JSON.parse(saved);
    const history = useHistory()

    const [profile, setprofile] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [id, setId] = useState([initial.id]);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [cardId, setCardId] = useState([]);
    useEffect(async () => {
        await fetch("https://nhatrovn.herokuapp.com/api/user/information/" + initial.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
        }).then(async function (response) {
            const result = await response.json()
            setprofile(result)
            setName(result.name)
            setEmail(result.email)
            setPhone(result.phone)
            setCardId(result.cardId)
            console.log(result)
        }).catch((error) => {
            return error;
        });
    }, [])

    const onShowProfile = (e) => {
        showProfileModal();
    }

    const showProfileModal = () => {
        setShowProfile(true);
    }

    const hideDeleteProfileModal = () => {
        setShowProfile(false);
        setName(profile.name)
        setEmail(profile.email)
        setPhone(profile.phone)
        setCardId(profile.cardId)
    }

    const hideProfileModal = () => {
        setShowProfile(false);

    }

    const ChangetxtName = (e) => {
        setName(e.target.value);
    }
    const ChangetxtEmail = (e) => {
        setEmail(e.target.value);
    }
    const ChangetxtPhone = (e) => {
        setPhone(e.target.value);
    }
    const ChangetxtCardId = (e) => {
        setCardId(e.target.value);
    }

    async function saveProfile() {
        console.warn(id, name, email, phone, cardId)
        let item = { id, name, email, phone, cardId }
        await fetch("https://nhatrovn.herokuapp.com/api/user/update", {
            method: 'PATCH',
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
            alert("Cập nhật thành công")
            hideProfileModal()
        }).catch(function (error) {
            alert("Cập nhật thất bại")
        });

        await fetch("https://nhatrovn.herokuapp.com/api/user/information/" + initial.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
        }).then(async function (response) {
            const result = await response.json()
            setprofile(result)
        }).catch((error) => {
            return error;
        });
    }
    return (
        <div>
            <div class="mt-3">
                <div class="profile">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Thông Tin Tài Khoản</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0 float-left" >Họ Tên</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {name}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0 float-left">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {email}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0 float-left">Điện Thoại</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {phone}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0 float-left">CMND</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                {cardId}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button className="mt-3 btn btn-default text-white btn-lg" onClick={onShowProfile}>Thay Đổi</Button>
                    </div>
                </div>

            </div>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={hideProfileModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><h2 className="float-left">Thay Đổi Thông Tin</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="formBasicName" >
                            <Form.Label className="float-left">Họ Tên</Form.Label>
                            <Form.Control type="text" value={name} onChange={ChangetxtName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label className="float-left">Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={ChangetxtEmail} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className="float-left">Điện Thoại</Form.Label>
                            <Form.Control type="number" value={phone} onChange={ChangetxtPhone} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCardId">
                            <Form.Label className="float-left">Chứng Minh Nhân Dân</Form.Label>
                            <Form.Control type="number" value={cardId} onChange={ChangetxtCardId} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button class="btn btn-primary" variant="primary" onClick={saveProfile}>
                        Lưu
                    </Button>

                    <Button variant="danger" onClick={hideDeleteProfileModal}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profile;