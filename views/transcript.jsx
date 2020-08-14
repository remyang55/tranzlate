/**
 * Modified by Rem Yang, Aug 13 2020
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Transcript(props) {
  const googleTranslate = require('google-translate')(props.apiKey, {});
  const [translatedMessages, setTranslatedMessages] = useState([]);
  const bottomOfTranscript = useRef(null);

  const translate = (text, lang) => new Promise((resolve, reject) => {
    googleTranslate.translate(text, lang, (err, translation) => {
      if (err) {
        reject(err);
      } else {
        resolve(translation);
      }
    });
  });

  const getTranslatedMessages = async() => {
    const results = props.messages.map(msg => msg.results.map(async(result, i) => {      
      const translation = await translate(result.alternatives[0].transcript, props.targetLang);
      return translation.translatedText;
    })).reduce((a, b) => a.concat(b), []); // the reduce() call flattens the array
    setTranslatedMessages(await Promise.all(results));
  }

  const scrollToBottom = () => {
    bottomOfTranscript.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  useEffect(() => {
    getTranslatedMessages();
    scrollToBottom();
  }, [props.messages, props.targetLang]);
 
  try {
    const results = translatedMessages.map((msg, i) => (      
      i == translatedMessages.length - 1 ?
      <span key={`result-${i}`}><mark>{msg + '. '}</mark></span> :
      <span key={`result-${i}`}>{msg + '. '}</span> 
    ));

    return (
      <div style={{ overflow: scroll }}>
        {results}
        <div ref={bottomOfTranscript} />
      </div>
    );
  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}

Transcript.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
  targetLang: PropTypes.string.isRequired
};
