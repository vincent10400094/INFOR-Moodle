'use strict'

import React from 'react';
import Post from './Post';
import {isEqual} from 'underscore';
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
        console.log(this.props.page);
        console.log(this.state);
        let postList = this.state.posts.map((post, index) => {
            return (
                <Post></Post>
            );
        });
        return (
            <div>
                {postList}
            </div>
        );
    }
}
