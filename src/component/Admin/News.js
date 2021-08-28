import React, {useState, useEffect} from 'react';
import CardItem from "./partials/cardItem";
import Header from "./partials/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const news = [
    {
        id: 1,
        title: 'Cho thuê phòng đẹp như khách sạn',
        image: 'room_1.jpeg',
        roomID: 1,
        price: '3.000.000 vnd'
    },
    {
        id: 3,
        title: 'Cho thuê phòng đẹp như khách sạn',
        image: 'room_3.jpeg',
        roomID: 3,
        price: '2.000.000 vnd'
    }
]

function News() {
    return (
        <>
            <Header title={' Quản lý tin'}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách tin</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        {news.map((item, i) => (
                            <CardItem src={item.image} title={item.title} subTitle={item.price} btnText={'Chi tiết'} linkBtn={`/admin/new/${item.id}`}/>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default News;