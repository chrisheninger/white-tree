import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import firebase, { auth, GoogleAuthProvider } from './firebase.js';

import { defaultCharacterShape } from './data';
import Layout from './Layout';

import './app.css';

class WhiteTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: { ...defaultCharacterShape },
      user: null,
      loaded: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState(() => ({ user, loaded: true }));
        this.retrieveData();
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
    });
  };

  handleSubmit() {
    firebase
      .database()
      .ref('users/' + this.state.user.uid)
      .set({
        uid: this.state.user.uid,
        name: this.state.user.displayName,
        character: this.state.character,
      });
  }

  retrieveData = () => {
    const self = this;
    firebase
      .database()
      .ref('users/' + this.state.user.uid)
      .once('value', function(snap) {
        const val = snap.val();
        if (val && val.character) {
          self.setState({
            character: val.character,
          });
        }
      });
  };

  onInputChange(section, input, value) {
    const newCharacterState = { ...this.state.character };
    newCharacterState[section][input] = value;
    this.setState({
      character: newCharacterState,
    });
  }

  renderFormInput(section, input) {
    return (
      <TextField
        key={input}
        label={input}
        value={this.state.character[section][input]}
        onChange={e => this.onInputChange(section, input, e.target.value)}
        fullWidth
      />
    );
  }

  renderFormSection(section) {
    if (!this.state.character[section]) {
      return null;
    }

    const sectionKeys = Object.keys(this.state.character[section]);

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
              <label className="welcome-label">
                Welcome {this.state.user.displayName}
              </label>
            )}

            <div class="buttons-container">
              {!this.state.user ? (
                <button onClick={this.handleSignIn} id="signin-button">
                  <img
                    src="http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
                    className="button-icon"
                  />SIGN IN
                </button>
              ) : (
                <button onClick={this.handleSignOut} class="generic-button">
                  SIGN OUT
                </button>
              )}

              {this.state.user && (
                <div>
                  <button
                    onClick={() => this.handleSubmit()}
                    className="generic-button"
                    id="save-button"
                  >
                    SAVE
                  </button>
                </div>
              )}
            </div>
          </div>

          {this.state.user && (
            <div className="character-stats" visible={this.state.user}>
              <div className="stats-section">
                <label className="section-label"> General </label>
                {this.renderFormSection('general')}
              </div>
              <div className="stats-section">
                <label className="section-label"> Appearance </label>
                {this.renderFormSection('appearance')}
              </div>
              <div className="stats-section">
                <label className="section-label"> Points </label>
                {this.renderFormSection('points')}
              </div>
              <div className="stats-section">
                <label className="section-label"> Abilities </label>
                {this.renderFormSection('abilities')}
              </div>
              <div className="stats-section">
                <label className="section-label"> Attack </label>
                {this.renderFormSection('attack')}
              </div>
              <div className="stats-section">
                <label className="section-label"> Defense </label>
                {this.renderFormSection('defense')}
              </div>
              <div className="stats-section">
                <label className="section-label"> Equipment </label>
                {this.renderFormSection('equipment')}
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default WhiteTree;
