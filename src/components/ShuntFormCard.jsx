import React from "react";
import RemoveButton from "./common/RemoveButton";

const NUMBER_INPUT_REGEX = /^-?\d*\.?\d*$/;

const ShuntFormCard = ({
  shunt,
  onUpdate,
  onRemove,
  lineOptions,
  stationAAbsKm,
  stationBAbsKm,
  isTrackLengthDefined,
  onValidateField,
}) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "shuntAbs") {
      if (value === "" || NUMBER_INPUT_REGEX.test(value)) {
        onUpdate(shunt.id, field, value);
      }
    } else {
      onUpdate(shunt.id, field, value);
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    onValidateField(shunt.id, field, value);
  };

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
        Shunt {shunt.id}
      </h4>
      <RemoveButton onClick={() => onRemove(shunt.id)} />

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`shuntSelectLine-${shunt.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Line:
        </label>
        <select
          id={`shuntSelectLine-${shunt.id}`}
          value={shunt.selectedLine}
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
          htmlFor={`shuntName-${shunt.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Shunt Name:
        </label>
        <input
          type="text"
          id={`shuntName-${shunt.id}`}
          value={shunt.shuntName}
          onChange={handleChange("shuntName")}
          placeholder="e.g., Shunt 1"
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
          htmlFor={`shuntAbs-${shunt.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Shunt Abs (kilometers):
        </label>
        <input
          type="text"
          id={`shuntAbs-${shunt.id}`}
          value={shunt.shuntAbs}
          onChange={handleChange("shuntAbs")}
          onBlur={handleBlur("shuntAbs")}
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

export default ShuntFormCard;
