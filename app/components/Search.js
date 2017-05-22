'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        $.ajax({
            url: 'api/search?keyword=' + this.props.location.query.keyword,
            method: 'GET'
        }).done((data) => {
            console.log('search data:', data);
            document.title = data.keyword;
            this.setState({ posts: data.posts, keyword: data.keyword });
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    render() {
        let serachResult = this.state.posts.map((post, index) => {
            return (
                <div className='well'>
                    <h3><Link to={`/u/${post.name}/${post.time.day}/${post.title}`}>{post.title}</Link></h3>
                    <p className='grey'>{post.time.date} - {post.name}</p>
                </div>
            );
        });

        if(!serachResult.length){
            serachResult.push(
                <div className='well'>
                    <h3>No results match "{this.state.keyword}"</h3>
                </div>
            );
        }

        console.log('search result', serachResult)

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            {serachResult}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
