'use strict'

import React from 'react';
import { Link } from 'react-router';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import PostActions from '../actions/PostActions';
import PostStore from '../stores/PostStore';


export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this)
        this.state = { newPost: false, newPaper: false };
        this.openPost = this.openPost.bind(this);
        this.closePost = this.closePost.bind(this);
        this.openPaper = this.openPaper.bind(this);
        this.closePaper = this.closePaper.bind(this);
        this.state.count = 0;
        this.handlePost = this.handlePost.bind(this)
    }

    closePost() {
        this.setState({ newPost: false });
    }

    openPost() {
        this.setState({ newPost: true });
        PostActions.refresh();
    }

    closePaper() {
        this.setState({ newPaper: false });
    }

    openPaper() {
        this.setState({ newPaper: true });
    }

    componetDidMount() {

    }

    componentDidUpdate() {
        // PostActions.refresh();
        if (this.state.newPaper || this.state.newPost) {
            $.material.init();
        }
        if (this.state.newPost) {
            CKEDITOR.replace('editor1')
        }
        this.state.count = 0;
        this.init_elements();
        // console.log('bar update');
    }

    init_elements() {
        $('#fileSelect1').click((event) => {
            event.preventDefault()
            // console.log('fileSelect1 click!', event.target.id)
            $('#fileElem1').click()
        })
    }

    uploadFile(file, id) {
        // console.log('call upload')
        var formData = new FormData();
        formData.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/uploadfile', true);

        let percentage;

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                percentage = (e.loaded / e.total) * 100;
                $('#percentage' + id).css('width', (percentage).toString() + '%');
                // console.log(percentage);
                if (percentage == 100) {
                    $('#progressBar' + id).hide();
                    // console.log('hide: ',id);
                    $('#title' + id).text(file.name);
                }
            }
        };

        xhr.onerror = function (e) {
            console.log('Error');
            console.log(e);
        };

        xhr.onload = function () {
            console.log(this.statusText);
        };

        console.log(formData);
        xhr.send(formData);
    }

    handlePost(event) {
        event.preventDefault();
        if (PostStore.getState().title) {
            let data = PostStore.getState();
            console.log('handlepost')
            console.log('data:', data);
            let title = data.title
            let tags = data.tags;
            let files = data.files;
            // console.log('handle post', this.state)
            PostActions.handlePost(title, tags, files);
            this.closePost()
        }else {
            toastr["error"](`<h3>標題不得為空</h3>`)
        }

    }

    handleFiles(event) {
        // console.log('handle files')
        // console.log(event)
        // console.log($('#fileElem1')[0].files)
        let files = $('#fileElem1')[0].files
        let file = files[0];
        console.log('this.state', this.state)
        let count = this.state.count
        $('#here').append('<p id="title' + count.toString() + '" style="font-size:15px;"></p><div id="progressBar' + count.toString() + '" style="display:none"><div class="bs-component"><div class="progress progress-striped active"><div class="progress-bar" style="width:0%" id="percentage' + count.toString() + '"></div></div></div></div>')
        $('#title' + count.toString()).text('正在上傳 ' + file.name);
        $('#progressBar' + count.toString()).show();
        PostActions.updateFiles(file.name)
        this.uploadFile(file, count.toString());
        this.state.count++;
    }

    render() {
        const display_none = {
            display: 'none'
        }
        return (
            <div className='btn-group btn-group-justified btn-group-raised' style={{ marginBottom: '20px' }}>
                <a className='btn' id='custom-btn' onClick={this.openPost}>發文</a>
                <Link to='/pdfUpload' className='btn' id='custom-btn'>新增題目</Link>
                <a className='btn' id='custom-btn' onClick={this.openPaper}>自訂考卷</a>
                <Modal show={this.state.newPost} onHide={this.closePost}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write Post</Modal.Title>
                    </Modal.Header>
                    <form action='/post' onSubmit={this.handlePost.bind(this)}>
                        <Modal.Body>
                            <div className='form-group label-floating'>
                                <label className='control-label'>Title</label>
                                <input type='text' name='title' className='form-control' autoComplete='off' onChange={PostActions.updateTitle}></input>
                            </div>
                            <div className='form-group'>
                                <textarea type='text' name='editor1' className='form-control' placeholder='Page Body' rows='20' cols='100' onChange={PostActions.updateEditor}></textarea>
                            </div>
                            <div className='form-group'>
                                <label>Tags</label>
                                <input type='text' name='tags' className='form-control' placeholder='Use # to add tags' autoComplete='off' onChange={PostActions.updateTags}></input>
                            </div>
                            <div className='form-group'>
                                <input type='text' name='fileName' id='fileName' style={{ display: 'none' }}></input>
                                <p style={{ fontSize: '15px;' }}>附件</p>
                                <div id='here'>
                                    <p id='title' style={{ fontSize: '15px' }}></p>
                                    <div id='progressBar' style={{ display: 'none' }}>
                                        <div className='bs-component'>
                                            <div className='progress progress-striped active'>
                                                <div className='progress-bar' style={{ width: '0%' }} id='percentage'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id='fileSelect'>
                                    <input type='file' name='file' id='fileElem1' className='form-control' onChange={this.handleFiles} style={{ display: 'none' }}></input>
                                    <a href='#' id='fileSelect1' className='btn' style={{ backgroundColor: '#ddd', textTransform: 'none', width: '100%' }}>+</a>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closePost} >Cancel</Button>
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
