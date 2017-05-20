'use strict'

import React from 'react';
import Article from './Article';
import Bar from './Bar';
import { Link } from 'react-router';

export default class Home extends React.Component {
    render() {
        const displayNone = {
            display: 'none'
        }
        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 col-md-offset-2'>
                            <Bar></Bar>
                        </div>
                        <div className='col-md-8 col-md-offset-2'>
                            <Article></Article>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
