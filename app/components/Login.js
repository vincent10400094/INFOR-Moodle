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
        $('#inputUsername').focus()
    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        var username = this.state.login.username
        var password = this.state.login.password;
        console.log('onSubmit: ', this.state);
        LoginAction.login(username, password);
    }

    render() {

        let errorMessage = [];
        if(this.state.errorMessage) {
            <div className='col-md-4 col-md-offset-4 '>
              <div className='alert alert-dismissible alert-danger'>
                 <button type='button' className='close' data-dismiss='alert'>×</button>
                 {this.state.errorMessage}
              </div>
          </div>
        }

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        {errorMessage}
                        <div className='col-md-4 col-md-offset-4' style={{marginTop:'10%'}}>
                            <form className='form-horizontal well' id='login' method='post' onSubmit={this.handleSubmit.bind(this)}>
                                <fieldset>
                                    <legend>Login</legend>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <input type='text' className='form-control' id='inputUsername' placeholder='Username' name='username' autoComplete='off' value={this.state.login.username} onChange={LoginAction.updateUsername}></input>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <input type='password' className='form-control' id='inputPassword' placeholder='Password' name='password' autoComplete='off' value={this.state.login.password} onChange={LoginAction.updatePassword}></input>
                                        </div>
                                    </div>
                                    <p>Need an account ? <Link to='/signup'>Signup</Link></p>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <button type='submit' className='btn btn-default btn-block' value='login'>Login</button>
                                        </div>
                                        <div className='col-md-12'>
                                            <a href='/auth/facebook' className='btn btn-primary btn-block'>Facebook</a>
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
