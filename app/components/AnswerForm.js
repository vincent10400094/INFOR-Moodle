'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        console.log('props', this.props)
        let title = this.props.params.title
        $.ajax({
            url: '/api/test/' + title,
            method: 'GET'
        }).done((data) => {
            console.log('ansform data: ', data)
        }).fail((jqXhr) => {
            console.log(jqXhr);
            toastr['error']('<h3>發生錯誤</h3>')
        });
    }

    render() {

        /*console.log('state', this.state)
        let testList = this.state.docs.map((doc, index) => {
            return (
                <tr>
                    <th><span>{index + 1}</span></th>
                    <td><Link to={`/Ansform/${doc.name}`}>{doc.name}</Link></td>
                    <td><Link to={`/user/${doc.username}`}>{doc.username}</Link></td>
                    <td><Link to={`/rank/${doc.name}`}> 排行榜 </Link></td>
                </tr>
            )
        })*/

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <h3>AnswerForm</h3>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
