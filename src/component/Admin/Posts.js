import React, {useEffect, useState} from 'react';
import CardItem from "./partials/cardItem";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Header from "./partials/header";
import {API_URL, CLOUD_IMG} from "../../config";
import {Badge} from "react-bootstrap";

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
                        "image": imgLink,
                        "description": val.post.length > 0 ? val.post[0].description : '',
                        "status": val.isdelete ? <Badge bg="secondary">Inactive</Badge> :
                            <Badge bg="success">Active</Badge>
                    }
                });
                let listPostsWaiting = data.filter(val => val.status === 0).map((val) => {
                    const imgLink = val.image.length > 0 ? `${CLOUD_IMG}${val.image[0].name}` : '/no-img.png';
                    return {
                        "id": val.id,
                        "title": val.post.length > 0 ? val.post[0].title : 'No title',
                        "image": imgLink,
                        "description": val.post.length > 0 ? val.post[0].description : 'Empty'
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
    return (
        <>
            <Header title={'Xác minh bài viết'} hideSearch={true}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Chưa duyệt</Tab>
                    <Tab>Đã duyệt</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        {loading ?
                            <>
                                {listPostsWaiting.map((item, i) => (
                                    <CardItem key={i} src={item.image} title={item.title} subTitle={item.description}
                                              btnText={'Chi tiết'} linkBtn={`/admin/post/${item.id}`}/>
                                ))}
                            </> :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-5 px-0">
                        {loading ?
                            <>
                                {listPostsVerification.map((item, i) => (
                                    <CardItem key={i} src={item.image} title={item.title} subTitle={item.description}
                                              btnText={'Chi tiết'} linkBtn={`/admin/post/${item.id}`}/>
                                ))}
                            </> :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default Posts;