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
            <div class="plan current">
                <h3>15 GB</h3>
                <p>Free</p>
                <p><b>Current plan</b></p>
                &nbsp;
                <div class="includes">
                    Includes
                    <ul>
                        <li>15 GB storage</li>
                    </ul>
                </div>
            </div>
            <div class="plan">
                <h3>100 GB</h3>
                <p>$1.99 / month</p>
                <p></p>
                <p><a href="">Upgrade</a>
                    $19.99 / year (save $3.89)
                </p>
                <div class="includes">
                    Google One includes
                    <ul>
                        <li>100 GB storage</li>
                        <li>Access to Google experts</li>
                        <li>Option to add your family</li>
                        <li>Extra member benefits</li>
                    </ul>
                </div>
            </div>
            <div class="plan">
                <h3>200 GB</h3>
                <p>$2.99 / month</p>
                <p><a href="">Upgrade</a>
                    $29.99 / year (save $5.89)
                </p>
                &nbsp;
                <div class="includes">
                    Google One includes
                    <ul>
                        <li>200 GB storage</li>
                        <li>Access to Google experts</li>
                        <li>Option to add your family</li>
                        <li>Extra member benefits</li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default Payment;