import React, {Component} from 'react';
import Login from '../Login';
import * as UserService from '../../common/services/user';
import {hashHistory} from 'react-router';

export default class StartScreen extends Component {
  constructor(props) {
      super(props);

      this.state = {
        status: 'initial',
        email: '',
        password: ''
      };

      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  handleFieldChange(field, event) {
    var newState = Object.assign({}, this.state);
    newState[field] = event.target.value;
    this.setState(newState);
  }

  handleLogin() {
    var errors = [];
    if (!this.state.email) {
      errors.push('You must specify an email');
    }
    if (!this.state.password) {
      errors.push('You must specify a password');
    }

    if (errors.length > 0) {
      this._showSnackBar(errors.join('.'));
      var newState = Object.assign({}, this.state);
      newState.status = 'login_error';
      this.setState(newState);
    } else {
      this.setState({
        status: 'logging_in'
      });

      var self = this;
      UserService
        .login(this.state.email, this.state.password)
        .then(profile => {
          localStorage['REHACKED_USER_PROFILE'] = JSON.stringify(profile);
          console.log(profile);

          var newState = Object.assign({}, this.state);
          newState.status = 'logged_in';
          self.setState(newState);

          hashHistory.push('/dashboard');
        })
        .catch(error => {
          var newState = Object.assign({}, this.state);
          newState.status = 'login_error';
          self._showSnackBar(error.message);
          self.setState(newState);
        });
    }
  }

  _showSnackBar(message) {
    var data = {
      message: message,
      timeout: 2500
    };
    var snackbarContainer = document.querySelector('#login-snack-bar');
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  render() {
    return (
      <Login email={this.state.email}
        password={this.state.password}
        handleFieldChange={this.handleFieldChange}
        handleLogin={this.handleLogin}
        loading={this.state.status === 'logging_in'} />
    );
  }
}
