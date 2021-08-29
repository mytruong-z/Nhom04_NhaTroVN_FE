import React, {useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Header from "./partials/header";
import UserTable from "./User/UserTable";

const users = [
    {
        "Id": 175,
        "phone": "01234566",
        "name": "Anh Hồ",
        "email": "baoanh2003199@gmail.com",
        "password": "$2b$10$P9/9xuSedS764Gk2YaKlMeEw.yfgzGkgmO301wQHp9p.6PMY6pyBy",
        "role": 0,
        "created_at": "2021-08-15T09:52:20.000Z",
        "balance": 0,
        "activate_status": 1,
        "cardId": "01232535"
    },
    {
        "Id": 185,
        "phone": "0389571606",
        "name": "Dang Xuan Danh",
        "email": "dxdanh1401@gmail.com",
        "password": "$2b$10$KUSkmFPixh9ojMQs/5MgjOvuW7dVwI2b0UR6oNtkgJk4Ca/SuTA6u",
        "role": 0,
        "created_at": "2021-08-15T19:02:36.000Z",
        "balance": 9999999999204000,
        "activate_status": 1,
        "cardId": "0123456789"
    },
    {
        "Id": 205,
        "phone": "1243231412",
        "name": "Dang Xuan A",
        "email": "dangxuandanh1999@gmail.com",
        "password": "$2b$10$C4vVpiR6ge./dn5q0SEqRefZ20aGPmr3f0uI0.tMPpmYJP1nT4uhW",
        "role": 0,
        "created_at": "2021-08-15T22:27:47.000Z",
        "balance": 0,
        "activate_status": 0,
        "cardId": "123412341234"
    },
    {
        "Id": 215,
        "phone": "1111111111",
        "name": "abc",
        "email": "abc@gmail.com",
        "password": "$2b$10$/1EVgWgFAZF..5sj0s876OgtuoFy8GuQac9uBEha3Ac0nTGz0m/N6",
        "role": 0,
        "created_at": "2021-08-16T11:10:53.000Z",
        "balance": 0,
        "activate_status": 0,
        "cardId": "1111111111"
    },
    {
        "Id": 225,
        "phone": "0964034493",
        "name": "mytruong1",
        "email": "ngocmy.truong291@gmail.com",
        "password": "$2b$10$5mDp0gVs53f7j7x4YL3cNeRsSAyKv8j/ejSGG9gXXw2U0wsr5vG9y",
        "role": 0,
        "created_at": "2021-08-16T18:31:15.000Z",
        "balance": 0,
        "activate_status": 1,
        "cardId": "312348583"
    },
    {
        "Id": 255,
        "phone": "0964034493",
        "name": "mytruong",
        "email": "ngocmy.truong29@gmail.com",
        "password": "$2b$10$qsIec3gub8SehudeL6EvneRSxDc0pj.GosjqyZko0fQ72bf7n0.TW",
        "role": 0,
        "created_at": "2021-08-17T17:32:12.000Z",
        "balance": 0,
        "activate_status": 1,
        "cardId": "3423432423"
    },
    {
        "Id": 275,
        "phone": "123456789",
        "name": "Anh Hồ",
        "email": "baoanh200319.9@gmail.com",
        "password": "$2b$10$KJnr3e48AjyLsgSOcxqP.uhnYtnBBm5bb4LttvFaCmoC2h0ZYQ6uq",
        "role": 0,
        "created_at": "2021-08-28T11:39:57.000Z",
        "balance": 0,
        "activate_status": 1,
        "cardId": "123456789"
    }
]

function Users() {
    return (
        <>
            <Header title={'Quản lý người dùng'} />
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách người dùng</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        <UserTable Users={users}/>
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Users;
