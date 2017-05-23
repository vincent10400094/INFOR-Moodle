import alt from '../alt';
import { browserHistory } from 'react-router'

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
      type: 'post',
      url: '/api/login',
      data: {username: username, password: password}
    })
      .done((data) => {
        console.log(data);
        if(data){
          browserHistory.push('/')
        }else{
          browserHistory.push('/login')
        }
      })
      .fail((jqXhr) => {
        this.LoginFailed(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LoginAction);