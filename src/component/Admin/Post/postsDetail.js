import React, {useEffect, useState} from 'react';
import {Badge, Image} from 'react-bootstrap';
import Header from "../partials/header";
import {API_URL, CLOUD_IMG} from "../../../config";
import NumberFormat from "react-number-format";

const Posts = (props) => {
    const {match} = props;
    const id = match.params.id;

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false);

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    useEffect(async () => {
        if(!loading && id > 0) {
            await fetch(API_URL + "room/searchByRoomId/" + id,{ method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                if (data[0]) {
                    setRoom(data[0]);
                    console.log(room);
                    setLoading(true);
                }
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (room != null) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [room])

    return (
        <>
            <Header title={'Chi tiết bài viết'} hideSearch={true}/>
            <div className="mb-4">
                {
                    loading ?
                        <div className="room-box">
                            <div className="room-box-img">
                                <Image src={room.image.length > 0 ? `${CLOUD_IMG}${room.image[0].name}` : '/no-img.png'} fluid/>
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
                                <span className="bold">Giá cả: </span> <NumberFormat value={room.price} displayType={'text'} thousandSeparator={true} /> (VND)
                            </p>
                            <p>
                            <span
                                className="bold">Liên Hệ: </span> {room.host.name} - {room.host.phone} - {room.host.email}
                            </p>
                            <p>
                                <span className="bold">Trạng thái: </span> {room.status ? <Badge bg="success">Đã xác nhận</Badge> : <Badge bg="secondary">Chưa xác nhận</Badge>}
                            </p>
                            <p>
                                <span className="bold">Ngày tạo: </span> {(new Date(room.create_at)).toLocaleDateString('en-US', DATE_OPTIONS)}
                            </p>
                        </div>
                        : 'Không có dữ liệu'
                }

            </div>
        </>

    );
};

export default Posts;