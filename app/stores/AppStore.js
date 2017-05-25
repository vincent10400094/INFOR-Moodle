'use strice'

import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
    constructor() {
        this.bindActions(AppActions);
        this.user = {message:[]};
        this.flash = {};
    }

    onGetSessionSuccess(data) {
        this.user = data.user;
        // console.log('on get session success')
    }

    onGetSessionFail(jqXhr) {
        toastr.error(jqXhr.responseJSON.message);
    }

}

export default alt.createStore(AppStore);