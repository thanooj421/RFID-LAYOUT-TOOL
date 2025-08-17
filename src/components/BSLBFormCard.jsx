import React from "react";
import RemoveButton from "./common/RemoveButton";

const BSLBFormCard = ({
  bslb,
  onUpdate,
  onRemove,
  lineOptions,
  isTrackLengthDefined,
  stationAAbsKm,
}) => {
  // Simplified handleChange, no manual number validation needed
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    onUpdate(bslb.id, field, value);
  };

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: 0, marginBottom: "15px", color: "#555" }}>
        BSLB {bslb.id}
      </h4>

      <RemoveButton onClick={() => onRemove(bslb.id)} />

      {/* Select Line */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`bslbSelectLine-${bslb.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Line:
        </label>
        <select
          id={`bslbSelectLine-${bslb.id}`}
          value={bslb.selectedLine}
          onChange={handleChange("selectedLine")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {lineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Direction */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`bslbDirection-${bslb.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Direction:
        </label>
        <select
          id={`bslbDirection-${bslb.id}`}
          value={bslb.direction}
          onChange={handleChange("direction")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="nominal">Nominal</option>
          <option value="reverse">Reverse</option>
        </select>
      </div>

      {/* Absolute Location with number input */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`bslbAbs-${bslb.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Absolute Location (kilometers):
        </label>
        <input
          type="number"
          step="any"
          id={`bslbAbs-${bslb.id}`}
          value={bslb.abs}
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

export default BSLBFormCard;
