import React, {useState, useEffect} from 'react';
import CardItem from "./partials/cardItem";
import Header from "./partials/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {API_URL} from "../../config";
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
                let listNews = data.map((val) => {
                    return {
                        "id": val.id,
                        "address": val.address,
                        "image": <img src={`/assets/images/rooms/${val.image[0].name}`} width="160"/>,
                        "host": val.host,
                        "price": <NumberFormat value={val.price} displayType={'text'} thousandSeparator={true} />,
                        "status": val.status ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>,
                        "des": val.post.title,
                        "actions": <a href={`/admin/new/${val.id}`} className="btn btn-sm btn-dark">Chi tiết</a>
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
            <Header title={' Quản lý tin'}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách tin</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
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