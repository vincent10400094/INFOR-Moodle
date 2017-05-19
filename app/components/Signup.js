import React from 'react';
import {Link} from 'react-router';

class Signup extends React.Component {
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
                            <input type='text' className='form-control' id='inputUsername' placeholder='Username' name='name' autocomplete='off' autofocus=''></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='text' className='form-control' id='inputEmail' placeholder='Email' name='email' autocomplete='off'></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='password' className='form-control' id='inputPassword' placeholder='Password' name='password' autocomplete='off'></input>
                         </div>
                      </div>
                      <div className='form-group'>
                         <div className='col-md-12'>
                            <input type='password' className='form-control' id='confirmPassword' placeholder='Confirm Password' name='password-confirm' autocomplete='off'></input>
                         </div>
                      </div>
                      <p>Already have account ? <a href='/login'>Login</a></p>
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

export default Signup;
