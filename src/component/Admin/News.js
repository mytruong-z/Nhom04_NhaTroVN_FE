import React, {useState, useEffect} from 'react';
import Header from "./partials/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {API_URL, CLOUD_IMG} from "../../config";
import NumberFormat from "react-number-format";
import {Badge} from "react-bootstrap";
import NewsTable from "./News/NewsTable";

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        if(!loading) {
            await fetch(API_URL + "room",{ method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                // console.log(data);
                let listNews = data.filter(val => val.status === 1).map((val) => {
                    const imgLink = val.image.length > 0 ? `${CLOUD_IMG}${val.image[0].name}` : '/no-img.png';
                    return {
                        "id": val.id,
                        "address": val.address,
                        "image": <img src={imgLink} width="160"/>,
                        "host": val.host,
                        "price": <NumberFormat value={val.price} displayType={'text'} thousandSeparator={true} />,
                        "status": val.isdelete ? <Badge bg="secondary">Chưa xác nhận</Badge> : <Badge bg="success">Đã xác nhận</Badge>,
                        "des": val.post.length > 0 ? val.post[0].description : '',
                        "title": val.post.length > 0 ? val.post[0].title : '',
                        "actions": <a href={`/admin/post/${val.id}`} className="btn btn-sm btn-dark">Chi tiết</a>
                    }
                });
                setNews(listNews);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (news.length > 0 ) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [news])

    return (
        <>
            <Header title={' Quản lý tin'} hideSearch={true}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách tin</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-4 px-0">
                        { loading ?
                            <NewsTable userData={news}/>
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default News;