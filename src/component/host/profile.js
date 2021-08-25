import React, { Component, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {


    return (
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6">
                    <div class="well well-sm">
                        <div class="row">
                            <div >
                                <h4>
                                    Bhaumik Patel</h4>
                                <small><cite title="San Francisco, USA">San Francisco, USA <i class="glyphicon glyphicon-map-marker">
                                </i></cite></small>
                                <p>
                                    <i class="glyphicon glyphicon-envelope"></i>email@example.com
                                    <br />
                                    <i class="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">www.jquery2dotnet.com</a>
                                    <br />
                                    <i class="glyphicon glyphicon-gift"></i>June 02, 1988</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;