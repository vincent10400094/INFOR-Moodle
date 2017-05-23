import alt from '../alt';
import LoginAction from '../actions/LoginAction';

class LoginStore {
  constructor() {
    this.bindActions(LoginAction);
    this.password = '';
    this.username = '';
    this.alertMessage = '';
  }

  onUpdatePassword (event) {
    console.log('update pass: ', event.target.value)
    this.password = event.target.value;
  }

  onUpdateUsername (event) {
    console.log('update name: ', event.target.value)
    this.username = event.target.value;
  }

  onClearInput() {
    this.password = '';
    this.username = '';
  }

  onLoginFailed() {
    this.alertMessage = 'Login failed';
  }

}

export default alt.createStore(LoginStore);