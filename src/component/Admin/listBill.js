import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CardItem from "./partials/cardItem";
import Header from "./partials/header";

const bills = [
    {
        id: 1,
        title: 'Thanh toán hoá đơn',
        image: 'room_1.jpeg',
        roomID: 1,
        des: 'Đã thanh toán',
        price: '3.000.000 vnd'
    },
    {
        id: 3,
        title: 'Thanh toán hoá đơn ',
        image: 'room_3.jpeg',
        roomID: 3,
        des: 'Đã thanh toán',
        price: '2.000.000 vnd'
    }
]

const noRefund = [
    {
        id: 1,
        title: 'Thanh toán hoá đơn',
        image: 'room_4.jpeg',
        roomID: 1,
        des: 'Chưa thanh toán',
        price: '3.000.000 vnd'
    },
    {
        id: 3,
        title: 'Thanh toán hoá đơn ',
        image: 'room_2.jpeg',
        roomID: 3,
        des: 'Chưa thanh toán',
        price: '2.000.000 vnd'
    },
    {
        id: 3,
        title: 'Thanh toán hoá đơn ',
        image: 'room_5.jpeg',
        roomID: 3,
        des: 'Chưa thanh toán',
        price: '10.000.000 vnd'
    }
]
function listBill() {
    return (
        <>
            <Header title={'Danh sách hoá đơn'}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Đã thanh toán (2)</Tab>
                    <Tab>Chưa thanh toán (3)</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        {bills.map((item, i) => (
                            <CardItem src={item.image} title={item.title} subTitle={item.price} subTitle1={item.des} btnText={'Chi tiết'} linkBtn={`/admin/bill/${item.id}`}/>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-5">
                        {noRefund.map((item, i) => (
                            <CardItem src={item.image} title={item.title} subTitle={item.price} subTitle1={item.des} btnText={'Chi tiết'} linkBtn={`/admin/bill/${item.id}`}/>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default listBill;