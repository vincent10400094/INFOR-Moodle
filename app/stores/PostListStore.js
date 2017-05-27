'use strice'

import alt from '../alt'
import PostListActions from '../actions/PostListActions'

class PostListStore {
    constructor() {
        this.bindActions(PostListActions)
        this.posts = []
        this.total = 0
        this.page = 0
    }

    onGetPostListSuccess(data) {
        this.posts = data.posts
        this.total = data.total
        this.page = data.page
    }

    onGetPostListFail(jqXhr) {
        toastr["error"]("<h3>發生錯誤</h3>")
    }

}

export default alt.createStore(PostListStore)