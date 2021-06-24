import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import AUTH_SERVICE from './services/AuthService';


export default class App extends React.Component {
    state = {
        currentUser: null,
        displayName: null,
        userID: null,
    };

    componentDidMount = () => {
        AUTH_SERVICE.account().then(res => {
            console.log('@@@', res)
            this.setState(
                {
                    currentUser: res.data.user,
                    displayName: res.data.user.displayName,
                    userID: res.data.user.oid,
                }
            )
        })
    }

    login = () => {
        return AUTH_SERVICE.login()
    }

    render() {
        return (

            <div className="App">
                <header className="App-header">

                    <BrowserRouter>

                        <Switch>

                            <Route path='/login' component={() => {
                                window.location.href = process.env.REACT_APP_REDIRECT_URL;
                                return null;
                            }}/>
                        </Switch>
                            </BrowserRouter>



                    {this.state.currentUser ?
                        (<>
                            <h2>Hello, {this.state.displayName}. </h2>
                            <a href="/account">Account Info</a><br/>
                            <a href="/logout">Log Out</a>
                        </>)
                        :
                        (<>
                            <h2>Welcome! Please log in.</h2>
                                <a href='/login'>Log in</a>
                        </>)}


                    <img src={logo} className="App-logo" alt="logo"/>


                </header>
            </div>
        );
    }
}
