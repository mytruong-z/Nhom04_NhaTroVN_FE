import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import Header from "../partials/header";
import {API_URL} from "../../../config";
import NumberFormat from "react-number-format";

const User = (props) => {
    const {match} = props;
    const id = match.params.id;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    useEffect(async () => {
        if(!loading && id > 0) {
            await fetch(API_URL + "user/information/" + id,{ method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                setData(data);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (data) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])

    return (
        <>
            <Header title={'Chi tiết người dùng'} hideSearch={true}/>
            <div className="mt-4">
                { loading ?
                    <Card>
                        <Card.Header as="h5">
                            {data.role === 1 ? <Badge bg="dark">Admin</Badge> : <Badge bg="secondary">User</Badge>} <strong>{data.name}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>ID: {data.Id}</Card.Title>
                            <Card.Text>
                                <span className="bold w-150px d-inline-block">Email:</span> {data.email} <br/>
                                <span className="bold w-150px d-inline-block">Số điện thoại:</span> {data.phone} <br/>
                                <span className="bold w-150px d-inline-block">Số dư:</span> <NumberFormat value={data.balance} displayType={'text'} thousandSeparator={true} /> <br/>
                                <span className="bold w-150px d-inline-block">Ngày tạo tài khoản:</span> {(new Date(data.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)} <br/>
                                <span className="bold w-150px d-inline-block">Trạng thái:</span> {data.activate_status ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>} <br/>
                                <span className="bold w-150px d-inline-block">Mã thẻ:</span> {data.cardId} <br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    :
                    <div>Loading...</div>
                }
            </div>
        </>

    );
};

export default User;