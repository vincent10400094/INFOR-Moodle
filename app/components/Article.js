'use strict'

import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../actions/PostListActions';

export default class article extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { time: {}, tags: [], file: [], comments: [] };
    }

    componentWillMount() {

    }

    componentDidUpdate() {
        $.material.init();
    }

    componentDidMount() {
        let params = this.props.params;
        document.title = this.props.params.title;
        $.ajax({
            url: `/api/u/${params.user}/${params.time}/${params.title}`,
            method: 'GET'
        }).done((data) => {
            console.log('article data:', data);
            this.setState(data);
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    render() {
        let params = this.props.params;
        console.log('state: ', this.state);

        let tags = this.state.tags.map((tag, index) => {
            return (
                <b><span><Link to={`/tags/${tag}`} style={{ paddingRight: '5px' }}>#{tag}</Link></span></b>
            );
        });

        var files = [];

        if (this.state.file.length - 1) {
            files = this.state.file.map((file, index) => {
                if (index) {
                    return (
                        <div>
                            <div className='media-left media-middle'>
                                <img src={`/icon/${file.split('.')[file.split('.').length - 1].toLowerCase()}.png`} style={{ height: '35px', width: 'auto', paddingRight: '10px' }} />
                            </div>
                            <div className='media-body media-middle'>
                                {file}
                            </div>
                            <div className='media-right media-middle'>
                                <a href={`/files/${file}`} download className='btn btn-default glyphicon glyphicon-download-alt file-btn'></a>
                                <a href={`/files/${file}`} className='btn btn-default fa fa-eye file-btn' target='_blank'></a>
                            </div>
                            <br />
                        </div>
                    );
                }
            });
        } else {
            files.push(
                <p>無附件</p>
            );
        }

        var comments = [];

        if (this.state.comments.length) {
            comments = this.state.comments.map((comment, index) => {
                return (
                    <div>
                        <hr style={{margin: '1px'}} />
                        <div className='list-group-item' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                            <div className='row-picture'>
                                <img className='circle' src={comment.head} alt='icon' />
                            </div>
                            <div className='row-content'>
                                <span style={{ marginBottom: '0px', fontSize: '19px' }}><Link to={`/user/${comment.name}`}>{comment.name}</Link></span>
                                <p className='list-group-item-text' style={{ fontSize: '16px' }}>{comment.content}</p>
                                <small className='grey' style={{ paddingLeft: '5px' }}>{comment.time}</small>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        let d = new Date(this.state.time.date);

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <div>
                                <h1>{params.title}</h1>
                                <p className='lead'>by <Link to={`/user/${params.user}`}>{this.state.name}</Link></p>
                            </div>
                            <div className='well'>
                                <span> <Link className='edit' to={`/edit/${params.user}/${params.time}/${params.title}`}>編輯</Link></span>
                                <span> <a className='remove' onClick={PostListActions.removePost.bind(this, this.state.name, params.time, params.title)} >刪除</a></span>
                                <span className='grey' style={{ float: 'right', marginBottom: '5px' }}>瀏覽次數：{this.state.pv}</span>
                                <hr />
                                <div dangerouslySetInnerHTML={{ __html: this.state.post }}></div>
                                {tags}
                                <hr />
                                <Link id='fakeButton'>Like</Link>
                            </div>
                        </div>
                        <div className='col-md-5 col-md-offset-1'>
                            <div className='well'>
                                <h4>附件</h4>
                                <hr />
                                <p>{files}</p>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className='well'>
                                <h4>時間</h4>
                                <hr />
                                <p>發布：{d.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='col-md-10 col-md-offset-1'>
                            <div className='well' style={{ paddingBottom: '10px', paddingTop: '10px' }}>
                                <div className='list-group'>
                                    <div className='list-group-item' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <div className='row-picture'>
                                            <img className='circle' src={this.state.head} alt='icon' />
                                        </div>
                                        <div className='row-content'>
                                            <form method='post'>
                                                <textarea className='form-control' rows='1' id='textArea' name='content' placeholder='Leave a comment'></textarea>
                                            </form>
                                        </div>
                                    </div>
                                    {comments}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
