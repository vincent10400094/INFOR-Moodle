import alt from '../alt';

class AddCharacterActions {
  constructor() {
    this.generateActions(
      'addCharacterSuccess',
      'addCharacterFail',
      'updateName',
      'updateGender',
    );
  }

  addCharacter(password, email) {
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: { password: password, email: email }
    })
      .done((data) => {
        this.actions.addCharacterSuccess();
      })
      .fail((jqXhr) => {
        this.actions.addCharacterFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddCharacterActions);