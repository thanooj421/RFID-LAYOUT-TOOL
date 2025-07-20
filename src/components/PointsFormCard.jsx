import React from "react";
import RemoveButton from "./common/RemoveButton";

const PointsFormCard = ({ point, onUpdate, onRemove, idx }) => {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: 10, color: "#555" }}>
        Point Set {idx + 1}
      </h4>
      <RemoveButton onClick={() => onRemove(point.id)} />
      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5 }}>
          Point A (decimal number):
        </label>
        <input
          type="text"
          value={point.pointA}
          onChange={(e) => {
            if (/^-?\d*\.?\d*$/.test(e.target.value))
              onUpdate(point.id, "pointA", e.target.value);
          }}
          placeholder="e.g., 1"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>
      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5 }}>
          Point B (decimal number):
        </label>
        <input
          type="text"
          value={point.pointB}
          onChange={(e) => {
            if (/^-?\d*\.?\d*$/.test(e.target.value))
              onUpdate(point.id, "pointB", e.target.value);
          }}
          placeholder="e.g., 2"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>
      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5 }}>
          Point Absolute Location (kilometers):
        </label>
        <input
          type="text"
          value={point.abs}
          onChange={(e) => {
            if (/^-?\d*\.?\d*$/.test(e.target.value))
              onUpdate(point.id, "abs", e.target.value);
          }}
          placeholder="e.g., 573.660"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>
    </div>
  );
};

export default PointsFormCard;
