'use strice'

import alt from '../alt';
import PostListActions from '../actions/PostListActions';

class PostListStore {
    constructor() {
        this.bindActions(PostListActions);
        this.posts = [];
        this.total = 0;
    }

    onGetPostListSuccess(data) {
        this.posts = data.posts;
        this.total = data.total
    }

    onGetPostListFail(jqXhr) {
        toastr.error(jqXhr.responseJSON.message);
    }

}

export default alt.createStore(PostListStore);