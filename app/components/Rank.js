'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state = { rank: [] }
    }

    componentDidMount() {
        // console.log('tag:', this.props.params.tag)
        document.title = '排行榜'
        let title = this.props.params.title
        $.ajax({
            url: '/api/rank/' + title,
            method: 'GET'
        }).done((data) => {
            console.log('rank data: ', data)
            this.setState({ rank: data })
        }).fail((jqXhr) => {
            console.log(jqXhr);
            toastr['error']('<h3>發生錯誤</h3>')
        });
    }

    render() {

        console.log('state', this.state)
        let rankList = this.state.rank.map((data, index) => {
            return (
                <tr>
                    <th>{index + 1}</th>
                    <td><Link to={`/user/${data.username}`}>{data.username}</Link></td>
                    <td>{data.correct / data.testsum}</td>
                    <td>{data.day}</td>
                </tr>
            )
        })

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <h3>Rank</h3>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>使用者</th>
                                        <th>答對數</th>
                                        <th>時間</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
