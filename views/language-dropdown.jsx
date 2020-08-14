/**
 * Created by Rem Yang, Aug 12 2020
 */

import React, { Component } from 'react';

export class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    }
  }

  componentDidMount() {
    const googleTranslate = require('google-translate')(this.props.apiKey, {})
    googleTranslate.getSupportedLanguages('en', (err, languageCodes) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          languages: languageCodes.sort((a,b) => a.name > b.name)
        });
      }
    });

    // this.state.languages = [{ language: "en", name: "English" }, ...]
  }

  render() {
    return (
      <select onChange={this.props.onChange}>
        {this.state.languages.map((lang) => {
          return <option value={lang.language} key={lang.language}>{lang.name}</option>
        })}
      </select>
    );
  }
}
