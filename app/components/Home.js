'use strict'

import React from 'react';
import PostList from './PostList';
import Bar from './Bar';
import { Link } from 'react-router';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = 'Home';
    }

    render() {
        console.log(this.props.location.query);
        let page = this.props.location.query.p;
        console.log('page', page);
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
                            <PostList page={page}></PostList>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
