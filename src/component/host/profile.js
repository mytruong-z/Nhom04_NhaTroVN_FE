import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const saved = localStorage.getItem("user");
    const initial = JSON.parse(saved);
    const [profile, setprofile] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
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
            console.log(result)
        }).catch((error) => {
            return error;
        });
    }, [])

    const onShowProfile = () => {
        showProfileModal();
    }

    const showProfileModal = () => {
        setShowProfile(true);
    }

    const hideDetailsModal = () => {
        setShowProfile(false);
    }
    return (
        <div>
            <div class="profile">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Thông Tin Tài Khoản</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Họ Tên</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.name}
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.email}
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Điện Thoại</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.phone}
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">CMND</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            {profile.cardId}
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <button class="btn btn-info " onClick={(e) => onShowProfile()}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={hideDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bài đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="ProfileEdit">
                    <Form className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicName" >
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control type="text" value = {profile.name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value = {profile.email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Điện Thoại</Form.Label>
                            <Form.Control type="number" value = {profile.phone} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCardId">
                            <Form.Label>Chứng Minh Nhân Dân</Form.Label>
                            <Form.Control type="number" value = {profile.cardId} />
                        </Form.Group>

                        <Button variant="primary">
                            Lưu
                        </Button>
                    </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideDetailsModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profile;