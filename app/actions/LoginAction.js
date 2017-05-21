import alt from '../alt';

class LoginAction {
  constructor() {
    this.generateActions(
      'LoginSuccess',
      'LoginFailed'
    );
  }

  addCharacter(password, email) {
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: { password: password, email: email }
    })
      .done((data) => {
        this.LoginSuccess();
      })
      .fail((jqXhr) => {
        this.LoginFailed(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LoginAction);