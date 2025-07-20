import React from "react";
import RemoveButton from "./common/RemoveButton";

const NUMBER_INPUT_REGEX = /^-?\d*\.?\d*$/;

const GlobalTagFormCard = ({
  tagConfig,
  onUpdate,
  onRemove,
  tagTypes,
  lineOptions,
  stationAAbsKm,
  stationBAbsKm,
  onValidateField,
  isTrackLengthDefined,
}) => {
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "numTags") {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 0) {
        onUpdate(tagConfig.id, field, value === "" ? "" : 0);
      } else {
        onUpdate(tagConfig.id, field, num);
      }
    } else if (
      ["tagStartAbs", "tagEndAbs", "distanceBetweenTagsMeters"].includes(field)
    ) {
      if (value === "" || NUMBER_INPUT_REGEX.test(value)) {
        onUpdate(tagConfig.id, field, value);
      }
    } else {
      onUpdate(tagConfig.id, field, value);
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    onValidateField(tagConfig.id, field, value);
  };

  const isTagEndAbsDisabled = tagConfig.numTags <= 1 || !isTrackLengthDefined;
  const isDistanceBetweenTagsDisabled =
    tagConfig.numTags <= 1 || !isTrackLengthDefined;

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
        Tag Configuration {tagConfig.id}
      </h4>
      <RemoveButton onClick={() => onRemove(tagConfig.id)} />

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`tagSelectLine-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Line:
        </label>
        <select
          id={`tagSelectLine-${tagConfig.id}`}
          value={tagConfig.selectedLine}
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
          htmlFor={`tagDirection-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Tag Arrangement Direction:
        </label>
        <select
          id={`tagDirection-${tagConfig.id}`}
          value={tagConfig.direction}
          onChange={handleChange("direction")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="nominal">Nominal (Increasing ABS Order)</option>
          <option value="reverse">Reverse (Decreasing ABS Order)</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`tagType-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Tag type:
        </label>
        <select
          id={`tagType-${tagConfig.id}`}
          value={tagConfig.tagType}
          onChange={handleChange("tagType")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          {tagTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor={`numTags-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Number of tags:
        </label>
        <input
          type="text"
          id={`numTags-${tagConfig.id}`}
          value={tagConfig.numTags}
          onChange={handleChange("numTags")}
          onBlur={handleBlur("numTags")}
          placeholder="e.g., 1"
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
          htmlFor={`tagId-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Tag ID (Decimal Number):
        </label>
        <input
          type="text"
          id={`tagId-${tagConfig.id}`}
          value={tagConfig.tagId}
          onChange={(e) => {
            if (/^\d*\.?\d*$/.test(e.target.value)) {
              onUpdate(tagConfig.id, "tagId", e.target.value);
            }
          }}
          placeholder="e.g., 101"
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
          htmlFor={`tagStartAbs-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Tag start ABS (kilometers):
        </label>
        <input
          type="text"
          id={`tagStartAbs-${tagConfig.id}`}
          value={tagConfig.tagStartAbs}
          onChange={handleChange("tagStartAbs")}
          onBlur={handleBlur("tagStartAbs")}
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
          htmlFor={`tagEndAbs-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Tag end ABS (kilometers):
        </label>
        <input
          type="text"
          id={`tagEndAbs-${tagConfig.id}`}
          value={tagConfig.tagEndAbs}
          onChange={handleChange("tagEndAbs")}
          onBlur={handleBlur("tagEndAbs")}
          placeholder={`e.g., ${stationBAbsKm.toFixed(3)} km`}
          disabled={isTagEndAbsDisabled}
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
          htmlFor={`distanceBetweenTagsMeters-${tagConfig.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Distance between tags (meters):
        </label>
        <input
          type="text"
          id={`distanceBetweenTagsMeters-${tagConfig.id}`}
          value={tagConfig.distanceBetweenTagsMeters}
          onChange={handleChange("distanceBetweenTagsMeters")}
          onBlur={handleBlur("distanceBetweenTagsMeters")}
          placeholder="e.g., 100"
          disabled={isDistanceBetweenTagsDisabled}
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

export default GlobalTagFormCard;
