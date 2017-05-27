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
        // console.log('did');
    }

    componentWillUnmount() {
        PostListStore.unlisten(this.onChange);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log('list will update')
        // console.log('this page:', this.props.page)
        // console.log('next page:', nextProps.page)
        PostListActions.getPost(nextProps.page);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('next', nextState);
        // console.log('this', this.state);
        // console.log('should', nextState.page !== this.state.page)
        // console.log('next posts', nextState.posts)
        // console.log('this posts', this.state.posts)
        return !isEqual(nextState.posts, this.state.posts) || nextProps.page != this.props.page;
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        // console.log('list page:', this.props.page);
        // console.log('list store', this.state.posts);
        let page = this.props.page;
        let total = this.state.total;

        let postList = this.state.posts.map((post, index) => {
            let markup
            let d = new Date(post.time.date)
            if (post.post) {
                markup = post.post.split(/\s+</)[0];
            }
            let link = `/u/${post.name}/${post.time.day}/${post.title}`
            return (
                <div className='well' >
                    <h3>
                        <span className='grey'>
                            <Link to={link}>{post.title}</Link>
                        </span>
                    </h3>
                    <p className='grey'>{d.toLocaleString()} — {post.name}</p>
                    <h4>
                        <div dangerouslySetInnerHTML={{ __html: markup }}></div>
                    </h4>
                    <span><Link to={link}>繼續閱讀</Link></span>
                    <p style={{ marginTop: '10px' }}>
                        <span className='glyphicon glyphicon-thumbs-up grey' style={{ paddingRight: '5px' }}></span>{post.starname.length}
                        <span className='fa fa-eye grey' style={{ paddingRight: '5px', paddingLeft: '15px' }}></span>{post.pv}
                    </p>
                </div>
            );
        });

        let footer = [];

        if (total > 1) {
            let thisPage = parseInt(page);
            // console.log('thisPage:', thisPage, typeof thisPage);
            if (page != 1) {
                // let pre = '?p=' + (page - 1).toString();
                footer.push(<li><Link to='/' query={{ p: (thisPage - 1) }} >Previous</Link></li>);
            }
            for (var i = 1; i <= total; i++) {
                // let to = '?p=' + i.toString();
                if (i == thisPage) {
                    footer.push(<li className='active'><Link to='/' query={{ p: i }}>{i}</Link></li>)
                } else {
                    footer.push(<li><Link to='/' query={{ p: i }}>{i}</Link></li>)
                }
            }
            if (page != total) {
                // let next = '?p=' + (page + 1).toString();
                footer.push(<li><Link to='/' query={{ p: (thisPage + 1) }} >Next</Link></li>);
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
