import alt from '../alt';
import { browserHistory } from 'react-router'

class LoginAction {
  constructor() {
    this.generateActions(
      'loginFailed',
      'updatePassword',
      'updateUsername',
      'clearInput'
    );
  }

  addCharacter(username, password) {
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: { username: username, password: password }
    })
      .done((data) => {
        console.log('login data', data);
        this.clearInput();
        browserHistory.push('/')
      })
      .fail((jqXhr) => {
        this.clearInput()
        browserHistory.push('/login')
      });
  }
}

export default alt.createActions(LoginAction);