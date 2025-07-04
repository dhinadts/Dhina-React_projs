import { useState } from "react";
import "./Translator.css";
import languageList from "./Language.json";

export default function Translator() {
  const [inputFormat, setInputFormat] = useState("en");
  const [outputFormat, setOutputFormat] = useState("hi");
  const [translatedText, setTranslatedText] = useState("Translation");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReverseLanguage = () => {
    setInputFormat(outputFormat);
    setOutputFormat(inputFormat);
    setInputText("");
    setTranslatedText("Translation");
  };

  const handleRemoveInputText = () => {
    setInputText("");
    setTranslatedText("Translation");
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setTranslatedText("Translating...");

    const subscriptionKey = '95HfnvyS39Dvdl3lUd7MLWBwP6ZsEjyLGJCkKPcPNqH1Dg6yzVHeJQQJ99BGAC3pKaRXJ3w3AAAbACOGGOXd';
    const endpoint = 'https://api.cognitive.microsofttranslator.com' ;
    const region = 'eastasia';

    console.log(subscriptionKey, endpoint, region);

    const url = `${endpoint}/translate?api-version=3.0&from=${inputFormat}&to=${outputFormat}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Ocp-Apim-Subscription-Region": region,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([{ Text: inputText }])
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const translation = data[0]?.translations[0]?.text || "No translation found";
      setTranslatedText(translation);
    } catch (error) {
      alert("An error occurred while translating. Please try again.");
      setTranslatedText("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row1">
        <select
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
        >
          {Object.entries(languageList).map(([key, language]) => (
            <option key={key} value={key}>
              {language.name}
            </option>
          ))}
        </select>

        <svg
          className="reversesvg"
          onClick={handleReverseLanguage}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path>
        </svg>

        <select
          value={outputFormat}
          onChange={(e) => {
            setOutputFormat(e.target.value);
            setTranslatedText("Translation");
          }}
        >
          {Object.entries(languageList).map(([key, language]) => (
            <option key={key} value={key}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row2">
        <div className="inputText">
          <svg
            className="removeinput"
            style={{ display: inputText ? "block" : "none" }}
            onClick={handleRemoveInputText}
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
          <textarea
            value={inputText}
            placeholder="Enter Text"
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="outputText">{translatedText}</div>
      </div>

      <div className="row3">
        <button className="btn" onClick={handleTranslate} disabled={loading}>
          {loading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            <span className="translate">Translate</span>
          )}
        </button>
      </div>
    </div>
  );
}
