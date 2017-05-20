'use strice'

import alt from '../alt';
import PostListActions from '../actions/PostListActions';

class PostListStore {
    constructor() {
        this.bindActions(PostListActions);
        this.posts = [];
    }

    onGetPostListSuccess(data) {
        console.log(data);
        this.posts = data;
    }

    onGetPostListFail(jqXhr) {
        toastr.error(jqXhr.responseJSON.message);
    }

}

export default alt.createStore(PostListStore);