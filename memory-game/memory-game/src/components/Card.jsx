import React from "react";

export default function Card({ item, onClick, flipped }) {
  return (
    <div
      className="card"
      onClick={() => onClick(item)}
      style={{
        width: "120px",
        height: "120px",
        backgroundColor: "#1e293b",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        cursor: "pointer",
        color: "white",
        border: flipped ? "2px solid #38bdf8" : "2px solid transparent",
      }}
    >
      {flipped ? item.emoji : "❓"}
    </div>
  );
}
