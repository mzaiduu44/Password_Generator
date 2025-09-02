import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLenght] = useState(8);
  const [numAllowed, setNumAlloed] = useState(true);
  const [charAllowed, setCharAlloed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    console.log(str);
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$&__-";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str[char];
    }
    console.log(pass);
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }, [password]);

  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="first">
          <div className="inp">
            <input
              type="text"
              placeholder="Generated password"
              value={password}
              readOnly
              ref={passRef}
            />
            <button onClick={copyPasswordToClipboard} className="copy">
              Copy
            </button>
          </div>
        </div>

        <div className="second">
          <div className="sliderBox">
            <input
              type="range"
              min="4"
              max="20"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>
              Length <span className="lenght-span">{length}</span>
            </label>
          </div>

          <div className="checkGroup">
            <span>Include Numbers</span>
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => {
                setNumAlloed(!numAllowed);
              }}
            />
          </div>

          <div className="checkGroup">
            <span>Include Characters</span>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => {
                setCharAlloed((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
