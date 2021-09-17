import React, {useState, useEffect} from 'react';
import { Bar } from "react-chartjs-2";

function Dashboard() {
    const label = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];

    const chartData = [2478, 5267, 734, 784, 433, 2478, 5267, 734, 784, 433, 784, 433];


    return (
        <>
            <div id="admin-banner">
                <div className="admin-banner p-2 pl-2 mt-4 mb-2 rounded-3 bold text-white bg-dark text-uppercase">
                    Báo cáo
                </div>
            </div>
            <div className="container pb-5 pt-2">
                <h3 className="text-center">Thống kê doanh thu 12 tháng gần nhất</h3>
                <Bar
                    data={{
                        labels: label,
                        datasets: [
                            {
                                label: "Doanh thu (VND)",
                                backgroundColor: [
                                    "#efd6d5",
                                    "#deb0ae",
                                    "#8d8e93",
                                    "#a5afa9",
                                    "#c0cac2",
                                    "#d8d9d3",
                                ],
                                data: chartData
                            }
                        ]
                    }}
                    options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                    }}
                />
            </div>
        </>
    )
};

export default Dashboard;