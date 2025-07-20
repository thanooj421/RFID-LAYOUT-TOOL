import React from "react";
import RemoveButton from "./common/RemoveButton";

const NUMBER_INPUT_REGEX = /^\d*$/;
const FLOAT_INPUT_REGEX = /^-?\d*\.?\d*$/;

const LCGateFormCard = ({
  lc,
  onUpdate,
  onRemove,
  isTrackLengthDefined,
  stationAAbsKm,
}) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "lcNumber") {
      if (value === "" || NUMBER_INPUT_REGEX.test(value)) {
        onUpdate(lc.id, field, value);
      }
    } else if (field === "abs") {
      if (value === "" || FLOAT_INPUT_REGEX.test(value)) {
        onUpdate(lc.id, field, value);
      }
    } else {
      onUpdate(lc.id, field, value);
    }
  };

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
        LC Gate {lc.id}
      </h4>
      <RemoveButton onClick={() => onRemove(lc.id)} />

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`lcNumber-${lc.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          LC Number:
        </label>
        <input
          type="text"
          id={`lcNumber-${lc.id}`}
          value={lc.lcNumber}
          onChange={handleChange("lcNumber")}
          placeholder="e.g., 123"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`lcType-${lc.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Type of LC Gate:
        </label>
        <select
          id={`lcType-${lc.id}`}
          value={lc.lcType}
          onChange={handleChange("lcType")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="INTERLOCKED">INTERLOCKED</option>
          <option value="NON-INTERLOCKED">NON-INTERLOCKED</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`operationType-${lc.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Type of Operation:
        </label>
        <select
          id={`operationType-${lc.id}`}
          value={lc.operationType}
          onChange={handleChange("operationType")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="MANNED">MANNED</option>
          <option value="UNMANNED">UNMANNED</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`lcClass-${lc.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Class:
        </label>
        <select
          id={`lcClass-${lc.id}`}
          value={lc.lcClass}
          onChange={handleChange("lcClass")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`lcAbs-${lc.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Absolute Location (kilometers):
        </label>
        <input
          type="text"
          id={`lcAbs-${lc.id}`}
          value={lc.abs}
          onChange={handleChange("abs")}
          placeholder={`e.g., ${stationAAbsKm.toFixed(3)} km`}
          disabled={!isTrackLengthDefined}
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

export default LCGateFormCard;
