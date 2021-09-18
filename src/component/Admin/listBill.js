import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CardItem from "./partials/cardItem";
import Header from "./partials/header";
import BillTable from "./Bill/BillTable";
import {API_URL} from "../../config";

function ListBills() {
    const [bills, setBills] = useState([]);
    const [noPayment, setNoPayment] = useState([]);
    const [loading, setLoading] = useState(false);

    const billColumn = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'ID người dùng',
            accessor: 'userID',
        },
        {
            Header: 'Unique Key',
            accessor: 'unique_key',
        },
        {
            Header: 'Subscription Id',
            accessor: 'subscription_id',
        }
    ];

    useEffect(async () => {
        if(!loading) {
            await fetch(API_URL + "payment/view/all",{ method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                setBills(data);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    useEffect(async () => {
        if (bills.length > 0 ) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [bills])

    return (
        <>
            <Header title={'Danh sách hoá đơn'} hideSearch={true}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Đã thanh toán (2)</Tab>
                    <Tab>Chưa thanh toán (3)</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5">
                        { loading ?
                            <BillTable userData={bills} column={billColumn} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-5">
                        {noPayment.map((item, i) => (
                            <CardItem src={item.image} title={item.title} subTitle={item.price} subTitle1={item.des} btnText={'Chi tiết'} linkBtn={`/admin/bill/${item.id}`}/>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
};

export default ListBills;