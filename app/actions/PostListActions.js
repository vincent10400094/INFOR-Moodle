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
        console.log('page data: ', data);
        console.log('data: ',data);
        this.getPostListSuccess(data);
      })
      .fail((jqXhr) => {
        this.getPostListFail(jqXhr);
      });
  }

  removePost(name, day, title) {

    $.ajax({
      type: 'GET',
      url: '/api/remove/' + name + '/' + day + '/' + title
    })
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