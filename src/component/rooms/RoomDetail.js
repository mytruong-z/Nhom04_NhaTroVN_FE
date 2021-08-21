import React, { useState, useEffect, useCallback } from 'react';
import {Image, Button} from 'react-bootstrap';

const RoomDetail = (props) => {
    const {match} = props;
    const id = match.params.id;

    const [room, setRoom] = useState({});

    useEffect(() => {
        if (id >= 0) {
            const url = `${process.env.REACT_APP_URL}api/room/search?id=${id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (typeof data.id !== 'undefined') {
                        setRoom(data);
                        console.log(data);
                    }
                });
        }
    }, []);

    return (
        <div>
            {
                Object.keys(room).length !== 0 ?
                    <div className="room-box">
                        <div className="room-box-img">
                            <Image src={`/assets/images/rooms/${room.image.name}`} fluid/>
                            {/*<Image src={`/assets/images/rooms/room_1.jpeg`} fluid/>*/}
                        </div>
                        <h1>
                            {typeof room.post.title !== 'undefined' ? room.post.title  : ""}
                        </h1>
                        <p>
                            <span className="bold">Địa chỉ: </span>{room.address},
                            &nbsp;{room.ward.prefix} {room.ward.name},
                            &nbsp;{room.district.prefix} {room.district.name},
                            &nbsp;{room.province.name}
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