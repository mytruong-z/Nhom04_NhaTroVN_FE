import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {API_URL} from "../../config";
import 'react-tabs/style/react-tabs.css';

import Header from "./partials/header";
import BillTable from "./Bill/BillTable";
import Alert from "../common/alert";

function ListBills() {
    const [bills, setBills] = useState([]);
    const [noPayment, setNoPayment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingBill, setLoadingBill] = useState(false);

    const DATE_OPTIONS = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const billColumn = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Người dùng',
            accessor: 'name',
        },
        {
            Header: 'Pay Id',
            accessor: 'user_pay_id',
        },
        {
            Header: 'Paid Date',
            accessor: 'paid_date',
        },
        {
            Header: 'Dịch vụ',
            accessor: 'sub_name',
        }
    ];

    const paymentColumn = [
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
        },
        {
            Header: 'Ngày tạo',
            accessor: 'created_at',
        },
        {
            Header: 'Thao tác',
            accessor: 'actions',
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
                let listPayment = data.map((val) => {
                    return {
                        "id": val.id,
                        "userID": val.userID,
                        "unique_key": val.unique_key,
                        "subscription_id": val.subscription_id,
                        "created_at": val.created_at,
                        "actions": <button onClick={() => confirmPayment(val.unique_key)} className="btn btn-sm btn-warning">Xác nhận</button>
                    }
                });
                setNoPayment(listPayment);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
        if(!loadingBill) {
            await fetch(API_URL + "admin/paid-bill",{ method: 'GET'}).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listBills = data.map((val) => {
                    return {
                        "id": val.paid_bill_id,
                        "name": val.name,
                        "user_pay_id": val.user_pay_id,
                        "paid_date": (new Date(val.paid_date)).toLocaleDateString('en-US', DATE_OPTIONS),
                        "sub_name": val.sub_name
                    }
                });
                setBills(listBills);
                setLoadingBill(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    const confirmPayment = async (uuid) => {
        let item = {'uuid': 'zczxczxczxczxczxczcxz'};
        await fetch(API_URL + 'payment/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(async function (response) {
            const result = await response.json();
            if (result.status === 0) {
                setErrorMessage("Xác nhận không thành công!");
                setAlertStatus(true);
                setAlertType("error");
            }
            else {
                setErrorMessage("Xác nhận thành công!");
                setAlertStatus(false);
                setAlertType("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).catch(function (error) {
            console.log(error);
            setErrorMessage("Xác nhận không thành công!");
            setAlertStatus(true);
            setAlertType("error");
        });
    }

    useEffect(async () => {
        if (noPayment.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [bills])

    useEffect(async () => {
        if (bills.length > 0) {
            setLoadingBill(true);
        } else {
            setLoadingBill(false);
        }
    }, [noPayment])

    return (
        <>
            <Header title={'Danh sách hoá đơn'} hideSearch={true}/>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Đã thanh toán</Tab>
                    <Tab>Chưa thanh toán</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5 px-0">
                        { loadingBill ?
                            <BillTable userData={bills} column={billColumn} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container py-5 px-0">
                        { loading ?
                            <BillTable userData={noPayment} column={paymentColumn} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>
            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert = {setAlertStatus}
            />
        </>
    )
};

export default ListBills;