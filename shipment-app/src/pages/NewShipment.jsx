import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewShipment() {
  const navigate = useNavigate();

  const [sender, setSender] = useState("");
  const [recepient, setRecepient] = useState("");
  const [weight, setWeight] = useState("");
  const [distance, setDistance] = useState("");

  return (
    <div>
      <h2>New Shipment</h2>

      <input placeholder="Sender"
        onChange={e => setSender(e.target.value)} />

      <input placeholder="Recipient"
        onChange={e => setRecepient(e.target.value)} />

      <input placeholder="Weight"
        onChange={e => setWeight(e.target.value)} />

      <input placeholder="Distance"
        onChange={e => setDistance(e.target.value)} />

      <button onClick={() =>
        navigate("/cost", {
          state: { sender, recepient, weight, distance }
        })
      }>
        Calculate Cost
      </button>
    </div>
  );
}

export default NewShipment;
