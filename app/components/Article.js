'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class article extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    componentDidMount() {
        document.title = this.props.params.title;
    }

    render() {
        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 col-md-offset-2'>
                            <p>article</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
