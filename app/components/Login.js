'use strict'

import React from 'react';
import {Link} from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = 'Login';
    }

    render() {
        return (
        <section id='main'>
           <div className='container'>
              <div className='row'>
                 <div className='col-md-4 col-md-offset-4'>
                    <form className='form-horizontal well' id='login' method='post'>
                       <fieldset>
                          <legend>Login</legend>
                          <div className='form-group'>
                             <div className='col-md-12'>
                                <input type='text' className='form-control' id='inputUsername' placeholder='Username' name='name' autoComplete='off' autoFocus='true'></input>
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
