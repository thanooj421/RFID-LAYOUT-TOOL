import React from "react";

const TagRangeSection = ({
  tagRanges,
  handleTagRangeChange,
  handleAddTagRange,
  handleRemoveTagRange,
}) => (
  <div
    style={{
      marginBottom: "30px",
      padding: "10px",
      border: "1px solid #eee",
      borderRadius: "6px",
    }}
  >
    <h4 style={{ margin: "0 0 10px 0", color: "#007bff" }}>
      Tag Range Section
    </h4>
    {tagRanges.map((range) => (
      <div
        key={range.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          type="text"
          value={range.start}
          onChange={(e) =>
            handleTagRangeChange(range.id, "start", e.target.value)
          }
          placeholder="Tag Start Range"
          style={{ width: "120px", padding: "6px" }}
        />
        <span>to</span>
        <input
          type="text"
          value={range.end}
          onChange={(e) =>
            handleTagRangeChange(range.id, "end", e.target.value)
          }
          placeholder="Tag End Range"
          style={{ width: "120px", padding: "6px" }}
        />
        <button
          type="button"
          onClick={() => handleRemoveTagRange(range.id)}
          style={{
            padding: "6px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAddTagRange}
      style={{
        padding: "6px 14px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "8px",
      }}
    >
      Add New Tag Range
    </button>
  </div>
);

export default TagRangeSection;
