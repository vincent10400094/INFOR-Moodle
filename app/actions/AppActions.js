import alt from '../alt';

class SessionActions {
  constructor() {
    this.generateActions(
      'getSessionSuccess',
      'getSessionFail'
    );
  }

  getSession() {
    $.ajax({ url: '/api/getSession/'})
      .done((data) => {
        console.log('session data: ', data);
        this.getSessionSuccess(data);
      })
      .fail((jqXhr) => {
        this.getSessionFail(jqXhr);
      });
  }

}

export default alt.createActions(SessionActions);