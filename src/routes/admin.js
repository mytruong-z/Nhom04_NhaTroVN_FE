import React from 'react';
import Login from '../component/Admin/login';
import ListBills from '../component/Admin/listBill';
import News from '../component/Admin/News';
import Posts from "../component/Admin/Posts";
import Post from "../component/Admin/Post";
import Bill from "../component/Admin/Bill";
import New from "../component/Admin/News";
import Dashboard from "../component/Admin/Dashboard";

const adminRoutes = [
    {
        path : '/admin/login',
        exact : false,
        main : ({ match, location }) => <Login match={match} location={location} />
    },
    {
        path : '/admin/bills',
        exact : false,
        main : ({ match, location }) => <ListBills match={match} location={location} />
    },
    {
        path : '/admin/bill',
        exact : false,
        main : ({ match, location }) => <Bill match={match} location={location} />
    },
    {
        path : '/admin/news',
        exact : false,
        main : ({ match, location }) => <News match={match} location={location} />
    },
    {
        path : '/admin/new',
        exact : false,
        main : ({ match, location }) => <New match={match} location={location} />
    },
    {
        path : '/admin/posts',
        exact : false,
        main : ({ match, location }) => <Posts match={match} location={location} />
    },
    {
        path : '/admin/post',
        exact : false,
        main : ({ match, location }) => <Post match={match} location={location} />
    },
    {
        path : '/admin',
        exact : false,
        main : ({ match, location }) => <Dashboard match={match} location={location} />
    }
];

export default adminRoutes;