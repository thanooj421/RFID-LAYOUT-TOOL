import React from "react";
import RemoveButton from "./common/RemoveButton";

const NUMBER_INPUT_REGEX = /^-?\d*\.?\d*$/;

const BSLBFormCard = ({
  bslb,
  onUpdate,
  onRemove,
  lineOptions,
  isTrackLengthDefined,
  stationAAbsKm,
}) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "abs") {
      if (value === "" || NUMBER_INPUT_REGEX.test(value)) {
        onUpdate(bslb.id, field, value);
      }
    } else {
      onUpdate(bslb.id, field, value);
    }
  };

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
        BSLB {bslb.id}
      </h4>
      <RemoveButton onClick={() => onRemove(bslb.id)} />

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

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`bslbAbs-${bslb.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Absolute Location (kilometers):
        </label>
        <input
          type="text"
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
