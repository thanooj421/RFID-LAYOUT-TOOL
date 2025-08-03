import React from "react";
import RemoveButton from "./common/RemoveButton";

const NUMBER_INPUT_REGEX = /^-?\d*\.?\d*$/;

const TrackFormCard = ({
  track,
  onUpdate,
  onRemove,
  colors,
  stationAAbsKm,
  stationBAbsKm,
  onValidateField,
  isTrackLengthDefined,
}) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (["focusFrom", "focusTo"].includes(field)) {
      if (value === "" || NUMBER_INPUT_REGEX.test(value)) {
        onUpdate(track.id, field, value);
      }
    } else {
      onUpdate(track.id, field, value);
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    onValidateField(track.id, field, value);
  };

  const trackPositionOptions = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const trackVisualDirectionOptions = [
    { value: "nominal", label: "Nominal (Left to Right)" },
    { value: "reverse", label: "Reverse (Right to Left)" },
  ];

  const areFocusInputsDisabled = !isTrackLengthDefined;

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h3 style={{ marginTop: "0", marginBottom: "15px", color: "#333" }}>
        Track {track.id} Specifics
      </h3>
      {track.id > 1 && <RemoveButton onClick={() => onRemove(track.id)} />}

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`trackPosition-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Track Position:
        </label>
        <select
          id={`trackPosition-${track.id}`}
          value={track.trackPosition}
          onChange={handleChange("trackPosition")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {trackPositionOptions.map((pos) => (
            <option key={pos} value={pos}>
              {pos === 0
                ? `0 (Default)`
                : pos > 0
                ? `+${pos} (Above Default)`
                : `${pos} (Below Default)`}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`trackVisualTraversalDirection-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Track Direction (Visual Traversal):
        </label>
        <select
          id={`trackVisualTraversalDirection-${track.id}`}
          value={track.trackVisualTraversalDirection}
          onChange={handleChange("trackVisualTraversalDirection")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {trackVisualDirectionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`tinId-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Track Identification Number (TIN):
        </label>
        <input
          type="number"
          className="no-arrows"
          id={`tinId-${track.id}`}
          value={track.tinId}
          onChange={handleChange("tinId")}
          onBlur={handleBlur("tinId")}
          placeholder="Enter TIN"
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
          htmlFor={`focusFrom-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          TIN Start Distance (kilometers, ABS value):
        </label>
        <input
          type="text"
          id={`focusFrom-${track.id}`}
          value={track.focusFrom}
          onChange={handleChange("focusFrom")}
          onBlur={handleBlur("focusFrom")}
          placeholder={`e.g., ${stationAAbsKm.toFixed(3)} km`}
          disabled={areFocusInputsDisabled}
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
          htmlFor={`focusTo-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          TIN End Distance (kilometers, ABS value):
        </label>
        <input
          type="text"
          id={`focusTo-${track.id}`}
          value={track.focusTo}
          onChange={handleChange("focusTo")}
          onBlur={handleBlur("focusTo")}
          placeholder={`e.g., ${stationBAbsKm.toFixed(3)} km`}
          disabled={areFocusInputsDisabled}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor={`selectColor-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          TIN Color:
        </label>
        <select
          id={`selectColor-${track.id}`}
          value={track.selectedColor}
          onChange={handleChange("selectedColor")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor={`trackDirection-${track.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Track Direction Visual (Line Type):
        </label>
        <select
          id={`trackDirection-${track.id}`}
          value={track.trackDirection}
          onChange={handleChange("trackDirection")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="downMain">Down Main Only</option>
          <option value="upMain">Up Main Only</option>
        </select>
      </div>
    </div>
  );
};

export default TrackFormCard;
