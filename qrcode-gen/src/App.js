import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dictionary from "./Components/Dictionary/Dictionary";
import QrCode from "./Components/QrCodeGen/QrCode";
import Home from "./Home";
import Translator from "./Components/Translator/Translator";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple navigation */}
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrcode" element={<QrCode />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/translator" element={<Translator />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
