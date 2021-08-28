import React, {useState, useEffect} from 'react';
import {FaSearch} from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CardItem from "./partials/cardItem";

function listBill() {
    return (
        <>
            <div id="admin-banner">
                <div className="admin-banner p-2 pl-2 mt-4 mb-2 rounded-3 bold text-white bg-dark text-uppercase">
                    Danh sách hoá đơn
                </div>
                <div className="admin-header rounded bg-light p-2">
                    <div className="input-group search-field w-25">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                               aria-describedby="search-addon"/>
                        <span className="input-group-text border-0" id="search-addon"><FaSearch/></span>
                    </div>
                </div>
            </div>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Đã thanh toán (2)</Tab>
                    <Tab>Chưa thanh toán (1)</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        <CardItem src={'room_1.jpeg'} title={'Da thanh toan 10tr cho hoa don'} subTitle={'abc'} btnText={'Chi tiết'}/>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-5">
                        <CardItem src={'room_2.jpeg'} title={'Da thanh toan 10tr cho hoa don'} subTitle={'abc'} btnText={'Chi tiết'}/>
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default listBill;