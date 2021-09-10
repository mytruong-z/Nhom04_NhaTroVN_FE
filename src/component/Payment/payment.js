import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment.css';

function Payment() {

    return (

        <div class="lasagna">
            <div class="upgrade">
                <h2>Mua quyền <b>Đăng Nhà trọ</b> </h2>
                <p>Để có thể tăng số lượng và thời gian bài đăng</p>
            </div>
            <div class="plan">
                <h3>Gói Đồng</h3>
                <p>$100.000 vnd</p>
                <a href="">Mua</a>
                &nbsp;
                <div class="includes">
                    Includes
                    <ul>
                        <li>Có thể đăng 10 bài đăng</li>
                    </ul>
                </div>
            </div>
            <div class="plan">
                <h3>Gói Bạc</h3>
                <p>$450.000 vnd</p>
                <p></p>
                <a href="">Mua</a>
                &nbsp;
                <div class="includes">
                    includes
                    <ul>
                        <li>Có thể đăng 50 bài đăng</li>
                    </ul>
                </div>
            </div>
            <div class="plan">
                <h3>Gói Vàng</h3>
                <p>$900.000 vnd</p>
                <a href="">Mua</a>
                &nbsp;
                <div class="includes">
                    includes
                    <ul>
                        <li>Có thể đăng 100 bài đăng</li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default Payment;