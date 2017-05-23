'use strict'

import React from 'react';
import { Link } from 'react-router';
import AppStore from '../stores/AppStore';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = AppStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        var user = this.state.user;
        function userStatus() {
            if (user) {
                return (
                    <ul className='nav navbar-nav navbar-right'>
                        <li><Link to={`/user/${user.name}`}>Welcome, {user.name}</Link></li>
                        <li ><a href='/logout'>logout <span class='badge'></span></a></li>
                    </ul>
                );
            } else {
                return (
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <Link to='/login'>login</Link>
                        </li>
                    </ul>
                )
            }
        };

        return (
            <nav className='navbar navbar-default'>
                <div className='container'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <Link className='navbar-brand' to='/?p=1'>Home</Link>
                    </div>
                    <div id='navbar' className='collapse navbar-collapse'>
                        <ul className='nav navbar-nav'>
                            <li>
                                <Link to='/history'>History</Link>
                            </li>
                            <li>
                                <Link to='/test'>題目列表</Link>
                            </li>
                        </ul>
                        <form className='navbar-form navbar-left' action='/search' method='GET' id='searchbar'>
                            <div className='form-group has-success'>
                                <input type='text' name='keyword' className='form-control' placeholder='Search' autoComplete='off'></input>
                            </div>
                        </form>
                        {userStatus()}
                    </div>
                </div>
            </nav>
        );
    }
}
