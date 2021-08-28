import React, {useState, useEffect, useCallback} from 'react';
import {Image, Button} from 'react-bootstrap';
import Header from "../partials/header";

const room = {
    "id": 25,
    "status": 1,
    "address": "Hẻm 236 đường Điện Biên Phủ",
    "image": {
        "id": 25,
        "name": "room_2.jpeg"
    },
    "host": {
        "name": "Anh Hồ",
        "email": "baoanh2003199@gmail.com",
        "phone": "01234566"
    },
    "price": 5000000,
    "area": 20,
    "create_at": "2021-08-16T09:17:37.000Z",
    "addition_infor": "Phòng Đẹp",
    "city": "",
    "district": "NULL",
    "ward": "NULL",
    "isdelete": 0,
    "post": {
        "id": 45,
        "title": "Cho thuê phòng đẹp như khách sạn",
        "description": "cho thuê phòng đẹp như khách sạn, đầy đủ nội thất, mới xây, gần trung tâm, yên tĩnh và tự do về giờ giấc. Diện tích 30m2, giá thuê chỉ 5 triệu/tháng.",
        "status": {
            "id": 1,
            "name": "active"
        },
        "service": {
            "id": 2,
            "name": "Có Tủ"
        }
    }
}

const Posts = (props) => {
    const {match} = props;
    const id = match.params.id;

    return (
        <>
            <Header title={'Chi tiết bài viết'} hideSearch={true}/>
            <div className="mb-4">
                {
                    Object.keys(room).length !== 0 ?
                        <div className="room-box">
                            <div className="room-box-img">
                                <Image src={`/assets/images/rooms/${room.image.name}`} fluid/>
                            </div>
                            <h1>
                                {typeof room.post.title !== 'undefined' ? room.post.title : ""}
                            </h1>
                            <p>
                                <span className="bold">Địa chỉ: </span>{room.address},
                                &nbsp;{room.ward.prefix} {room.ward.name},
                                &nbsp;{room.district.prefix} {room.district.name},
                                &nbsp;{room.province && room.province.name}
                            </p>
                            <p>
                                <span className="bold">Chi tiết: </span>
                                {
                                    typeof room.post.description !== 'undefined' ? room.post.description : ""
                                }
                            </p>
                            <p>
                                <span className="bold">Dịch vụ: </span>
                                {
                                    typeof room.post.service !== 'undefined' && Object.keys(room.post.service).length ?
                                        Object.entries(room.post.service).map(function (key, index) {
                                            if (index > 0) {
                                                return (
                                                    <span key={index}>{key[1]} </span>
                                                )
                                            }
                                        })

                                        : ""
                                }
                            </p>
                            <p>
                                <span className="bold">Diện tích: </span> {room.area} (m2)
                            </p>
                            <p>
                                <span className="bold">Giá cả: </span> {room.price} (VND)
                            </p>
                            <p>
                            <span
                                className="bold">Liên Hệ: </span> {room.host.name} - {room.host.phone} - {room.host.email}
                            </p>
                        </div>
                        : ''
                }

            </div>
        </>

    );
};

export default Posts;