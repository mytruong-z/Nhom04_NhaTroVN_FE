import React from 'react';
import Rooms from './component/rooms';
import Login from './component/login';
import Home from './component/home';
import Register from './component/register';
import NewPostRoom from './component/newPost/newpostroom';
import SavedRoom from './component/savedRoom/savedRoom';
import Host from './component/host/host';
import Profile from './component/host/profile';


const routes = [
    {
        path : '/saved_room',
        exact : false,
        main : ({ match, location }) => <SavedRoom match={match} location={location} />
    },
    {
        path : '/profile',
        exact : false,
        main : ({ match, location }) => <Profile match={match} location={location} />
    },
    {
        path : '/host',
        exact : false,
        main : ({ match, location }) => <Host match={match} location={location} />
    },
    {
        path : '/room',
        exact : false,
        main : ({ match, location }) => <Rooms match={match} location={location} />
    },
    {
        path : '/login',
        exact : false,
        main : ({location}) => <Login location={location} />
    },
    {
        path : '/register',
        exact : false,
        main : ({location}) => <Register location={location} />
    },
    {
        path : '/postStatus',
        exact : false,
        main : ({location}) => <NewPostRoom location={location} />
    },
    {
        path : '/',
        exact : false,
        main : ({location}) => <Home location={location} />
    }
];

export default routes;