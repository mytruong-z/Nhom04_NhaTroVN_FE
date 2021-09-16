import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import ImageSlider from "./ImageSlider";
import { API_URL } from "../../config/index";

const RoomDetail = (props) => {
    const {match} = props;
    const id = match.params.id;

    const [room, setRoom] = useState({});

    useEffect(() => {
        if (id >= 0) {
            const url = `${API_URL}room/searchByRoomId/${id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (typeof data.length !== 'undefined') {
                        if(typeof data[0].post[0] !== 'undefined') {
                            data[0].post = data[0].post[0];
                        }
                        setRoom(data[0]);
                        console.log(data[0].image);
                    }
                });
        }
    }, []);

    return (
        <div className="mb-4">
            {
                Object.keys(room).length !== 0 ?
                    <div className="room-box">
                        <div className="room-slide-img">
                            <ImageSlider images={room.image} />
                        </div>
                        <br/>
                        <br/>
                        <h1>
                            {typeof room.post.title !== 'undefined' ? room.post.title  : ""}
                        </h1>
                        <p>
                            <span className="bold">Địa chỉ: </span>{room.address},
                            &nbsp;{room.ward},
                            &nbsp;{room.district},
                            &nbsp;{room.city}
                        </p>
                        <p>
                            <span className="bold">Chi tiết: </span>
                            {
                                typeof room.post.description !== 'undefined' ? room.post.description  : ""
                            }
                        </p>
                        <p>
                            <span className="bold">Dịch vụ: </span>
                            {
                                typeof room.post.service !== 'undefined' && Object.keys(room.post.service).length ?
                                    Object.entries(room.post.service).map(function(key, index) {
                                        if(index > 0) {
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

                        <Button variant="primary">Đặt Phòng</Button>
                    </div>
                    : ''
            }

        </div>

    );
};

export default RoomDetail;