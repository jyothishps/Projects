import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Cargo Shipment Management System</h1>
      <button onClick={() => navigate("/new")}>New Shipment</button>
      <button onClick={() => navigate("/track")}>Track Shipment</button>
    </div>
  );
}

export default HomePage;
