'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class TagPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        console.log('tag:', this.props.params.tag)
        $.ajax({
            url: '/api/tags/' + this.props.params.tag,
            method: 'GET'
        }).done((data) => {
            console.log('tag page data:', data);
            document.title = data.tag;
            this.setState({ posts: data.posts, tag: data.tag });
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    render() {
        let tagSerachResult = this.state.posts.map((post, index) => {
            return (
                <div className='well'>
                    <h3><Link to={`/u/${post.name}/${post.time.day}/${post.title}`}>{post.title}</Link></h3>
                    <p className='grey'>{post.time.date} - {post.name}</p>
                </div>
            );
        });

        console.log('tag search result', tagSerachResult)

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <h3 style={{marginBottom:'30px'}}>articles tagged with {this.state.tag}</h3>
                            {tagSerachResult}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
