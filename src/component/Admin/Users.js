import React, {useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Header from "./partials/header";
import UserTable from "./User/UserTable";
import {API_URL} from "../../config";

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
                        "balance": val.balance,
                        "status": val.activate_status,
                        "cardId": val.cardId,
                        "actions": <a href="#" className="btn btn-sm btn-dark">Chi tiết</a>
                    }
                });
                setData(listUsers);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (data) {
            setLoading(true);
        }
    }, [data])

    return (
        <>
            <Header title={'Quản lý người dùng'} />
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách người dùng</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        { data.length > 0 &&
                            <UserTable userData={data}/>
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Users;
