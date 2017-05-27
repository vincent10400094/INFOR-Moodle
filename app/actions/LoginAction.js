import alt from '../alt';
import { browserHistory } from 'react-router'
import AppActions from './AppActions'

class LoginAction {
  constructor() {
    this.generateActions(
      'loginFailed',
      'updatePassword',
      'updateUsername',
      'clearInput',
      'updateSignupUsername',
      'updateSignupEmail',
      'updateSignupPassword',
      'updateSignupPasswordConfirm',
      'clearSignupInput'
    );
  }

  login(username, password) {
    // console.log('login post', username, password)
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: { username: username, password: password }
    })
      .done((data) => {
        // console.log('login back data', data)
        if (data.success) {
          this.clearInput();
          AppActions.getSession();
          browserHistory.push('/')
          toastr["success"](`<h3>登入成功</h3>`)
        }else {
          this.clearInput()
        browserHistory.push('/login')
        $('#inputUsername').focus();
        toastr.options = {
          "preventDuplicates": true,
        }
        toastr["error"](`<h3>登入失敗</h3>`)
        }
      })
      .fail((jqXhr) => {
        this.clearInput()
        browserHistory.push('/login')
        $('#inputUsername').focus();
        toastr.options = {
          "preventDuplicates": true,
        }
        toastr["error"](`<h3>登入失敗</h3>`)
      });
  }

  signup(username, email, password, passwordConfirm) {
    if (password.length > 7) {
      if (password == passwordConfirm) {
        $.ajax({
          type: 'post',
          url: '/api/signup',
          data: { username: username, password: password, email: email }
        })
          .done((data) => {
            // console.log('signup data', data);
            this.clearSignupInput();
            AppActions.getSession();
            browserHistory.push('/')
            toastr["success"]("<h3>註冊成功</h3>")
          })
          .fail((jqXhr) => {
            this.clearSignupInput()
            browserHistory.push('/signup')
            $('#inputUsername').focus();
            toastr.options = {
              "preventDuplicates": true,
            }
            toastr["error"]("<h3>伺服器錯誤</h3>")
          });
      } else {
        toastr.options = {
          "preventDuplicates": true,
        }
        $('#confirmPassword').focus()
        toastr["error"]("<h3>密碼與確認密碼不相符</h3>")
      }
    } else {
      toastr["error"]("<h3>密碼至少需包含8個字元</h3>")
    }

  }

}

export default alt.createActions(LoginAction);