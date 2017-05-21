import alt from '../alt';

class PostListActions {
  constructor() {
    this.generateActions(
      'getPostListSuccess',
      'getPostListFail'
    );
  }

  getPost(page) {
    $.ajax({ url: '/api/post/' + page })
      .done((data) => {
        //console.log('data: ',data);
        this.getPostListSuccess(data);
      })
      .fail((jqXhr) => {
        this.getPostListFail(jqXhr);
      });
  }

}

export default alt.createActions(PostListActions);