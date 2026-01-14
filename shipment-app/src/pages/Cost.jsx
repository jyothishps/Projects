import { useLocation } from "react-router-dom";
import axios from "axios";

function Cost() {
  const location = useLocation();
  const { sender, recepient, weight, distance } = location.state || {};

  const totalCost = Number(weight) * Number(distance);

  const saveShipment = async () => {
    try {
      await axios.post("http://localhost:5000/add", {
        sender,
        recepient,
        weight,
        distance,
        totalCost
      });
      alert("Saved successfully");
    } catch {
      alert("Error saving shipment");
    }
  };

  return (
    <div>
      <h2>Shipment Cost</h2>
      <p>Sender: {sender}</p>
      <p>Recipient: {recepient}</p>
      <p>Weight: {weight}</p>
      <p>Distance: {distance}</p>
      <h3>Total Cost: ₹{totalCost}</h3>

      <button onClick={saveShipment}>Save Shipment</button>
    </div>
  );
}

export default Cost;
