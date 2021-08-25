import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const saved = localStorage.getItem("user");
    const initial = JSON.parse(saved);
    const [profile, setprofile] = useState([]);
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

    return (

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
                        <button class="btn btn-info " target="__blank">Edit</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;