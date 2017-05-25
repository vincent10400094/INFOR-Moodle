import alt from '../alt';
import { browserHistory } from 'react-router';
import PostListActions from '../actions/PostListActions';

class PostAction {
    constructor() {
        this.generateActions(
            'updateTitle',
            'updateTags',
            'updateFiles',
            'refresh'
        );
    }

    handlePost(title, tags, files) {
        let content = CKEDITOR.instances.editor1.getData();
        var data = { title: title, tags: tags, content: content, files: files }
        console.log('on post data: ', data);
        $.ajax({
            type: 'post',
            url: '/api/post',
            data: data
        })
            .done((data) => {
                console.log('post success', data);
                // this.clearInput();
                PostListActions.getPost();
            })
            .fail((jqXhr) => {
                // this.clearInput()
                browserHistory.push('/')
            });
    }
}

export default alt.createActions(PostAction);