import React, {useState, useEffect} from 'react';
import {FaSearch} from "react-icons/fa";
import CardItem from "./partials/cardItem";

function News() {
    return (
        <>
            <div id="admin-banner">
                <div className="admin-banner p-2 pl-2 mt-4 mb-2 rounded-3 bold text-white bg-dark text-uppercase">
                    Quản lý tin
                </div>
                <div className="admin-header d-flex justify-content-between rounded bg-light p-2">
                    <div className="header-links btn-group" role="group">
                        <button type="button" className="btn btn-secondary" disabled>Danh sách tin</button>
                    </div>
                    <div className="input-group search-field w-25">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                               aria-describedby="search-addon"/>
                        <span className="input-group-text border-0" id="search-addon"><FaSearch/></span>
                    </div>
                </div>
            </div>
            <div className="container py-5">
                <CardItem src={'room_1.jpeg'} title={'Da thanh toan 10tr cho hoa don'} subTitle={'abc'} btnText={'Chi tiết'}/>
            </div>
        </>
    )
};

export default News;