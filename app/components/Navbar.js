'use strict'

import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
    render() {
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
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to='/login'>login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
