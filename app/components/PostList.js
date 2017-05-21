'use strict'

import React from 'react';
import Post from './Post';
import { isEqual } from 'underscore';
import { Link } from 'react-router';
import PostListActions from '../actions/PostListActions';
import PostListStore from '../stores/PostListStore'

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = PostListStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        PostListStore.listen(this.onChange);
        PostListActions.getPost(this.props.page);
    }

    componentWillUnmount() {
        PostListStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.page, this.props.page)) {
            PostListActions.getPosts(this.props.page);
        }
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        console.log('list page:', this.props.page);
        console.log('list store', this.state.posts);
        let postList = this.state.posts.map((post, index) => {
            return (
                <div className='well' >
                    <h3>
                        <span className='grey'>
                            <Link to=''>{post.title}</Link>
                        </span>
                    </h3>
                    <p className='grey'>{post.time.date} — {post.name}</p>
                    <h4>
                        <p>post.post</p>
                    </h4>
                    <span><Link to=''>繼續閱讀</Link></span>
                    <p>
                        <span className='glyphicon glyphicon-thumbs-up grey'></span>5
                    <span className='fa fa-eye grey'></span>5
                </p>
                </div>
            );
        });
        return (
            <div>
                {postList}
            </div>
        );
    }
}
