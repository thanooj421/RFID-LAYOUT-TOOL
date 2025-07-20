import React from "react";
import RemoveButton from "./common/RemoveButton";

const NUMBER_INPUT_REGEX = /^-?\d*\.?\d*$/;

const SignalFormCard = ({
  signal,
  onUpdate,
  onRemove,
  lineOptions,
  stationAAbsKm,
  stationBAbsKm,
  onValidateField,
  isTrackLengthDefined,
}) => {
  const signalTypeOptions = [
    { value: "RYGY", label: "RYGY" },
    { value: "RYY", label: "RYY" },
    { value: "RYG", label: "RYG" },
    { value: "YGY", label: "YGY" },
    { value: "RG", label: "RG" },
    { value: "RY", label: "RY" },
    { value: "YG", label: "YG" },
    { value: "YY", label: "YY" },
  ];

  const defaultAspectOptions = [
    { value: "R", label: "R" },
    { value: "YG", label: "YG" },
    { value: "D", label: "D" },
  ];

  const directionOptions = [
    { value: "nominal", label: "Nominal" },
    { value: "reverse", label: "Reverse" },
  ];

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "signalAbs") {
      if (value === "" || NUMBER_INPUT_REGEX.test(value)) {
        onUpdate(signal.id, field, value);
      }
    } else {
      onUpdate(signal.id, field, value);
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    onValidateField(signal.id, field, value);
  };

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
        Signal Configuration {signal.id}
      </h4>
      <RemoveButton onClick={() => onRemove(signal.id)} />

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`signalName-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Signal Name:
        </label>
        <input
          type="text"
          id={`signalName-${signal.id}`}
          value={signal.signalName}
          onChange={handleChange("signalName")}
          placeholder="e.g., Sig 1"
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
          htmlFor={`signalAbs-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Signal ABS (kilometers):
        </label>
        <input
          type="text"
          id={`signalAbs-${signal.id}`}
          value={signal.signalAbs}
          onChange={handleChange("signalAbs")}
          onBlur={handleBlur("signalAbs")}
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

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`signalType-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Signal Type:
        </label>
        <select
          id={`signalType-${signal.id}`}
          value={signal.signalType}
          onChange={handleChange("signalType")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {signalTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`defaultAspect-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Default Aspect:
        </label>
        <select
          id={`defaultAspect-${signal.id}`}
          value={signal.defaultAspect}
          onChange={handleChange("defaultAspect")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {defaultAspectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`signalSelectLine-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Line:
        </label>
        <select
          id={`signalSelectLine-${signal.id}`}
          value={signal.selectedLine}
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
          htmlFor={`signalDirection-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Direction:
        </label>
        <select
          id={`signalDirection-${signal.id}`}
          value={signal.direction}
          onChange={handleChange("direction")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {directionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SignalFormCard;
