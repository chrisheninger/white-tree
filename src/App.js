import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import firebase, { auth, GoogleAuthProvider } from './firebase.js';

import { defaultCharacterShape } from './data';
import Layout from './Layout';

class WhiteTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultCharacterShape,
      user: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState(() => ({ user }));
      }
    });
  }

  handleSignOut = () => {
    auth.signOut().then(() => {
      this.setState(() => ({
        user: null,
      }));
    });
  };

  handleSignIn = () => {
    auth.signInWithPopup(GoogleAuthProvider).then(result => {
      const user = result.user;
      this.setState(() => ({
        user,
      }));
      console.log(user.displayName);
    });
  };

  onInputChange(section, input, value) {
    const newSectionState = { ...this.state[section] };
    newSectionState[input] = value;
    this.setState({
      [section]: newSectionState,
    });
  }

  renderFormInput(section, input) {
    return (
      <TextField
        key={input}
        label={input}
        value={this.state[section][input]}
        onChange={e => this.onInputChange(section, input, e.target.value)}
        fullWidth
      />
    );
  }

  renderFormSection(section) {
    if (!this.state[section]) {
      return null;
    }

    const sectionKeys = Object.keys(this.state[section]);

    return (
      <div>{sectionKeys.map(this.renderFormInput.bind(this, section))}</div>
    );
  }

  render() {
    return (
      <Layout>
        <div className="character">
          <div className="character-background">
            {this.state.user && (
              <label>Welcome {this.state.user.displayName}</label>
            )}
            {!this.state.user ? (
              <button onClick={this.handleSignIn}> SIGN IN </button>
            ) : (
              <button onClick={this.handleSignOut}> SIGN OUT </button>
            )}

            {this.renderFormSection('general')}
            {this.renderFormSection('physical')}
            {this.renderFormSection('points')}
          </div>
          <div className="character-stats">
            {this.renderFormSection('abilities')}
            {this.renderFormSection('attack')}
            {this.renderFormSection('defense')}
            {this.renderFormSection('equipment')}
          </div>
        </div>
      </Layout>
    );
  }
}

export default WhiteTree;
