import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import { Settings } from '@material-ui/icons';
import './host.css';

function Host() {
    const [data, setData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [details, setDetails] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [districts, setDistricts] = useState([]);

    const [formData, setFormData] = useState({
        address: "",
        price: 0,
        addition_infor: "",
        city: "",
        district: "",
        ward: "",
    })

    const API_URL = "http://localhost:4000/";
    const HOST_ID = 1;


    useEffect(() => {
        axios(
            `${API_URL}api/room/searchByhost/${HOST_ID}`,
        ).then((res) => {
            console.log("rooms: ", res.data);
            setData(res.data);
        });


        // get cities    
        // axios({
        //     url: `https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/city`,
        //     headers: { "Access-Control-Allow-Origin": "*" }
        // }).then((res) => {
        //     console.log(res.data);

        //     res.data.LtsItem.map((item) => {
        //         console.log(item);
        //         if (item.ID) {
        //             axios({
        //                 url: `https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api/city/${item.ID}/district`,
        //                 headers: { "Access-Control-Allow-Origin": "*" }
        //             }).then((res) => {
        //                 console.log("districts: ", res.data);
        //             });
        //         }
        //     })
        // }).catch((e) => {
        //     console.log(e.message);
        // });
    }, [])

    const submitRoom = () => {
        const temp = {
            title: "hello world"
        }

        const temp2 = {...formData, title: "ASDASDSD"};
        console.log(formData);
        console.log(formData);

    }

    const onShowDetails = (item) => {
        showDetailsModal();
        setDetails(item);
    }

    const showDetailsModal = () => {
        setShowDetails(true);
    }

    const hideDetailsModal = () => {
        setShowDetails(false);
    }

    const onShowNew = (item) => {
        showNewModal();
    }

    const showNewModal = () => {
        setShowNew(true);
    }

    const hideNewModal = () => {
        setShowNew(false);
    }

    return (
        <div className="wrapper m-auto w-75 pt-3">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <p className="bold">Danh sách nhà</p>
                    <button onClick={onShowNew} className="btn btn-sm btn-success">Thêm</button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="d-none">id</th>
                                <th>Địa chỉ</th>
                                <th>Giá</th>
                                <th>Thông tin</th>
                                <th className="col-2 text-center"><Settings /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.address}</td>
                                        <td>{item.price}</td>
                                        <td>{item.addition_infor}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary m-1" onClick={(e) => onShowDetails(item)}>Chi tiết</button>
                                            <button className="btn btn-sm btn-secondary m-1">Chỉnh sửa</button>
                                            <button className="btn btn-sm btn-danger m-1">Xóa</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal
                className="details_modal"
                show={showDetails}
                onHide={hideDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bài đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Hình ảnh</Form.Label>
                            <img className="mw-100" src={`/assets/images/rooms/${details?.image?.name ? details?.image?.name : '/no-img.png'}`} alt="" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control disabled type="text" value={details?.post?.title} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Chi tiết</Form.Label>
                            <Form.Control disabled as="textarea" rows={5} value={details?.post?.description} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideDetailsModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="new_modal"
                show={showNew}
                onHide={hideNewModal}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhà mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tiêu đề" onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tỉnh thành</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => setFormData({...formData, city: "hcm"})}>
                            {
                                cities.map(item => {
                                    return <option value={item?.ID}>{item?.Title}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quận/ huyện</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => setFormData({...formData, district: "q2"})}>
                            {
                                districts.map(item => {
                                    return <option value={item?.Title}>{item?.Title}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Xã/ phường</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => setFormData({...formData, ward: "p11"})}>
                            {
                                districts.map(item => {
                                    return <option value={item?.Title}>{item?.Title}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác" onChange={(e) => setFormData({...formData, city: e.target.value})}/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideNewModal}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitRoom}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Host
