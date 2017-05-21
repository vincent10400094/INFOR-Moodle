'use strict'

import React from 'react';
import { Link } from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginAction from '../actions/LoginAction';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        document.title = 'Login';
        LoginStore.listen(this.onChange);
    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var email = this.state.email
        var password = this.state.password;

        LoginAction.addCharacter(password, email);

    }


    render() {
        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 col-md-offset-4'>
                            <form className='form-horizontal well' id='login' method='post' onSubmit={this.handleSubmit.bind(this)}>
                                <fieldset>
                                    <legend>Login</legend>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <input type='text' className='form-control' id='inputUsername' placeholder='Username' name='name' autoComplete='off' autoFocus=''></input>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <input type='password' className='form-control' id='inputPassword' placeholder='Password' name='password' autoComplete='off'></input>
                                        </div>
                                    </div>
                                    <p>Need an account ? <Link to='/signup'>Signup</Link></p>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <button type='submit' className='btn btn-default btn-block' value='login'>Login</button>
                                        </div>
                                        <div className='col-md-12'>
                                            <a href='/Linkuth/facebook' className='btn btn-primary btn-block'>Facebook</a>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
