'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class history extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts:[]};
    }

    componentDidMount() {
        document.title = 'History';
        $.ajax({
            url: 'api/history',
            method: 'GET'
        }).done((data) => {
            console.log('history data:', data);
            this.setState({posts: data});
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    render() {

        let historyList = this.state.posts.map((post, index) => {
            return(
                <div className='well'>
                    <h3><Link to={`/u/${post.name}/${post.time.day}/${post.title}`}>{post.title}</Link></h3>
                    <p className='grey'>{post.time.date} - {post.name}</p>
                </div>
            );
        });

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            {historyList}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
