import React, { useState } from "react";
import "./Dictionary.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function Dictionary() {
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  async function getMeaning() {
    if (!searchWord.trim()) {
      alert("Please enter a word.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
      );
      const jsonData = await response.json();
      if (jsonData.title === "No Definitions Found") {
        alert("No definitions found. Try another word.");
        setData(null);
      } else {
        setData(jsonData[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please check your connection.");
    }
  }

  function playAudio() {
    if (data?.phonetics?.[0]?.audio) {
      const audio = new Audio(data.phonetics[0].audio);
      audio.play();
    } else {
      alert("No pronunciation audio available.");
    }
  }

  return (
    <div className="Dictionary">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getMeaning()}
        />
        <button onClick={getMeaning}>
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button onClick={playAudio}>
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of Speech:</h4>
          <p>{data.meanings?.[0]?.partOfSpeech || "N/A"}</p>

          <h4>Definition:</h4>
          <p>{data.meanings?.[0]?.definitions?.[0]?.definition || "N/A"}</p>

          <h4>Example:</h4>
          <p>{data.meanings?.[0]?.definitions?.[0]?.example || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default Dictionary;
