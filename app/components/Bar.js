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

        $.material.init();
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
                            <Button onClick={this.closePaper} >Cancel</Button>
                            <Button type='submit' className='btn btn-primary'>Post</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal show={this.state.newPaper} onHide={this.closePaper}>
                    <Modal.Body>
                        <h3>自訂考卷</h3>
                        <form action='/newtest'>
                            <div className='form-group is-empty'>
                                <input type='text' name='title' className='form-control' autoComplete='off' placeholder='考卷名稱'></input>
                            </div>
                            <div className='form-group'>
                                <label>選擇科目</label>
                                <div className='radio radio-primary'>
                                    <label dangerouslySetInnerHTML={{ __html: '<input type="radio" name="subject" value="chinese" id="radio1">國文' }}>
                                    </label>
                                </div>
                                <div className='radio radio-primary'>
                                    <label dangerouslySetInnerHTML={{ __html: '<input type="radio" name="subject" value="english" id="radio1">英文' }}>
                                    </label>
                                </div>
                                <div className='radio radio-primary'>
                                    <label dangerouslySetInnerHTML={{ __html: '<input type="radio" name="subject" value="math" id="radio1">數學' }}>
                                    </label>
                                </div>
                                <div className='radio radio-primary'>
                                    <label dangerouslySetInnerHTML={{ __html: '<input type="radio" name="subject" value="science" id="radio1">自然' }}>
                                    </label>
                                </div>
                                <div className='radio radio-primary'>
                                    <label dangerouslySetInnerHTML={{ __html: '<input type="radio" name="subject" value="society" id="radio1">社會' }}>
                                    </label>
                                </div>
                                <Modal.Footer>
                                    <Button onClick={this.closePaper} >Cancel</Button>
                                    <Button type='submit' className='btn btn-primary'>新增</Button>
                                </Modal.Footer>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}
