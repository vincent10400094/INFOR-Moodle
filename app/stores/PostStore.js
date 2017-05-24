'use strice'

import alt from '../alt';
import PostActions from '../actions/PostActions';

class PostStore {
    constructor() {
        this.bindActions(PostActions);
        this.title = '';
        this.editor = '';
        this.tags = '';
    }

    onUpdateTitle(event) {
        console.log('update title', event.target.value)
        this.title = event.target.value;
    }

    onUpdateTags(event) {
        console.log('update tags', event.target.value)
        this.tags = event.target.value;
    }

}

export default alt.createStore(PostStore);