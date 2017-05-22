'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        document.title = this.props.params.user;
        $.ajax({
            url: `/api/user/${this.props.params.user}`,
            method: 'GET'
        }).done((data) => {
            console.log('profile data:', data);
            this.setState(data);
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    render() {
        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 col-md-offset-2 well' style={{marginTop:'15%', padding:'40px'}}>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img src={this.state.head} alt="profile photo" className="img-circle" style={{height: '200px', width: '200px'}}/>
                                </div>
                                <div className='col-md-6'>
                                    <h1>{this.state.name}</h1>
                                    <h4>{this.state.email}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
