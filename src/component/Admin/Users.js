import React, {useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Header from "./partials/header";
import UserTable from "./User/UserTable";
import {API_URL} from "../../config";
import axios from "axios";

function Users() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        await axios.get(API_URL + "user/information").then((response) => {
            console.log(response.data);
            if(response.data){
                let listUsers = response.data.map((val) => {
                    return {
                        "Id": val.Id,
                        "phone": val.phone,
                        "name": val.name,
                        "email": val.email,
                        "balance": val.balance,
                        "status": val.activate_status,
                        "cardId": val.cardId,
                        "actions": <a href="#" className="btn btn-sm btn-dark">Chi tiết</a>
                    }
                });
                setData(listUsers);
            }
            throw response;
        }).catch((error) => {
            return error;
        });
    }, []);

    return (
        <>
            <Header title={'Quản lý người dùng'} />
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách người dùng</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        <UserTable userData={data}/>
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Users;
