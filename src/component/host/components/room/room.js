import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import { Settings } from '@material-ui/icons';
import './room.css';

function Room() {
    const [data, setData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [details, setDetails] = useState(null);
    const [citiesData, setCitiesData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedWard, setSelectedWard] = useState();

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
    const GHN_TOKEN = 'b08e0769-130e-11ec-b8c6-fade198b4859';


    useEffect(() => {
        axios(
            `${API_URL}api/room/searchByhost/${HOST_ID}`,
        ).then((res) => {
            console.log("rooms: ", res.data);
            setData(res.data);
        });

        getCities();
    }, [])

    const getCities = () => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "token": GHN_TOKEN
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.data) {
                    setCitiesData(myJson.data);
                }
            });
    }

    const getDistricts = (provinceId) => {
        fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "token": GHN_TOKEN
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var listDistrictByProvince = [];
                myJson.data.map((item) => {
                    if (item.ProvinceID == provinceId) {
                        listDistrictByProvince = [...listDistrictByProvince, item];
                    }
                })
                setDistricts(listDistrictByProvince);
            });
    }

    const getWards = (districtId) => {
        fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "token": GHN_TOKEN
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.data) {
                    setWards(myJson.data);
                }
            });
    }

    useEffect(() => {
        getDistricts(selectedCity);
    }, [selectedCity])

    useEffect(() => {
        getWards(selectedDistrict);
        console.log("District changed: ", wards);
    }, [selectedDistrict])

    const handleCityOnChange = (e) => {
        var valueSplitted = e.target.value.split(",");
        var newFormData = {
            ...formData,
            district: "",
            ward: "",
            city: valueSplitted[1]
        }
        setFormData(newFormData);
        setSelectedCity(valueSplitted[0]);
    }   

    const handleDistrictOnChange = (e) => {
        var valueSplitted = e.target.value.split(",");
        var newFormData = {
            ...formData,
            ward: "",
            district: valueSplitted[1]
        }
        setFormData(newFormData);
        setSelectedDistrict(valueSplitted[0]);
    }

    const handleWardOnChange = (e) => {
        var valueSplitted = e.target.value.split(",");
        var newFormData = {
            ...formData,
            ward: valueSplitted[1]
        }
        setFormData(newFormData);
        setSelectedWard(valueSplitted[0]);
    }


    const submitRoom = () => {
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
        <div className="wrapper m-auto pt-3 room-container">
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
                                    return <tr key={index}>
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
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tỉnh thành</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => handleCityOnChange(e)}>
                            <option>Chọn tỉnh thành</option>
                            {
                                citiesData.map((item, index) => {
                                    return <option key={item.ProvinceID} value={`${item.ProvinceID},${item.ProvinceName}`}>{item.ProvinceName}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quận/ huyện</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => handleDistrictOnChange(e)}>
                            <option>Chọn quận huyện</option>
                            {
                                districts.map(item => {
                                    return <option key={item?.DistrictID} value={`${item?.DistrictID},${item?.DistrictName}`}>{item?.DistrictName}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Xã/ phường</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => handleWardOnChange(e)}>
                            <option>Chọn xã phường</option>
                            {
                                wards.map(item => {
                                    return <option key={item?.WardCode} value={`${item?.WardCode},${item?.WardName}`}>{item?.WardName}</option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Giá</Form.Label>
                        <Form.Control type="number" placeholder="Nhập giá" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác" onChange={(e) => setFormData({ ...formData, addition_infor: e.target.value })} />
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

export default Room
