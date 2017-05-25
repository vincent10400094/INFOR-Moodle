'use strict'

import React from 'react';
import PostListActions from '../actions/PostListActions';
import Button from 'react-bootstrap/lib/Button'

export default class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, tags: [], file: [], comments: [], user: {} };
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount() {
        let params = this.props.params;
        document.title = 'Edit ' + this.props.params.title;
        $.ajax({
            url: `/api/u/${params.user}/${params.time}/${params.title}`,
            method: 'GET'
        }).done((data) => {
            console.log('edit article data:', data);
            this.setState(data);
        }).fail((jqXhr) => {
            console.log(jqXhr);
        });
    }

    componentDidUpdate() {
        CKEDITOR.replace('editor_edit');
    }

    handleEdit() {
        PostListActions.editPost(this.state.name, this.state.time.day, this.state.title);
    }

    render() {
        return (
            <section id='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                            <div className='well'>
                                <div className='form-group'>
                                    <input type='text' name='title' className='form-control' autoComplete='off' value={this.state.title}></input>
                                </div>
                                <div className='form-group'>
                                    <textarea type='text' name='editor_edit' className='form-control' placeholder='Page Body' rows='20' cols='100' value={this.state.post}></textarea>
                                </div>
                                <div className='form-group'>
                                    <label>Tags</label>
                                    <input type='text' name='tags' className='form-control' placeholder='Use # to add tags' autoComplete='off' value={'#' + this.state.tags.join(' #')}></input>
                                </div>
                                <Button className='btn btn-primary' onClick={this.handleEdit}>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
