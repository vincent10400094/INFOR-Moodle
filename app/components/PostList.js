'use strict'

import React from 'react';
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
        console.log('did');
    }

    componentWillUnmount() {
        PostListStore.unlisten(this.onChange);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log('next',typeof nextProps.page, nextProps.page);
    //     // console.log('this',typeof this.props.page, this.props.page);
    //     console.log('should',nextProps.page !== this.props.page)
    //     return nextProps.page !== this.props.page;
    // }

    // componentWillReceiveProps(nextProps, nextState) {
    //     console.log('next: ', nextProps.page, typeof nextProps.page);
    //     PostListActions.getPost(nextProps.page);
    //     this.forceUpdate();
    // }

    // componentDidUpdate() {
    //     console.log('update');
    // }

    onChange(state) {
        this.setState(state);
    }

    // getPage() {
    //     PostListActions.getPost(this.props.page);
    // }

    render() {
        // console.log('list page:', this.props.page);
        // console.log('list store', this.state.posts);
        let page = this.props.page;
        let total = this.state.total;
        

        let postList = this.state.posts.map((post, index) => {
            let markup = post.post;
            let link = `/u/${post.name}/${post.time.day}/${post.title}`
            return (
                <div className='well' >
                    <h3>
                        <span className='grey'>
                            <Link to={link}>{post.title}</Link>
                        </span>
                    </h3>
                    <p className='grey'>{post.time.date} — {post.name}</p>
                    <h4>
                        <div dangerouslySetInnerHTML={{ __html: markup }}></div>
                    </h4>
                    <span><Link to={link}>繼續閱讀</Link></span>
                    <p>
                        <span className='glyphicon glyphicon-thumbs-up grey'></span>5
                    <span className='fa fa-eye grey'></span>5
                </p>
                </div>
            );
        });

        let footer = [];

        if (total > 1) {
            if (page != 1) {
                // let pre = '?p=' + (page - 1).toString();
                footer.push(<li><Link to='/' query={{ p: (page - 1) }} >Previous</Link></li>);
            }
            for (var i = 1; i <= total; i++) {
                // let to = '?p=' + i.toString();
                footer.push(<li><Link to='/' query={{ p: i }}>{i}</Link></li>)
            }
            if (page != total) {
                // let next = '?p=' + (page + 1).toString();
                footer.push(<li><Link to='/' query={{ p: (page + 1) }} >Next</Link></li>);
            }
        }

        return (
            <div>
                {postList}
                <div className='col-md-9 col-md-offset-3'>
                    <ul className='pagination pagination-lg'>
                        {footer}
                    </ul>
                </div>
            </div>
        );
    }
}
