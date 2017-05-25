'use strice'

import alt from '../alt';
import PostActions from '../actions/PostActions';

class PostStore {
    constructor() {
        this.bindActions(PostActions);
        this.title = '';
        this.editor = '';
        this.tags = '';
        this.files = '';
    }

    onUpdateTitle(event) {
        // console.log('update title', event.target.value)
        this.title = event.target.value;
        // console.log('state', this)
    }

    onUpdateTags(event) {
        // console.log('update tags', event.target.value)
        this.tags = event.target.value;
    }

    onUpdateFiles(fileName) {
        // console.log('update files', fileName)
        this.files = this.files + ',' + fileName;
        // console.log('updated files:',this.files)
    }

    onRefresh() {
        this.title = '';
        this.editor = '';
        this.tags = '';
        this.files = '';
    }

}

export default alt.createStore(PostStore);