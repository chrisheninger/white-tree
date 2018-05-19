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
        const characterSnapshot = snap.val() && snap.val().character;
        const mergedCharacter = {
          ...defaultCharacterShape,
          ...characterSnapshot,
        };
        if (characterSnapshot) {
          self.setState({
            character: mergedCharacter,
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
        multiline={input === 'note' ? true : false}
        rows="22"
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
      <div className="stats-section">
        <div className="section-label"> {section.toUpperCase()} </div>
        <div className="section-fields">
          {sectionKeys.map(this.renderFormInput.bind(this, section))}
        </div>
      </div>
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
              {this.renderFormSection('general')}
              {this.renderFormSection('appearance')}
              {this.renderFormSection('points')}
              {this.renderFormSection('abilities')}
              {this.renderFormSection('attack')}
              {this.renderFormSection('defense')}
              {this.renderFormSection('equipment')}
              {this.renderFormSection('feats')}
              {this.renderFormSection('skills')}
              {this.renderFormSection('specialAbilities')}
              {this.renderFormSection('backstory')}
              {this.renderFormSection('notes')}
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default WhiteTree;
