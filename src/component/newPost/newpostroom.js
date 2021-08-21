import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewPostRoom() {
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [addition_infor, setAddition] = useState("");
    const [ward_id, setWard] = useState("");
    const [province_id, setProvice] = useState("");
    const [address, setAdress] = useState("");

    const history = useHistory();

    async function add() {
        console.warn(image, price, area ,addition_infor, ward_id, province_id, address )
        let item = {image, price, area ,addition_infor, ward_id, province_id, address}
        await fetch("https://nhatrovn.herokuapp.com/api/room/add", {
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
            history.push("/")
            alert("Đăng kí thành công")
        }).catch(function (error) {
            alert("email đã được đăng kí")
        });

    }

    return (
        <div style={{paddingLeft: 200, paddingRight: 200, paddingTop: 50}}>
            <p style={{fontSize: 50, color: "red", textAlign: "center"}}> <b> Đăng thông tin phòng cho thuê</b></p>      
        <Form className="mt-5">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control type="text" onChange={(e) => setAdress(e.target.value)} placeholder="Nhập địa chỉ" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tỉnh Thành, thành phố</Form.Label>
                {/* <Form.Control type="text" onChange={(e) => setAdress(e.target.value)} placeholder="Nhập địa chỉ" /> */}
                <Form.Select aria-label="Thành phố" onSelect>
                    <option value="1">TP HCM</option>
                    <option value="2">TP BRVT</option>
                    <option value="3">TP Hà Nội</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Quận</Form.Label>
                {/* <Form.Control type="text" onChange={(e) => setWard(e.target.value)} placeholder="Nhập quận" /> */}
                <Form.Select aria-label="Quận" onSelect>
                    <option value="1">Quận 2</option>
                    <option value="2">Quận 1</option>
                    <option value="3">Quận 3</option>
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Thông tin phòng</Form.Label>
                <Form.Control type="email" onChange={(e) => setAddition(e.target.value)} placeholder="Nhập thông tin phòng" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Diện Tích căn phòng</Form.Label>
                <Form.Control type="number" onChange={(e) => setArea(e.target.value)} placeholder="Nhập diện tích phòng" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Giá Phòng</Form.Label>
                <Form.Control type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Nhập giá căn phòng" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hình Ảnh</Form.Label>
                <Form.Control type="file" onChange={(e) => setImage(e.target.value)} placeholder="Nhập giá căn phòng" />
            </Form.Group>
            <Form.Check type="checkbox" id="autoSizingCheck2" label="Trạng thái" />
            <Button style={{marginTop: 15}} onClick={() => { if (window.confirm('Bạn muốn tiếp tục không')) add()}} variant="primary">
                Đăng tin
            </Button>
        </Form>
        </div>
        
    );
}

export default NewPostRoom;