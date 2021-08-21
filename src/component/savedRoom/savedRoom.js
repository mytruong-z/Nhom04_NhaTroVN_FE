import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../../config/index";
import { List, Divider, Avatar } from 'antd';
import 'antd/dist/antd.css';
import './savedRoom.css'

function SavedRoom() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios(
            API_URL + "api/user/saved_room/" + "175",
        ).then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, [])

    return (
        <div className="saved_room">
            <Divider orientation="left">Danh sách nhà đã lưu</Divider>
            <List
                size="large"
                header={<div>Xem lại các room bạn đã lưu</div>}
                footer={<div>Hết</div>}
                bordered
                dataSource={data}
                renderItem={item => 
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={(item.name ? `/${item.name}` : '/no-img.png')}/>}
                            title={<a href={`/${item.id}`}>{item.address}</a>}
                            description={`${item.addition_infor}  -  ${item.price} VND`}
                        />
                    </List.Item>
                }
            />
        </div>
    );
}

export default SavedRoom;