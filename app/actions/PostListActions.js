import alt from '../alt';
import { browserHistory } from 'react-router'

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
        // console.log('page data: ', data);
        // console.log('data: ',data);
        this.getPostListSuccess(data);
      })
      .fail((jqXhr) => {
        this.getPostListFail(jqXhr);
      });
  }

  removePost(name, day, title) {
    // console.log('remove post: ', name, day, title)
    $.ajax({
      type: 'post',
      url: `/api/remove/${name}/${day}/${title}`
    })
      .done((data) => {
        //console.log('data: ',data);
        // console.log('remove post success')
        browserHistory.push('/')
      })
      .fail((jqXhr) => {
        // console.log('remove post fail')
      });
  }

  editPost(name, day, title) {
    let content = CKEDITOR.instances.editor_edit.getData()
    // console.log('edit post: ', name, day, title)
    $.ajax({
      type: 'post',
      url: `/api/edit/${name}/${day}/${title}`,
      data: {content:content}
    })
      .done((data) => {
        //console.log('data: ',data);
        // console.log('edit post success')
        browserHistory.push(`/u/${name}/${day}/${title}`)
      })
      .fail((jqXhr) => {
        // console.log('edit post fail')
      });
  }

}

export default alt.createActions(PostListActions);