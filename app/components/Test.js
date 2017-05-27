'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log('tag:', this.props.params.tag)
        $.ajax({
            url: '/api/test/',
            method: 'GET'
        }).done((data) => {
            console.log('test data: ', data);
        }).fail((jqXhr) => {
            console.log(jqXhr);
            toastr["error"]("<h3>發生錯誤</h3>")
        });
    }

    render() {

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <h3>test</h3>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
