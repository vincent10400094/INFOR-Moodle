'use strict'

import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginAction from '../actions/LoginAction';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        document.title = 'Signup';
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
        let username = this.state.signup.username
        let email = this.state.signup.email
        let password = this.state.signup.password
        let passwordConfirm = this.state.signup.passwordConfirm;
        console.log('onSubmit signup: ', this.state);
        LoginAction.signup(username, email, password, passwordConfirm);
    }

    render() {
        return (
        <section id='main'>
           <div className='container'>
              <div className='row' style={{marginTop:'10%'}}>
                <div className='col-md-4 col-md-offset-4'>
                <form className='form-horizontal well' onSubmit={this.handleSubmit.bind(this)}>
                   <fieldset>
                      <legend>Signup</legend>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='text' className='form-control' id='inputUsername' placeholder='Username' name='name' autoComplete='off' autoFocus='true' value={this.state.signup.username} onChange={LoginAction.updateSignupUsername}></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='email' className='form-control' id='inputEmail' placeholder='Email' name='email' autoComplete='off' value={this.state.signup.email} onChange={LoginAction.updateSignupEmail}></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='password' className='form-control' id='inputPassword' placeholder='Password' name='password' autoComplete='off' value={this.state.signup.password} onChange={LoginAction.updateSignupPassword}></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='password' className='form-control' id='confirmPassword' placeholder='Confirm Password' name='password-confirm' autoComplete='off' value={this.state.signup.passwordConfirm} onChange={LoginAction.updateSignupPasswordConfirm}></input>
                         </div>
                      </div>
                      <p>Already have account ? <Link to='/login'>Login</Link></p>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <button type='submit' className='btn btn-default btn-block' value='login'>Signup</button>
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
