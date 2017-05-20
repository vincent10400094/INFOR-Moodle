'use strict'

import React from 'react';
import { Link } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { newPost: false, newPaper: false };
        this.openPost = this.openPost.bind(this);
        this.closePost = this.closePost.bind(this);
        this.openPaper = this.openPaper.bind(this);
        this.closePaper = this.closePaper.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    closePost() {
        this.setState({ newPost: false });
    }

    openPost() {
        this.setState({ newPost: true });
    }

    closePaper() {
        this.setState({ newPaper: false });
    }

    openPaper() {
        this.setState({ newPaper: true });
    }

    componentDidMount() {
        // CKEDITOR.replace('editor1');
    }

    render() {
        const display_none = {
            display: 'none'
        }
        return (
            <div className='btn-group btn-group-justified btn-group-raised'>
                <a className='btn' id='custom-btn' onClick={this.openPost}>發文</a>
                <Link to='/pdfUpload' className='btn' id='custom-btn'>新增題目</Link>
                <a className='btn' id='custom-btn' onClick={this.openPaper}>自訂考卷</a>
                <Modal show={this.state.newPost} onHide={this.closePost}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write Post</Modal.Title>
                    </Modal.Header>
                    <form action='/post'>
                        <Modal.Body>
                            <div className='form-group label-floating'>
                            <label className='control-label'>Title</label>
                            <input type='text' name='title' className='form-control' autoComplete='off'></input>
                        </div>
                        <div className='form-group'>
                            <textarea type='text' name='editor1' className='form-control' placeholder='Page Body' rows='20' cols='100'></textarea>
                        </div>
                        <div className='form-group'>
                            <label>Tags</label>
                            <input type='text' name='tags' className='form-control' placeholder='Use # to add tags' autoComplete='off'></input>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closePost} className='btn btn-default'>Cancel</Button>
                            <Button type='submit' classnames='btn btn-primary'>Post</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal show={this.state.newPaper} onHide={this.closePaper}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>new paper</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closePaper}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
