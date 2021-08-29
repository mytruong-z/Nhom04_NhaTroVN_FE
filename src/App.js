import React, {Component, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './component/Menu';
import Footer from './component/footer';
import routes from './routes/routes';
import adminRoutes from './routes/admin';
import Sidebar from "./component/Admin/partials/sidebar";
import {API_URL} from "./config";

function App() {
    const [adminPage, setAdminPage] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);

    useEffect(async () => {
        const location = window.location.pathname;
        if(location.startsWith('/admin')){
            setAdminPage(true);
        }
        if(location.startsWith('/admin/login')){
            setAdminLogin(true);
        }
    }, [adminPage]);

    function showContentMenu(routes){
        var result = null;

        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }

        return result;
    }
    return (
        <>
            {!adminPage?
                <Router>
                    <div className="App">
                        {/* Menu */}
                        <Menu />
                        {/* Noi Dung */}
                        <Switch>
                            { showContentMenu(routes) }
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
                : //Admin pages
                <Router>
                    <div className="App row w-100 p-0">
                        {!adminLogin ?
                            <>
                                <div className="col-3 p-0">
                                    <Sidebar/>
                                </div>
                                <div className="col-9 p-0">
                                    <Switch>
                                        { showContentMenu(adminRoutes) }
                                    </Switch>
                                </div>
                            </>
                        : //Login to admin
                        <div id="login-page" className="col">
                            <Switch>
                                { showContentMenu(adminRoutes) }
                            </Switch>
                        </div>
                        }
                    </div>
                </Router>}
        </>
    )
}

export default App;