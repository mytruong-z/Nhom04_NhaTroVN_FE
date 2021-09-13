import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Table, Form, Row, Col } from 'react-bootstrap';
import './room.css';
import { API_URL } from "../../../../config/index";
import { DataGrid } from '@material-ui/data-grid';

function Room() {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [details, setDetails] = useState(null);
    const [citiesData, setCitiesData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedWard, setSelectedWard] = useState();
    const [hostId, setHostId] = useState(0);

    const [formData, setFormData] = useState({
        address: "",
        price: 0,
        addition_infor: "",
        city: "",
        district: "",
        ward: "",
        area: 0,
        hostID: 0
    })

    const [showFormErrorMessage, setFormErrorMessage] = useState({
        address: false,
        price: false,
        addition_infor: false,
        city: false,
        district: false,
        ward: false,
        area: false
    })

    const GHN_TOKEN = 'b08e0769-130e-11ec-b8c6-fade198b4859';

    useEffect(() => {
        // get host id
        setHostId(JSON.parse(localStorage.getItem('user')).id);
    }, [])

    useEffect(() => {
        if (hostId != 0) {
            axios(
                `${API_URL}room/searchByhost/${hostId}`,
            ).then((res) => {
                if (Array.isArray(res.data)) {
                    console.log(res);
                    setData(res.data);
                }
            });

            // update hostid in form data
            setFormData({
                ...formData,
                hostID: hostId
            })

            // get cities data
            getCities();
        }
    }, [hostId])

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
        if (selectedCity) {
            getDistricts(selectedCity);
        }
    }, [selectedCity])

    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict);
        }
    }, [selectedDistrict])

    const handleCityOnChange = (e) => {
        var valueSplitted = e.target.value.split(",");
        var newFormData = {
            ...formData,
            district: "",
            ward: "",
            city: valueSplitted[1] ? valueSplitted[1] : ""
        }
        setFormData(newFormData);
        setSelectedCity(valueSplitted[0]);
        setWards([]);
    }

    const handleDistrictOnChange = (e) => {
        var valueSplitted = e.target.value.split(",");
        var newFormData = {
            ...formData,
            ward: "",
            district: valueSplitted[1] ? valueSplitted[1] : ""
        }
        setFormData(newFormData);
        setSelectedDistrict(valueSplitted[0]);
    }

    const handleWardOnChange = (e) => {
        var valueSplitted = e.target.value.split(",");
        var newFormData = {
            ...formData,
            ward: valueSplitted[1] ? valueSplitted[1] : ""
        }
        setFormData(newFormData);
        setSelectedWard(valueSplitted[0]);
    }


    const submitRoom = async () => {
        await setFormErrorMessage({
            address: (formData.address == "") ? true : false,
            price: (formData.price == "") ? true : false,
            addition_infor: (formData.addition_infor == "") ? true : false,
            city: (formData.city == "") ? true : false,
            district: (formData.district == "") ? true : false,
            ward: (formData.ward == "") ? true : false,
            area: (formData.area == 0) ? true : false
        })

        for (var i in formData) {
            if (formData[i] === "" || formData[i] === 0) {
                return;
            }
        }

        var temp = {
            "address": "222222",
            "price": 1000000,
            "area": 50,
            "addition_infor": "Phòng xấu quắc",
            "city": "HCM",
            "district": "Quận 3",
            "ward": "Cầu thị nghè",
            "hostID": 1
        }
        console.log(temp);

        console.log(formData);


        axios.post(`${API_URL}room/add`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const setFormErrorMessageToFalse = () => {
        setFormErrorMessage({
            address: false,
            price: false,
            addition_infor: false,
            city: false,
            district: false,
            ward: false,
            area: false,
        })
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

    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            editable: false,
            width: 200
        },
        {
            field: 'province',
            headerName: 'Tỉnh thành',
            editable: false,
            width: 150
        },
        {
            field: 'district',
            headerName: 'Quận huyện',
            editable: false,
            width: 200
        },
        {
            field: 'ward',
            headerName: 'Phường xã',
            editable: false,
            width: 150
        },
        {
            field: 'price',
            headerName: 'Giá',
            editable: false,
            width: 100
        },
        {
            field: 'area',
            headerName: 'Diện tích',
            editable: false,
            width: 200,
            renderCell: (params) => (
                <div>{params.value} <small>m2</small></div>
            ),
        },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            option: false,
            renderCell: (params) => (
                <strong>
                    <button className="btn btn-sm btn-primary m-1" onClick={(e) => onShowDetails(params.value)}>Chi tiết</button>
                    <button className="btn btn-sm btn-secondary m-1">Chỉnh sửa</button>
                    <button className="btn btn-sm btn-danger m-1">Xóa</button>
                </strong>
            ),
            width: 300
        }
    ];

    useEffect(() => {
        var renderRows = [];
        if (data) {
            data.map((item, index) => {
                renderRows.push({
                    id: index+1,
                    address: item.address,
                    province: item.city,
                    district: item.district,
                    ward: item.ward,
                    price: item.price,
                    area: item.area,
                    action: item
                })
            })

            setRows(renderRows);
        }
    }, [data])

    return (
        <div className="wrapper m-auto pt-3 room-container">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="bold">Danh sách nhà</div>
                    <button onClick={onShowNew} className="btn btn-sm btn-success">Thêm</button>
                </Card.Header>
                <Card.Body>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                        />
                    </div>
                    {/* <Table striped bordered hover>
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
                    </Table> */}
                </Card.Body>
            </Card>

            <Modal
                className="details_modal"
                show={showDetails}
                onHide={hideDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết nhà</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Hình ảnh</Form.Label>
                            <img className="mw-100" src={`/assets/images/rooms/${details?.image?.name ? details?.image?.name : '/no-img.png'}`} alt="" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control disabled type="text" value={details?.address} />
                        </Form.Group>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Tỉnh thành</Form.Label>
                                <Form.Control disabled type="text" value={details?.city} />
                            </Col>
                            <Col className="mb-3">
                                <Form.Label>Quận huyện</Form.Label>
                                <Form.Control disabled type="text" value={details?.district} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Xã phường</Form.Label>
                                <Form.Control disabled type="text" value={details?.ward} />
                            </Col>
                            <Col className="mb-3">
                                <Form.Label>Giá (VND)</Form.Label>
                                <Form.Control disabled type="text" value={details?.price} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-3">
                                <Form.Label>Diện tích (m2)</Form.Label>
                                <Form.Control disabled type="text" value={details?.area} />
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Chi tiết</Form.Label>
                            <Form.Control disabled as="textarea" rows={8} value={details?.addition_infor} />
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
                        <Form.Control type="text" placeholder="Nhập địa chỉ" onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value })
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.address ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Tỉnh thành</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => {
                            handleCityOnChange(e)
                            setFormErrorMessageToFalse();
                        }}>
                            <option value="null">Chọn tỉnh thành</option>
                            {
                                citiesData.map((item, index) => {
                                    return <option key={item.ProvinceID} value={`${item.ProvinceID},${item.ProvinceName}`}>{item.ProvinceName}</option>
                                })
                            }
                        </Form.Select>
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.city ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Quận/ huyện</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => {
                            handleDistrictOnChange(e)
                            setFormErrorMessageToFalse();
                        }}>
                            <option value="null">Chọn quận huyện</option>
                            {
                                districts.map(item => {
                                    return <option key={item?.DistrictID} value={`${item?.DistrictID},${item?.DistrictName}`}>{item?.DistrictName}</option>
                                })
                            }
                        </Form.Select>
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.district ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Xã/ phường</Form.Label>
                        <Form.Select aria-label="" onChange={(e) => {
                            handleWardOnChange(e)
                            setFormErrorMessageToFalse();
                        }}>
                            <option value="null">Chọn xã phường</option>
                            {
                                wards.map(item => {
                                    return <option key={item?.WardCode} value={`${item?.WardCode},${item?.WardName}`}>{item?.WardName}</option>
                                })
                            }
                        </Form.Select>
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.ward ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control type="number" placeholder="Nhập giá" onChange={(e) => {
                            setFormData({ ...formData, price: parseInt(e.target.value) })
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.price ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Diện tích (m2)</Form.Label>
                        <Form.Control type="number" placeholder="Nhập diện tich" onChange={(e) => {
                            setFormData({ ...formData, area: parseInt(e.target.value) })
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.area ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác" onChange={(e) => {
                            setFormData({ ...formData, addition_infor: e.target.value })
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger" style={{ display: showFormErrorMessage.addition_infor ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group> */}
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
