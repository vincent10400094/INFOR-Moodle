'use strict'

import React from 'react';
import {Link} from 'react-router';

export default class Signup extends React.Component {
    render() {
        return (
        <section id='main'>
           <div className='container'>
              <div className='row'>
                <div className='col-md-4 col-md-offset-4'>
                <form className='form-horizontal well' id='login' method='post'>
                   <fieldset>
                      <legend>Signup</legend>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='text' className='form-control' id='inputUsername' placeholder='Username' name='name' autoComplete='off' autoFocus='true'></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='text' className='form-control' id='inputEmail' placeholder='Email' name='email' autoComplete='off'></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='password' className='form-control' id='inputPassword' placeholder='Password' name='password' autoComplete='off'></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='password' className='form-control' id='confirmPassword' placeholder='Confirm Password' name='password-confirm' autoComplete='off'></input>
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
