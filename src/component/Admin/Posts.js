import React, {useState, useEffect} from 'react';
import CardItem from "./partials/cardItem";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Header from "./partials/header";

const listPostsVerification = [
    {
        id: 1,
        title: 'Cho thuê phòng đẹp như khách sạn',
        image: 'room_1.jpeg',
        roomID: 1,
        description: 'cho thuê phòng đẹp như khách sạn, đầy đủ nội thất, mới xây, gần trung tâm, yên tĩnh và tự do về giờ giấc. Diện tích 30m2, giá thuê chỉ 5 triệu/tháng.',
        service: 2
    },
    {
        id: 3,
        title: 'Cho thuê phòng đẹp như khách sạn',
        image: 'room_3.jpeg',
        roomID: 3,
        description: 'cho thuê phòng đẹp như khách sạn, đầy đủ nội thất, mới xây, gần trung tâm, yên tĩnh và tự do về giờ giấc. Diện tích 30m2, giá thuê chỉ 5 triệu/tháng.',
        service: 2
    }
]
const listPostsWaiting = [
    {
        id: 1,
        title: 'Cho thuê phòng đẹp như khách sạn',
        image: 'room_2.jpeg',
        roomID: 1,
        description: 'cho thuê phòng đẹp như khách sạn, đầy đủ nội thất, mới xây, gần trung tâm, yên tĩnh và tự do về giờ giấc. Diện tích 30m2, giá thuê chỉ 5 triệu/tháng.',
        service: 2
    },
    {
        id: 2,
        title: 'Phòng trọ cho thuê đầy đủ nội thất mới đối diện Landmart 81, thuận tiện qua lại nhiều khu vực quận trung tâm',
        image: 'room_4.jpeg',
        roomID: 2,
        description: 'Để chung tay đồng hành cùng khách hàng vượt qua dịch covid 19 Tặng ngay 1tr cho khách hàng cọc và ở trong tháng 6/2021.\n' +
            '\n' +
            'Vị trí: Số 117/17 Nguyễn Hữu Cảnh, P. 22, Q.Bình Thạnh, TP.HCM.\n' +
            '\n' +
            '+ Phòng cho thuê full nội thất đối diện Vinhome Tân Cảng, khu vực yên tĩnh tách biệt, hẻm ô tô sát bên The Manor, Saigon Pearl, khu du lịch Văn Thánh, gần đại học Ngoại Thương, Hutech,...',
        service: 2
    },
    {
        id: 3,
        title: 'Cho thuê phòng đẹp như khách sạn',
        image: 'room_5.jpeg',
        roomID: 3,
        description: 'cho thuê phòng đẹp như khách sạn, đầy đủ nội thất, mới xây, gần trung tâm, yên tĩnh và tự do về giờ giấc. Diện tích 30m2, giá thuê chỉ 5 triệu/tháng.',
        service: 2
    }
]
function Posts() {
    return (
        <>
            <Header title={'Xác minh bài viết'} />
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Chưa duyệt</Tab>
                    <Tab>Đã duyệt</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        {listPostsVerification.map((item, i) => (
                            <CardItem src={item.image} title={item.title} subTitle={item.description} btnText={'Chi tiết'}/>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-5">
                        {listPostsWaiting.map((item, i) => (
                            <CardItem src={item.image} title={item.title} subTitle={item.description} btnText={'Chi tiết'}/>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Posts;