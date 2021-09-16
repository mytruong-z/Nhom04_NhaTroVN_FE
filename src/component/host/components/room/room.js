import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Card, Table, Form, Row, Col } from 'react-bootstrap';
import './room.css';
import { API_URL } from '../../../../config/index';
import { DataGrid } from '@material-ui/data-grid';
import { useAlert } from 'react-alert';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip';

function Room() {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showPostDetails, setShowPostDetails] = useState(false);
    const [showImagesDetails, setShowImagesDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showUpdateRoom, setShowUpdateRoom] = useState(false);
    const [details, setDetails] = useState(null);
    const [roomUpdateDetails, setRoomUpdateDetails] = useState(null);
    const [postDetails, setPostDetails] = useState(null);
    const [images, setImages] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedWard, setSelectedWard] = useState();
    const [hostId, setHostId] = useState(0);
    const alert = useAlert();

    const [formData, setFormData] = useState({
        address: '',
        price: 0,
        addition_infor: '',
        city: '',
        district: '',
        ward: '',
        area: 0,
        hostID: 0
    });

    const [showFormErrorMessage, setFormErrorMessage] = useState({
        address: false,
        price: false,
        addition_infor: false,
        city: false,
        district: false,
        ward: false,
        area: false
    });

    const [formUpdateRoomData, setFormUpdateRoomData] = useState({
        id: 0,
        address: "",
        price: 0,
        addition_infor: "",
        city: "",
        district: "",
        ward: "",
        area: 0
    })

    const [showFormUpdateRoomErrorMessage, setFormUpdateRoomErrorMessage] = useState({
        address: false,
        price: false,
        addition_infor: false,
        area: false
    })

    const GHN_TOKEN = 'b08e0769-130e-11ec-b8c6-fade198b4859';
    const imageBaseUrl = 'https://res.cloudinary.com/nhom4/image/upload/v1631451498/room/';

    useEffect(() => {
        // get host id
        setHostId(JSON.parse(localStorage.getItem('user')).id);
    }, []);

    const getRooms = (hostId) => {
        axios(
            `${API_URL}room/searchByhost/${hostId}`,
        ).then((res) => {
            if (Array.isArray(res.data)) {
                console.log(res);
                setData(res.data);
            }
        });
    }

    useEffect(() => {
        if (hostId != 0) {
            getRooms(hostId);

            // update hostid in form data
            setFormData({
                ...formData,
                hostID: hostId
            });

            // get cities data
            getCities();
        }
    }, [hostId]);

    const getCities = () => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': GHN_TOKEN
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
    };

    const getDistricts = (provinceId) => {
        fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': GHN_TOKEN
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
                });
                setDistricts(listDistrictByProvince);
            });
    };

    const getWards = (districtId) => {
        fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': GHN_TOKEN
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
    };

    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict);
        }
    }, [selectedDistrict]);

    const handleCityOnChange = (e) => {
        var valueSplitted = e.target.value.split(',');
        var newFormData = {
            ...formData,
            district: '',
            ward: '',
            city: valueSplitted[1] ? valueSplitted[1] : ''
        };
        setFormData(newFormData);
        setSelectedCity(valueSplitted[0]);
        setWards([]);
    };

    const handleDistrictOnChange = (e) => {
        var valueSplitted = e.target.value.split(',');
        var newFormData = {
            ...formData,
            ward: '',
            district: valueSplitted[1] ? valueSplitted[1] : ''
        };
        setFormData(newFormData);
        setSelectedDistrict(valueSplitted[0]);
    };

    const handleWardOnChange = (e) => {
        var valueSplitted = e.target.value.split(',');
        var newFormData = {
            ...formData,
            ward: valueSplitted[1] ? valueSplitted[1] : ''
        };
        setFormData(newFormData);
        setSelectedWard(valueSplitted[0]);
    };

    const submitRoom = async () => {
        await setFormErrorMessage({
            address: (formData.address == '') ? true : false,
            price: (formData.price == '') ? true : false,
            addition_infor: (formData.addition_infor == '') ? true : false,
            city: (formData.city == '') ? true : false,
            district: (formData.district == '') ? true : false,
            ward: (formData.ward == '') ? true : false,
            area: (formData.area == 0) ? true : false
        });

        for (var i in formData) {
            if (formData[i] === '' || formData[i] === 0) {
                return;
            }
        }

        axios.post(`${API_URL}room/add`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                setShowNew(false);
                getRooms(hostId);
                alert.success("Thêm nhà thành công");
            })
            .catch(function (error) {
                alert.error(error);
            });
    };

    const submitUpdateRoom = async () => {
        await setFormUpdateRoomErrorMessage({
            address: (formUpdateRoomData.address == "") ? true : false,
            price: (formUpdateRoomData.price == "") ? true : false,
            addition_infor: (formUpdateRoomData.addition_infor == "") ? true : false,
            area: (formUpdateRoomData.area == 0) ? true : false
        })

        console.log(formUpdateRoomData);

        for (var i in formUpdateRoomData) {
            if (formUpdateRoomData[i] === "" || formUpdateRoomData[i] === 0) {
                console.log(i);
                console.log(formUpdateRoomData[i]);
                return;
            }
        }

        axios.post(`${API_URL}/room/update`, formUpdateRoomData, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(function (response) {
                setShowUpdateRoom(false);
                getRooms(hostId);
                alert.success("Sửa nhà thành công");
            })
            .catch(function (error) {
                alert.error("Sửa không thành công");
            });
    }

    const setFormErrorMessageToFalse = () => {
        setFormUpdateRoomErrorMessage({
            address: false,
            price: false,
            addition_infor: false,
            area: false,
            district: false,
            city: false,
            ward: false
        })
    }

    const setFormUpdateRoomErrorMessageToFalse = () => {
        setFormUpdateRoomErrorMessage({
            address: false,
            price: false,
            addition_infor: false,
            area: false,
        })
    }

    const onShowDetails = (item) => {
        setShowDetails(true);
        setDetails(item);
    };

    const onShowUpdateRoom = (item) => {
        var dataCopied = {
            ...formUpdateRoomData,
            "address": item.address,
            "id": item.id,
            "price": item.price,
            "area": item.area,
            "addition_infor": item.addition_infor,
            "city": item.city,
            "district": item.district,
            "ward": item.ward
        };

        console.log("update room data: ", dataCopied);

        setFormUpdateRoomData(dataCopied);
        setShowUpdateRoom(true);
        setRoomUpdateDetails(item);
    }

    const onShowPostDetails = (item) => {
        setShowPostDetails(true);
        setPostDetails(item);
    };

    const onShowImagesDetails = (item) => {
        setShowImagesDetails(true);

        const imagesData = {
            image: item.image,
            roomID: item.id
        }

        console.log(imagesData);

        setImages(imagesData);
    }

    const hideImagesDetailsModal = () => {
        setShowImagesDetails(false);
    }

    const onShowNew = (item) => {
        setShowNew(true);
    }

    const hideDetailsModal = () => {
        setShowDetails(false);
    }

    const hidePostDetailsModal = () => {
        setShowPostDetails(false);
    };

    const hideNewModal = () => {
        setShowNew(false);
    }


    const hideUpdateRoom = () => {
        setShowUpdateRoom(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'post',
            headerName: 'Bài đăng',
            editable: false,
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <strong>
                    <a className="m-1" onClick={(e) => onShowPostDetails(params.value)}>Xem chi tiết</a>
                    <a className="m-1 text-dark">Chỉnh sửa</a>
                </strong>
            ),
        },
        {
            field: 'post_status',
            headerName: 'Trạng thái',
            editable: false,
            sortable: true,
            width: 100,
            renderCell: (params) => (
                <strong>
                    {params.value?.status?.name == "active" ?
                        <Tooltip title="Đã duyệt" aria-label="add">
                            <DoneOutlineIcon style={{ fill: "green" }} />
                        </Tooltip>
                        :
                        <Tooltip title="Chưa duyệt" aria-label="add">
                            <DoneOutlineIcon />
                        </Tooltip>
                    }
                </strong>
            ),
        },
        {
            field: 'image',
            headerName: 'Hình ảnh',
            editable: false,
            sortable: true,
            width: 150,
            renderCell: (params) => {
                const imageUrl = (params?.value?.image?.length > 0) ? `${imageBaseUrl}${params?.value?.image[0]?.name}` : '/assets/images/rooms/no-img.png';
                return <Tooltip title="Click để xem" aria-label="add">
                    <img onClick={(e) => onShowImagesDetails(params.value)} className="room-image mw-100" src={imageUrl} alt="" />
                </Tooltip>

            },
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            editable: false,
            width: 200
        },
        // {
        //     field: 'province',
        //     headerName: 'Tỉnh thành',
        //     editable: false,
        //     width: 150
        // },
        // {
        //     field: 'district',
        //     headerName: 'Quận huyện',
        //     editable: false,
        //     width: 200
        // },
        // {
        //     field: 'ward',
        //     headerName: 'Phường xã',
        //     editable: false,
        //     width: 150
        // },
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
            width: 150,
            renderCell: (params) => (
                <div>{params.value}
                    <small>m2</small>
                </div>
            ),
        },
        {
            field: 'addition_infor',
            headerName: 'Khác',
            editable: false,
            width: 200
        },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            option: false,
            renderCell: (params) => (
                <strong>
                    <button className="btn btn-sm btn-primary m-1" onClick={(e) => onShowDetails(params.value)}>Chi tiết</button>
                    <button className="btn btn-sm btn-secondary m-1" onClick={(e) => onShowUpdateRoom(params.value)}>Chỉnh sửa</button>
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
                    id: index + 1,
                    address: item?.address,
                    province: item?.city,
                    district: item?.district,
                    ward: item?.ward,
                    price: item?.price,
                    area: item?.area,
                    addition_infor: item?.addition_infor,
                    action: item,
                    post: item?.post[0],
                    post_status: item?.post[0],
                    image: item
                })
            })

            setRows(renderRows);
        }
    }, [data]);

    return (
        <div className="wrapper m-auto pt-3 room-container">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="bold">Danh sách nhà</div>
                    <button onClick={onShowNew} className="btn btn-sm btn-success">Thêm</button>
                </Card.Header>
                <Card.Body>
                    <div style={{ height: '650px', width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                        />
                    </div>
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
                className="post_details_modal"
                show={showPostDetails}
                onHide={hidePostDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bài đăng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control disabled type="text" value={postDetails?.title} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Chi tiết</Form.Label>
                            <Form.Control disabled as="textarea" rows={8} value={postDetails?.description} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hidePostDetailsModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="images_details_modal"
                show={showImagesDetails}
                onHide={hideImagesDetailsModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hình ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <div className="images-container">
                            {
                                (images?.image?.length > 0) ? images?.image?.map((item, index) => {
                                    return <img key={index} className="room-image-detail" src={`${imageBaseUrl}${item?.name}`} alt="" />
                                }) : null
                            }
                                                        {
                                (images?.image?.length > 0) ? images?.image?.map((item, index) => {
                                    return <img key={index} className="room-image-detail" src={`${imageBaseUrl}${item?.name}`} alt="" />
                                }) : null
                            }
                                                        {
                                (images?.image?.length > 0) ? images?.image?.map((item, index) => {
                                    return <img key={index} className="room-image-detail" src={`${imageBaseUrl}${item?.name}`} alt="" />
                                }) : null
                            }
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideImagesDetailsModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={hideImagesDetailsModal}>
                        Cập nhật
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
                    <Form.Group className="mb-3" controlid="">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger"
                            style={{ display: showFormErrorMessage.address ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Tỉnh thành</Form.Label>
                            <Form.Select aria-label="" onChange={(e) => {
                                handleCityOnChange(e);
                                setFormErrorMessageToFalse();
                            }}>
                                <option value="null">Chọn tỉnh thành</option>
                                {
                                    citiesData.map((item, index) => {
                                        return <option key={item.ProvinceID}
                                            value={`${item.ProvinceID},${item.ProvinceName}`}>{item.ProvinceName}</option>;
                                    })
                                }
                            </Form.Select>
                            <Form.Text className="text-muted text-danger"
                                style={{ display: showFormErrorMessage.city ? 'block' : 'none' }}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Quận/ huyện</Form.Label>
                            <Form.Select aria-label="" onChange={(e) => {
                                handleDistrictOnChange(e);
                                setFormErrorMessageToFalse();
                            }}>
                                <option value="null">Chọn quận huyện</option>
                                {
                                    districts.map(item => {
                                        return <option key={item?.DistrictID}
                                            value={`${item?.DistrictID},${item?.DistrictName}`}>{item?.DistrictName}</option>;
                                    })
                                }
                            </Form.Select>
                            <Form.Text className="text-muted text-danger"
                                style={{ display: showFormErrorMessage.district ? 'block' : 'none' }}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Xã/ phường</Form.Label>
                            <Form.Select aria-label="" onChange={(e) => {
                                handleWardOnChange(e);
                                setFormErrorMessageToFalse();
                            }}>
                                <option value="null">Chọn xã phường</option>
                                {
                                    wards.map(item => {
                                        return <option key={item?.WardCode}
                                            value={`${item?.WardCode},${item?.WardName}`}>{item?.WardName}</option>;
                                    })
                                }
                            </Form.Select>
                            <Form.Text className="text-muted text-danger"
                                style={{ display: showFormErrorMessage.ward ? 'block' : 'none' }}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="number" placeholder="Nhập giá" onChange={(e) => {
                                setFormData({ ...formData, price: parseInt(e.target.value) });
                                setFormErrorMessageToFalse();
                            }} />
                            <Form.Text className="text-muted text-danger"
                                style={{ display: showFormErrorMessage.price ? 'block' : 'none' }}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlid="">
                        <Form.Label>Diện tích (m2)</Form.Label>
                        <Form.Control type="number" placeholder="Nhập diện tich" onChange={(e) => {
                            setFormData({ ...formData, area: parseInt(e.target.value) });
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger"
                            style={{ display: showFormErrorMessage.area ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác" onChange={(e) => {
                            setFormData({ ...formData, addition_infor: e.target.value });
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger"
                            style={{ display: showFormErrorMessage.addition_infor ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    {/* <Form.Group controlid="formFile" className="mb-3">
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

            <Modal
                className="new_modal"
                show={showUpdateRoom}
                onHide={hideUpdateRoom}
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin nhà</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlid="">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập địa chỉ" value={formUpdateRoomData?.address} onChange={(e) => {
                            setFormUpdateRoomData({ ...formUpdateRoomData, address: e.target.value })
                            setFormErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger" style={{ display: showFormUpdateRoomErrorMessage.address ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                    <Row>
                        <Col className="mb-3" controlid="">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="number" placeholder="Nhập giá" value={formUpdateRoomData?.price} onChange={(e) => {
                                setFormUpdateRoomData({ ...formUpdateRoomData, price: parseInt(e.target.value) })
                                setFormUpdateRoomErrorMessageToFalse();
                            }} />
                            <Form.Text className="text-muted text-danger" style={{ display: showFormUpdateRoomErrorMessage.price ? 'block' : 'none' }}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                        <Col>
                            <Form.Label>Diện tích (m2)</Form.Label>
                            <Form.Control type="number" placeholder="Nhập diện tich" value={formUpdateRoomData?.area} onChange={(e) => {
                                setFormUpdateRoomData({ ...formUpdateRoomData, area: parseInt(e.target.value) })
                                setFormUpdateRoomErrorMessageToFalse();
                            }} />
                            <Form.Text className="text-muted text-danger" style={{ display: showFormUpdateRoomErrorMessage.area ? 'block' : 'none' }}>
                                Vui lòng nhập thông tin
                            </Form.Text>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Thông tin khác</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Nhập thông tin khác" value={formUpdateRoomData?.addition_infor} onChange={(e) => {
                            setFormUpdateRoomData({ ...formUpdateRoomData, addition_infor: e.target.value })
                            setFormUpdateRoomErrorMessageToFalse();
                        }} />
                        <Form.Text className="text-muted text-danger" style={{ display: showFormUpdateRoomErrorMessage.addition_infor ? 'block' : 'none' }}>
                            Vui lòng nhập thông tin
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideUpdateRoom}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitUpdateRoom}>
                        Sửa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Room;
