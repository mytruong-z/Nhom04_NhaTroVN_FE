import React, { Component, useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Nav, NavLink } from 'react-bootstrap';

//@LoanNgo, You can rely on this variable to check the login status: localStorage;

const Menu = (props) => {
    const {userLogin} = props;
    const menus = [
        {
            name: 'Trang Chủ',
            to: '/',
            exact: true
        },
        {
            name: 'Đăng Nhập',
            to: '/login',
            exact: false
        },
        {
            name: 'Đăng ký',
            to: '/register',
            exact: false
        }
    ];

    //Custom Link
    const MenuLink = ({
                          label,
                          to,
                          activeOnlyWhenExact
                      }) => {
        return (
            <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({match}) => {
                    const active = match ? 'active bg-pink' : '';
                    const loginStatus = (userLogin && (to === '/login' || to === '/register')) ? 'hidden' : '';

                    return (
                        <Nav.Item as="li" className={`my-li align-items-center d-grid ${active} ${loginStatus}`}>
                            <Nav.Link href={to} className="text-pink">{label}</Nav.Link>
                        </Nav.Item>
                    );
                }}
            />
        );
    };

    function showMenus (menus) {
        var result = null;

        if (userLogin) {
            menus.push({
                name: 'Đăng xuất',
                to: '/logout',
                exact: false
            });
            menus.push({
                name: 'Cá Nhân',
                to: '/host',
                exact: false
            });
        }

        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }

        return result;
    };

    return (
        <div className="bg-light shadow">
            <Nav defaultActiveKey="/home" as="ul" className="container justify-content-between">
                <div className="logo">
                    <a href="/"><img src="/NTVN-logo.png" width="70" className="p-2"/></a>
                </div>
                <div className="d-flex">
                    {showMenus(menus)}
                </div>
            </Nav>
        </div>
    );
};

export default Menu;