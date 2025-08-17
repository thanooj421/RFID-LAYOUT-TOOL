import React from "react";
import RemoveButton from "./common/RemoveButton";

const TrackSectionFormCard = ({
  trackSection,
  onUpdate,
  onRemove,
  lineOptions,
  isTrackLengthDefined,
}) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    onUpdate(trackSection.id, field, value);
  };

  return (
    <div
      style={{
        padding: "15px",
        marginBottom: "20px",
        position: "relative",
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: "15px", color: "#555" }}>
        {trackSection.id}
      </h4>

      <RemoveButton onClick={() => onRemove(trackSection.id)} />

      {/* Select Line */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`trackSectionSelectLine-${trackSection.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Line:
        </label>
        <select
          id={`trackSectionSelectLine-${trackSection.id}`}
          value={trackSection.selectedLine}
          onChange={handleChange("selectedLine")}
          // disabled={!isTrackLengthDefined}
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
          htmlFor={`trackSectionSelectDirection-${trackSection.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Direction:
        </label>
        <select
          id={`trackSectionSelectDirection-${trackSection.id}`}
          value={trackSection.direction}
          onChange={handleChange("direction")}
          // disabled={!isTrackLengthDefined}
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

      {/*Track Section Name*/}

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`trackSectionName-${trackSection.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Track Section Name:
        </label>
        <input
          type="text"
          id={`trackSectionName-${trackSection.id}`}
          value={trackSection.trackSectionName || ""}
          onChange={handleChange("trackSectionName")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>

      {/* Track Section Start Abs */}

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`trackSectionStartAbs-${trackSection.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Track Section Start Abs (km):
        </label>
        <input
          id={`trackSectionStartAbs-${trackSection.id}`}
          type="number"
          value={trackSection.startAbs}
          onChange={handleChange("startAbs")}
          disabled={!isTrackLengthDefined}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        />
      </div>

      {/* Track Section End Abs */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`trackSectionEndAbs-${trackSection.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Track Section End Abs (km):
        </label>
        <input
          type="number"
          step="any"
          id={`trackSectionEndAbs-${trackSection.id}`}
          value={trackSection.endAbs || ""}
          onChange={handleChange("endAbs")}
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

export default TrackSectionFormCard;
