import React from "react";

const StationDetailsForm = ({
  stationA,
  stationB,
  handleStationAChange,
  handleStationBChange,
  isTrackLengthDefined,
  derivedTrackLengthKm,
}) => {
  return (
    <div style={{ padding: "15px" }}>
      <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
        Station Details
      </h3>

      <div
        style={{
          marginBottom: "30px",
          border: "1px solid #eee",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
          Station A Details (Starting Station)
        </h4>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="stationAName"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Station Name:
          </label>
          <input
            type="text"
            id="stationAName"
            value={stationA.name}
            onChange={(e) => handleStationAChange("name", e.target.value)}
            placeholder="e.g., Hyderabad"
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
            htmlFor="stationAID"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Station ID (Decimal Number):
          </label>
          <input
            type="text"
            id="stationAID"
            value={stationA.id}
            onChange={(e) => handleStationAChange("id", e.target.value)}
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
            htmlFor="stationAAbs"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Station ABS (Kilometers, e.g., 573.660):
          </label>
          <input
            type="text"
            id="stationAAbs"
            value={stationA.abs}
            onChange={(e) => handleStationAChange("abs", e.target.value)}
            placeholder="e.g., 573.660 or 660.300"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          border: "1px solid #eee",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#555" }}>
          Station B Details (Ending Station)
        </h4>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="stationBName"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Station Name:
          </label>
          <input
            type="text"
            id="stationBName"
            value={stationB.name}
            onChange={(e) => handleStationBChange("name", e.target.value)}
            placeholder="e.g., Secunderabad"
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
            htmlFor="stationBID"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Station ID (Decimal Number):
          </label>
          <input
            type="text"
            id="stationBID"
            value={stationB.id}
            onChange={(e) => handleStationBChange("id", e.target.value)}
            placeholder="e.g., 456"
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
            htmlFor="stationBAbs"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Station ABS (Kilometers, e.g., 582.170):
          </label>
          <input
            type="text"
            id="stationBAbs"
            value={stationB.abs}
            onChange={(e) => handleStationBChange("abs", e.target.value)}
            placeholder="e.g., 582.170 or 640.300"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
        </div>
      </div>
      {isTrackLengthDefined && derivedTrackLengthKm > 0 && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "#007bff" }}>
          Derived Track Length: {derivedTrackLengthKm.toFixed(3)} kilometers
        </p>
      )}
      {isTrackLengthDefined && derivedTrackLengthKm === 0 && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "#dc3545" }}>
          Station A ABS and Station B ABS cannot be the same. Please adjust
          values.
        </p>
      )}
      {!isTrackLengthDefined &&
        (stationA.abs !== "" || stationB.abs !== "") && (
          <p
            style={{ marginTop: "20px", fontWeight: "bold", color: "#dc3545" }}
          >
            Please enter valid numeric values for both Station A and Station B
            ABS.
          </p>
        )}
    </div>
  );
};

export default StationDetailsForm;
