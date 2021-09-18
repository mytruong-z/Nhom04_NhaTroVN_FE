import React, {useEffect, useState} from 'react';
import CardItem from "./partials/cardItem";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Header from "./partials/header";
import {API_URL, CLOUD_IMG} from "../../config";
import {Badge} from "react-bootstrap";
import NumberFormat from "react-number-format";
import PostsTable from "./Post/PostsTable";

function Posts() {
    const [listPostsVerification, setListPostsVerification] = useState([]);
    const [listPostsWaiting, setListPostsWaiting] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        if (!loading) {
            await fetch(API_URL + "room", {method: 'GET'}).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listPostsVerification = data.filter(val => val.status === 1).map((val) => {
                    const imgLink = val.image.length > 0 ? `${CLOUD_IMG}${val.image[0].name}` : '/no-img.png';
                    return {
                        "id": val.id,
                        "title": val.post.length > 0 ? val.post[0].title : '',
                        "image": <img src={imgLink} width="160"/>,
                        "description": val.post.length > 0 ? val.post[0].description : '',
                        "price": <NumberFormat value={val.price} displayType={'text'} thousandSeparator={true} />,
                        "actions": <a href={`/admin/post/${val.id}`} className="btn btn-sm btn-dark">Chi tiết</a>
                    }
                });
                let listPostsWaiting = data.filter(val => val.status === 0).map((val) => {
                    const imgLink = val.image.length > 0 ? `${CLOUD_IMG}${val.image[0].name}` : '/no-img.png';
                    return {
                        "id": val.id,
                        "title": val.post.length > 0 ? val.post[0].title : 'Không có tiêu đề',
                        "image": <img src={imgLink} width="160"/>,
                        "description": val.post.length > 0 ? val.post[0].description : 'Không có mô tả',
                        "price": <NumberFormat value={val.price} displayType={'text'} thousandSeparator={true} />,
                        "actions": <div>
                            <a href={`/admin/post/${val.id}`} className="btn btn-sm btn-dark">Chi tiết</a>
                            <button onClick={() => confirmRoom(val.id)} className="btn btn-sm btn-warning mx-1">Xác minh</button>
                        </div>
                    }
                });
                setListPostsVerification(listPostsVerification);
                setListPostsWaiting(listPostsWaiting);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (listPostsVerification.length > 0 || listPostsWaiting.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [listPostsVerification, listPostsWaiting])

    const confirmRoom = async (roomId) => {
        console.log(roomId);
    }

    return (
        <>
            <Header title={'Xác minh bài viết'} hideSearch={true}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Chưa duyệt</Tab>
                    <Tab>Đã duyệt</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-4 px-0">
                        {loading ?
                            <>
                                <PostsTable userData={listPostsWaiting} />
                            </> :
                            <div>Không có dữ liệu</div>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-4 px-0">
                        {loading ?
                            <>
                                <PostsTable userData={listPostsVerification} />
                            </> :
                            <div>Không có dữ liệu</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Posts;