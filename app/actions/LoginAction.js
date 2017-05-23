import alt from '../alt';

class LoginAction {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFailed',
      'updatePassword',
      'updateUsername'
    );
  }

  addCharacter(username, password) {
    $.ajax({
      type: 'get',
      url: '/api/login',
      data: { password: password, username: username }
    })
      .done((data) => {
        console.log(data);
      })
      .fail((jqXhr) => {
        this.LoginFailed(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LoginAction);