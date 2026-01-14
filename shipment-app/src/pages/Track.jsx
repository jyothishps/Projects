import { useState } from "react";
import axios from "axios";

function Track() {
  const [shipmentId, setShipmentId] = useState("");
  const [status, setStatus] = useState("");

  const trackShipment = async () => {
    const res = await axios.get(
      `http://localhost:5000/track/${shipmentId}`
    );
    setStatus(res.data.status);
  };

  return (
    <div>
      <h2>Track Shipment</h2>

      <input placeholder="Shipment ID"
        onChange={e => setShipmentId(e.target.value)} />

      <button onClick={trackShipment}>Track</button>

      <p>Status: {status}</p>
    </div>
  );
}

export default Track;
