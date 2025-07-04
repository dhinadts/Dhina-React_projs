import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>List of Apps</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Link to="/qrcode">
          <h1>QrCode Generator</h1>
        </Link>

        <Link to="/dictionary">
          <h1> Dictionary</h1>
        </Link>
        <Link to="/translator">
          <h1>Translator</h1>
        </Link>
      </div>
    </div>
  );
};

export default Home;
