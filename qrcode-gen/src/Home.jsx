import { Link } from "react-router-dom";
import "./Home.css"; // Add this for clean separation

const Home = () => {
  const apps = [
    { path: "/qrcode", name: "QrCode Generator" },
    { path: "/dictionary", name: "Dictionary" },
    { path: "/translator", name: "Translator" },
  ];

  return (
    <div className="home-container">
      <h1 /* className="home-title" */>List of Apps</h1>
      <div className="grid-container">
        {apps.map((app) => (
          <Link to={app.path} key={app.path} className="card-link">
            <div className="card">
              <h2 className="card-title">{app.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
