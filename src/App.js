import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Menu from './component/Menu';
import Footer from './component/footer';
import routes from './routes/routes';
import adminRoutes from './routes/admin';
import Sidebar from "./component/Admin/partials/sidebar";
import Login from "./component/login";
import AdminLogin from "./component/Admin/login";

function App() {
    const [adminPage, setAdminPage] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);
    const [userLogin, setUserLogin] = useState(false);

    const logout = () => {
        localStorage.setItem("user", "");
        setUserLogin(false);
    };

    const adminLogout = () => {
        localStorage.setItem("admin", "");
        setAdminLogin(false);
    };

    const handleUserLogin = () => {
        setUserLogin(true);
    };

    const handleAdminLogin = () => {
        setAdminLogin(true);
    };

    console.log("userLogin", userLogin);
    console.log("adminLogin", adminLogin);

    useEffect(() => {
        const location = window.location.pathname;
        if(location.startsWith('/admin')){
            setAdminPage(true);
        }
        /*if(location.startsWith('/admin/login')){
            setAdminLogin(true);
        }*/
        if (location.startsWith('/admin/logout')) {
            adminLogout();
        }
        if(localStorage.getItem('admin')) {
            setAdminLogin(true);
        }

    }, [adminLogin]);

    useEffect(() => {
        const location = window.location.pathname;
        if (location.startsWith('/logout')) {
            logout();
        }

        if (localStorage.getItem('user')) {
            setUserLogin(true);
        }
    }, []);



    function showContentMenu(routes){
        var result = null;

        if (routes.length > 0) {
            result = routes.map((route, index) => {
                if (route.path === '/login') {
                    route.main = ({location}) => <Login setUserLogin={handleUserLogin} location={location}/>;
                }
                if (route.path === '/admin/login') {
                    route.main = ({location}) => <AdminLogin setAdminLogin={handleAdminLogin} location={location}/>;
                }
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
                        <Menu userLogin={userLogin} />
                        {/* Noi Dung */}
                        <Switch>
                            { showContentMenu(routes) }
                        </Switch>
                        <Footer userLogin={userLogin} />
                    </div>
                </Router>
                : //Admin pages
                <Router>
                    <div className="App row w-100 p-0">
                        {adminLogin ?
                            <>
                                <div className="col-3 p-0">
                                    <Sidebar adminLogin={adminLogin}/>
                                </div>
                                <div className="col-9 p-0">
                                    <Switch>
                                        { showContentMenu(adminRoutes) }
                                    </Switch>
                                </div>
                            </>
                        : //Login to admin
                        <div id="login-page" className="col">
                            <Redirect from="/admin/logout" to="/admin/login" />
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