'use strict'

import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../actions/PostListActions';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions'

export default class article extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.state = { time: {}, tags: [], file: [], comments: [], session: { user: {} } };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleCommentChange = this.handleCommentChange.bind(this)
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
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
            // console.log('article data:', data);
            this.setState(data);
        }).fail((jqXhr) => {
            // console.log(jqXhr);
        });
        AppStore.listen(this.onChange)
        AppActions.getSession()

        console.log('mount', $('textarea'))
        $('textarea').keydown(function (event) {
            if (event.keyCode == 13) {
                $('#submitButton').click()
                return false
            }
            // console.log('code', event.keyCode)
        })
    }

    onChange(state) {
        // console.log('onchange jizz', state);
        this.setState({ session: state });
    }

    submit(e) {
        e.preventDefault()
        let params = this.props.params
        let content = this.state.commentTMP
        let comments = this.state.comments
        this.state.commentTMP = ''
        console.log('handle comment')
        $.ajax({
            url: `/api/comment/${params.user}/${params.time}/${params.title}`,
            method: 'POST',
            data: { content: content }
        }).done((data) => {
            // console.log('article data:', data);
            comments.push(data.comment)
            this.setState({comments: comments})
        }).fail((jqXhr) => {
            console.log('fail', jqXhr)
            // console.log(jqXhr);
        });
    }

    handleCommentChange(event) {
        console.log('comment change', event.target.value)
        this.state.commentTMP = event.target.value
    }

    render() {
        let params = this.props.params;
        // console.log('state: ', this.state);

        let tags = this.state.tags.map((tag, index) => {
            return (
                <b><span><Link to={`/tags/${tag}`} style={{ paddingRight: '5px' }}>#{tag}</Link></span></b>
            );
        });

        var files = [];
        // console.log('atatch file', this.state.file.length)
        if (this.state.file.length > 1) {
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
                        <hr style={{ margin: '1px' }} />
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

        let state = this.state;
        // console.log('control panel', state)

        function controlPanel() {
            if (state.name == state.session.user.name) {
                return (
                    <div>
                        <span> <Link className='edit' to={`/u/${params.user}/${params.time}/${params.title}/edit`}>編輯</Link></span>
                        <span> <a className='remove' onClick={PostListActions.removePost.bind(state, state.name, state.time.day, state.title)} >刪除</a></span>
                        <span className='grey' style={{ float: 'right', marginBottom: '5px' }}>瀏覽次數：{state.pv}</span>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <span> <a className='edit' >轉載</a></span>
                        <span className='grey' style={{ float: 'right', marginBottom: '5px' }}>瀏覽次數：{state.pv}</span>
                    </div>
                )
            }
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
                                {controlPanel()}
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
                                    {comments}
                                    <div className='list-group-item' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        <div className='row-picture'>
                                            <img className='circle' src={this.state.session.user.head} alt='icon' />
                                        </div>
                                        <div className='row-content'>
                                            <form onSubmit={this.submit}>
                                                <textarea className='form-control' rows='1' id='textArea' name='content' placeholder='Leave a comment' value={this.state.commentTMP} onChange={this.handleCommentChange}></textarea>
                                                <button type="submit" id='submitButton' style={{ display: 'none' }}>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
