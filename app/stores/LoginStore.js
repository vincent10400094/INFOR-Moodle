import alt from '../alt';
import LoginAction from '../actions/LoginAction';

class LoginStore {
  constructor() {
    this.bindActions(LoginAction);
    this.login = {}
    this.signup = {username:'', email: '', password: '', passwordConfirm: ''};
  }

  onUpdatePassword (event) {
    console.log('update pass: ', event.target.value)
    this.login.password = event.target.value;
  }

  onUpdateUsername (event) {
    console.log('update name: ', event.target.value)
    this.login.username = event.target.value;
  }

  onUpdateSignupPassword (event) {
    console.log('update pass: ', event.target.value)
    this.signup.password = event.target.value;
  }

  onUpdateSignupPasswordConfirm (event) {
    console.log('update pass confirm: ', event.target.value)
    this.signup.passwordConfirm = event.target.value;
  }
    
  onUpdateSignupUsername (event) {
    console.log('update name: ', event.target.value)
    this.signup.username = event.target.value;
  }

  onUpdateSignupEmail (event) {
    console.log('update email: ', event.target.value)
    this.signup.email = event.target.value;
    console.log('state: ', this)
  }

  onClearInput() {
    this.login.password = '';
    this.login.username = '';
  }

  onClearSignupInput() {
    this.signup.password = '';
    this.signup.passwordConfirm = '';
    this.signup.username = '';
    this.signup.email = '';
  }

}

export default alt.createStore(LoginStore);