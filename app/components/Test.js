'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state = { docs: [] }
    }

    componentDidMount() {
        // console.log('tag:', this.props.params.tag)
        $.ajax({
            url: '/api/test/',
            method: 'GET'
        }).done((data) => {
            console.log('test data: ', data)
            this.setState({ docs: data })
        }).fail((jqXhr) => {
            console.log(jqXhr);
            toastr['error']('<h3>發生錯誤</h3>')
        });
    }

    render() {

        console.log('state', this.state)
        let testList = this.state.docs.map((doc, index) => {
            return (
                <tr className='success'>
                    <td><span className='btn'>{index + 1}</span></td>
                    <td>
                        <Link to='/Linknsform/<%= doc.name %>' className='btn btn-primary'>
                            {doc.name}
                        </Link>
                    </td>
                    <td>
                        <Link to='/user/<%= doc.username %>' className='btn btn-primary'>
                            {doc.username}
                        </Link>
                    </td>

                    <td><Link to='/rank/<%= doc.name %>' className='btn btn-raised btn-primary btn-xs'> 排行榜 </Link></td>
                </tr>
            )
        })

        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <table className='table table-striped table-hover '>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>出題者</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}