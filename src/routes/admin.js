import React from 'react';
import ListBills from '../component/Admin/listBill';
import News from '../component/Admin/News';
import Posts from "../component/Admin/Posts";
import Dashboard from "../component/Admin/Dashboard";

const adminRoutes = [
    {
        path : '/admin/bills',
        exact : false,
        main : ({ match, location }) => <ListBills match={match} location={location} />
    },
    {
        path : '/admin/news',
        exact : false,
        main : ({ match, location }) => <News match={match} location={location} />
    },
    {
        path : '/admin/posts',
        exact : false,
        main : ({ match, location }) => <Posts match={match} location={location} />
    },
    {
        path : '/admin',
        exact : false,
        main : ({ match, location }) => <Dashboard match={match} location={location} />
    }
];

export default adminRoutes;