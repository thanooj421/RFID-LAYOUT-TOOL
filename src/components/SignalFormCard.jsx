import React from "react";
import RemoveButton from "./common/RemoveButton";

const directionOptions = [
  { value: "Normal", label: "Normal" },
  { value: "Reverse", label: "Reverse" },
];

const SignalFormCard = ({
  signal,
  onUpdate,
  onRemove,
  lineOptions = [],
  signalTypeOptions = [
    { value: "Advance Starter", label: "Advance Starter" },
    { value: "Home", label: "Home" },
    { value: "Advance Starter(UP)", label: "Advance Starter(UP)" },
    { value: "Advance Starter(DN)", label: "Advance Starter(DN)" },
    { value: "Home(UP)", label: "Home(UP)" },
    { value: "Home(DN)", label: "Home(DN)" },
  ],
  stationAAbsKm,
  stationBAbsKm,
  isTrackLengthDefined,
  onValidateField,
}) => {
  const markerOptions = [
    { value: "Calling On", label: "Calling On" },
    { value: "Permissive", label: "Permissive" },
    { value: "Automatic", label: "Automatic" },
    { value: "Semi-Automatic", label: "Semi-Automatic" },
    { value: "Gate", label: "Gate" },
    { value: "Repeater", label: "Repeater" },
    { value: "Block Instrument", label: "Block Instrument" },
  ];

  const numAspectsOptions = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const defaultAspectOptions = [
    { value: "Red", label: "Red" },
    { value: "Yellow", label: "Yellow" },
    { value: "Green", label: "Green" },
    { value: "DoubleYellow", label: "Double Yellow" },
  ];

  const aspectColorOptions = [
    { value: "Red", label: "Red" },
    { value: "Yellow", label: "Yellow" },
    { value: "Green", label: "Green" },
  ];

  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    if (field === "numAspects") {
      const parsed = parseInt(raw, 10);
      if (!Number.isNaN(parsed)) {
        onUpdate(signal.id, field, parsed);
        const current = Array.isArray(signal.aspects)
          ? signal.aspects.slice()
          : [];
        const newAspects = Array.from(
          { length: parsed },
          (_, i) => current[i] || "Red",
        );
        onUpdate(signal.id, "aspects", newAspects);
        return;
      }
    }
    onUpdate(signal.id, field, raw);
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    if (typeof onValidateField === "function") {
      onValidateField(signal.id, field, value);
    }
  };

  const handleAspectChange = (index) => (e) => {
    const newVal = e.target.value;
    const current = Array.isArray(signal.aspects) ? signal.aspects.slice() : [];
    current[index] = newVal;
    onUpdate(signal.id, "aspects", current);
  };

  const minOverallAbsKm = Math.min(stationAAbsKm || 0, stationBAbsKm || 0);
  const maxOverallAbsKm = Math.max(stationAAbsKm || 0, stationBAbsKm || 0);
  const derivedTrackLengthKm = Math.abs(
    (stationBAbsKm || 0) - (stationAAbsKm || 0),
  );

  return (
    <div
      style={{ padding: "15px", marginBottom: "20px", position: "relative" }}
    >
      <h4 style={{ marginTop: 0, marginBottom: "15px", color: "#555" }}>
        Signal Configuration {signal.id}
      </h4>

      <RemoveButton onClick={() => onRemove(signal.id)} />

      {/* Signal Name */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`signalName-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Signal Name:
        </label>
        <input
          id={`signalName-${signal.id}`}
          type="text"
          value={signal.signalName || ""}
          onChange={handleChange("signalName")}
          placeholder="e.g., SIG-01"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "240px",
          }}
        />
      </div>

      {/* signal type selector */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`signalType-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Signal Type:
        </label>
        <select
          id={`signalType-${signal.id}`}
          value={signal.signalType || ""}
          onChange={handleChange("signalType")}
          onBlur={handleBlur("signalType")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "216px",
          }}
        >
          <option value="">-- Select Signal Type --</option>
          {signalTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* line selector */}
      <div style={{ marginBottom: "12px" }}>
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

      {/* direction selector */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`signalSelectDirection-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Select Signal Direction:
        </label>
        <select
          id={`signalSelectDirection-${signal.id}`}
          value={signal.selectedDirection}
          onChange={handleChange("selectedDirection")}
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

      {/* signalAbs */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`signalAbs-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Signal Abs (kilometers):
        </label>
        <input
          type="text"
          id={`signalAbs-${signal.id}`}
          value={signal.signalAbs || ""}
          onChange={handleChange("signalAbs")}
          onBlur={handleBlur("signalAbs")}
          placeholder={
            isTrackLengthDefined
              ? `${minOverallAbsKm.toFixed(3)} - ${maxOverallAbsKm.toFixed(
                  3,
                )} km`
              : "Enter station ABS first"
          }
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
      </div>

      {/* Marker */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`marker-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Marker:
        </label>
        <select
          id={`marker-${signal.id}`}
          value={signal.marker || "none"}
          onChange={handleChange("marker")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "240px",
          }}
        >
          <option value="none">None</option>
          {markerOptions.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dependent Shunt */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Dependent Shunt:
        </label>
        <label style={{ marginRight: "12px" }}>
          <input
            type="radio"
            name={`dependentShunt-${signal.id}`}
            value="yes"
            checked={String(signal.dependentShunt) === "yes"}
            onChange={handleChange("dependentShunt")}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name={`dependentShunt-${signal.id}`}
            value="no"
            checked={
              String(signal.dependentShunt) === "no" || !signal.dependentShunt
            }
            onChange={handleChange("dependentShunt")}
          />{" "}
          No
        </label>
      </div>

      {/* Miniature */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Miniature Yellow:
        </label>
        <label style={{ marginRight: "12px" }}>
          <input
            type="radio"
            name={`miniatureYellow-${signal.id}`}
            value="yes"
            checked={String(signal.miniatureYellow) === "yes"}
            onChange={handleChange("miniatureYellow")}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name={`miniatureYellow-${signal.id}`}
            value="no"
            checked={
              String(signal.miniatureYellow) === "no" || !signal.miniatureYellow
            }
            onChange={handleChange("miniatureYellow")}
          />{" "}
          No
        </label>
      </div>

      {/* Number of aspects */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`numAspects-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Number of Signal Aspects:
        </label>
        <select
          id={`numAspects-${signal.id}`}
          value={signal.numAspects || 3}
          onChange={handleChange("numAspects")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "240px",
          }}
        >
          {numAspectsOptions.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </select>
      </div>

      {/* dynamic aspect selectors */}
      {(() => {
        const count = Number(signal.numAspects) || 0;
        if (count >= 2 && count <= 4) {
          return (
            <div style={{ marginBottom: "12px" }}>
              {Array.from({ length: count }, (_, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <label
                    htmlFor={`aspect-${signal.id}-${i}`}
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Aspect {i + 1}:
                  </label>
                  <select
                    id={`aspect-${signal.id}-${i}`}
                    value={(signal.aspects && signal.aspects[i]) || "Red"}
                    onChange={handleAspectChange(i)}
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      width: "200px",
                    }}
                  >
                    {aspectColorOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })()}

      {/* default aspect */}
      <div style={{ marginBottom: "12px" }}>
        <label
          htmlFor={`defaultAspect-${signal.id}`}
          style={{ display: "block", marginBottom: "5px" }}
        >
          Default Aspect:
        </label>
        <select
          id={`defaultAspect-${signal.id}`}
          value={signal.defaultAspect || "Red"}
          onChange={handleChange("defaultAspect")}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "240px",
          }}
        >
          {defaultAspectOptions.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* route indicators */}
      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Route Indicators:
        </label>
        <label style={{ marginRight: "12px" }}>
          <input
            type="radio"
            name={`routeIndicators-${signal.id}`}
            value="yes"
            checked={String(signal.routeIndicators) === "yes"}
            onChange={handleChange("routeIndicators")}
          />{" "}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name={`routeIndicators-${signal.id}`}
            value="no"
            checked={
              String(signal.routeIndicators) === "no" || !signal.routeIndicators
            }
            onChange={handleChange("routeIndicators")}
          />{" "}
          No
        </label>

        {String(signal.routeIndicators) === "yes" && (
          <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
            {["a", "b", "c", "d", "e", "f"].map((key, idx) => (
              <label key={key} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(signal.routes)
                      ? signal.routes.includes(key)
                      : false
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const current = Array.isArray(signal.routes)
                      ? signal.routes.slice()
                      : [];
                    if (checked) {
                      if (!current.includes(key)) current.push(key);
                    } else {
                      const i = current.indexOf(key);
                      if (i !== -1) current.splice(i, 1);
                    }
                    onUpdate(signal.id, "routes", current);
                  }}
                />{" "}
                {`Route ${idx + 1} / ${key}`}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalFormCard;
