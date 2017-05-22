'use strict'

import React from 'react';
import { Link } from 'react-router';
import PostListActions from '../actions/PostListActions';

export default class article extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { time: {} };
    }

    componentWillMount() {

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
                                <hr />
                                <Link id='fakeButton'>Like</Link>
                            </div>
                        </div>
                        <div className='col-md-5 col-md-offset-1'>
                            <div className='well'>
                                <h4>附件</h4>
                                <hr />
                                <p>無附件</p>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className='well'>
                                <h4>時間</h4>
                                <hr />
                                <p>發布：{this.state.time.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
