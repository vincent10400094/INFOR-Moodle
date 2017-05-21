import alt from '../alt';
import LoginAction from '../actions/LoginAction';

class AddCharacterStore {
  constructor() {
    this.bindActions(LoginAction);
    this.password = '';
    this.email = '';

  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

}

export default alt.createStore(AddCharacterStore);