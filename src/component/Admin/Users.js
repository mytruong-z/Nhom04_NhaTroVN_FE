import React, {useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { Badge } from 'react-bootstrap';
import Header from "./partials/header";
import UserTable from "./User/UserTable";
import {API_URL} from "../../config";
import NumberFormat from 'react-number-format';

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        if(!loading) {
            await fetch(API_URL + "user/information",{ method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listUsers = data.map((val) => {
                    return {
                        "Id": val.Id,
                        "phone": val.phone,
                        "name": val.name,
                        "email": val.email,
                        "balance": <NumberFormat value={val.balance} displayType={'text'} thousandSeparator={true} />,
                        "status": val.activate_status ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>,
                        "cardId": val.cardId,
                        "actions": <a href={`/admin/user/${val.Id}`} className="btn btn-sm btn-dark">Chi tiết</a>
                    }
                });
                setData(listUsers);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (data.length > 0 ) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])

    return (
        <>
            <Header title={'Quản lý người dùng'} hideSearch={true} />
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách người dùng</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5 px-0">
                        { loading ?
                            <UserTable userData={data}/>
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Users;
