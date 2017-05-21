'use strict'

import React from 'react';
import { Link } from 'react-router';
import AddCharacterStore from '../stores/AddCharacterStore';
import AddCharacterActions from '../actions/AddCharacterActions';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddCharacterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        document.title = 'Login';
        AddCharacterStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddCharacterStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var name = this.state.name.trim();
        var gender = this.state.gender;

        if (!name) {
            AddCharacterActions.invalidName();
            this.refs.nameTextField.focus();
        }

        if (!gender) {
            AddCharacterActions.invalidGender();
        }

        if (name && gender) {
            AddCharacterActions.addCharacter(name, gender);
        }
    }


    render() {
        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 col-md-offset-4'>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <fieldset>
                                    <legend>Login</legend>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                                                onChange={AddCharacterActions.updateName} autoFocus />

                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='col-md-12'>
                                            <input type='text' className='form-control' ref='nameTextField' value={this.state.password}
                                                onChange={AddCharacterActions.updateName} autoFocus />
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
