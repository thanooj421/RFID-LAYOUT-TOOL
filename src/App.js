import React, { useState, useMemo } from "react";
import TrackFormCard from "./components/TrackFormCard";
import GlobalTagFormCard from "./components/GlobalTagFormCard";
import SignalFormCard from "./components/SignalFormCard";
import ShuntFormCard from "./components/ShuntFormCard";
import BSLBFormCard from "./components/BSLBFormCard";
import CautionBoardFormCard from "./components/CautionBoardFormCard";
import LCGateFormCard from "./components/LCGateFormCard";
import PointsFormCard from "./components/PointsFormCard";
import StationDetailsForm from "./components/StationDetailsForm";

// Import SVG components
import SignalDownMainNominalSVG from "./svgs/SignalDownMainNominalSVG";
import SignalUpMainReverseSVG from "./svgs/SignalUpMainReverseSVG";
import ShuntDownMainSVG from "./svgs/ShuntDownMainSVG";
import ShuntUpMainSVG from "./svgs/ShuntUpMainSVG";
import BSLBDownMainNominalSVG from "./svgs/BSLBDownMainNominalSVG";
import BSLBUpMainReverseSVG from "./svgs/BSLBUpMainReverseSVG";
import CautionBoardDownMainNominalSVG from "./svgs/CautionBoardDownMainNominalSVG";
import CautionBoardUpMainReverseSVG from "./svgs/CautionBoardUpMainReverseSVG";
import LCInterlockedMannedSVG from "./svgs/LCInterlockedMannedSVG";
import LCNonInterlockedUnmannedSVG from "./svgs/LCNonInterlockedUnmannedSVG";

import ReactDOMServer from "react-dom/server"; // Add this import

const getSvgString = (Component) => {
  return ReactDOMServer.renderToStaticMarkup(<Component />);
};

const App = () => {
  const [activeAppTab, setActiveAppTab] = useState("stationDetails");
  const [stationA, setStationA] = useState({ name: "", id: "", abs: "" });
  const [stationB, setStationB] = useState({ name: "", id: "", abs: "" });

  const [tracks, setTracks] = useState([
    {
      id: 1,
      focusFrom: "",
      focusTo: "",
      selectedColor: "red",
      trackDirection: "downMain",
      trackPosition: 0,
      trackVisualTraversalDirection: "nominal",
    },
  ]);
  const [nextTrackId, setNextTrackId] = useState(2);

  const [globalTagConfigs, setGlobalTagConfigs] = useState([
    {
      id: 1,
      selectedLine: "downMain",
      direction: "nominal",
      tagType: "normal",
      numTags: 1,
      tagStartAbs: "",
      tagEndAbs: "",
      distanceBetweenTagsMeters: "",
      tagId: "",
    },
  ]);
  const [nextTagConfigId, setNextTagConfigId] = useState(2);

  const [signals, setSignals] = useState([
    {
      id: 1,
      signalName: "",
      signalAbs: "",
      signalType: "RYGY",
      defaultAspect: "R",
      selectedLine: "downMain",
      direction: "nominal",
    },
  ]);
  const [nextSignalId, setNextSignalId] = useState(2);

  const colors = ["red", "green", "blue", "yellow", "purple", "orange", "grey"];
  const tagTypes = [
    { value: "normal", label: "Normal Tag" },
    { value: "signalFoot", label: "Signal Tag" },
    { value: "exit", label: "Exit Tag" },
    { value: "adjacent", label: "Adjacent Line Tag" },
  ];

  const [shunts, setShunts] = useState([
    {
      id: 1,
      selectedLine: "downMain",
      shuntName: "",
      shuntAbs: "",
    },
  ]);
  const [nextShuntId, setNextShuntId] = useState(2);

  const [bslbs, setBslbs] = useState([
    {
      id: 1,
      selectedLine: "downMain",
      direction: "nominal",
      abs: "",
    },
  ]);
  const [nextBslbId, setNextBslbId] = useState(2);

  const [cautionBoards, setCautionBoards] = useState([
    {
      id: 1,
      selectedLine: "downMain",
      direction: "nominal",
      abs: "",
    },
  ]);
  const [nextCautionBoardId, setNextCautionBoardId] = useState(2);

  const [lcGates, setLcGates] = useState([
    {
      id: 1,
      lcNumber: "",
      lcType: "INTERLOCKED",
      operationType: "MANNED",
      lcClass: "A",
      abs: "",
    },
  ]);
  const [nextLcGateId, setNextLcGateId] = useState(2);

  const [points, setPoints] = useState([
    { id: 1, pointA: "", pointB: "", abs: "" },
  ]);
  const [nextPointId, setNextPointId] = useState(2);

  const handleAddPoint = () => {
    setPoints((prev) => [
      ...prev,
      { id: nextPointId, pointA: "", pointB: "", abs: "" },
    ]);
    setNextPointId((id) => id + 1);
  };

  const handleRemovePoint = (id) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdatePoint = (id, field, value) => {
    setPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const PAGE_WIDTH_PX = 46.81 * 96;
  const PAGE_HEIGHT_PX = 33.11 * 96;

  const VIEWBOX_PADDING_X = 0;
  const VIEWBOX_PADDING_Y = 500;

  const INTERNAL_SVG_TRACK_WIDTH = PAGE_WIDTH_PX - 2 * VIEWBOX_PADDING_X;

  const LINE_HEIGHT = 40;
  const BLOCK_HEIGHT_PER_DIRECTION = 140;
  const OUTER_TRACK_GAP = 180;
  const MIN_FOCUS_VISUAL_WIDTH = 60;

  const handleStationAChange = (field, value) => {
    if (field === "id" && !/^\d*$/.test(value)) return;
    if (field === "abs" && !/^-?\d*\.?\d*$/.test(value) && value !== "") return;
    setStationA((prev) => ({ ...prev, [field]: value }));
  };

  const handleStationBChange = (field, value) => {
    if (field === "id" && !/^\d*$/.test(value)) return;
    if (field === "abs" && !/^-?\d*\.?\d*$/.test(value) && value !== "") return;
    setStationB((prev) => ({ ...prev, [field]: value }));
  };

  const stationAAbsKm = parseFloat(stationA.abs);
  const stationBAbsKm = parseFloat(stationB.abs);

  const isTrackLengthDefined =
    !isNaN(stationAAbsKm) &&
    !isNaN(stationBAbsKm) &&
    stationAAbsKm !== stationBAbsKm;

  const isAbsDirectionNominal = stationAAbsKm < stationBAbsKm;

  const minOverallAbsKm = isTrackLengthDefined
    ? Math.min(stationAAbsKm, stationBAbsKm)
    : NaN;
  const maxOverallAbsKm = isTrackLengthDefined
    ? Math.max(stationAAbsKm, stationBAbsKm)
    : NaN;

  const derivedTrackLengthMeters = isTrackLengthDefined
    ? Math.abs(stationBAbsKm - stationAAbsKm) * 1000
    : 0;
  const derivedTrackLengthKm = derivedTrackLengthMeters / 1000;

  const validateTrackField = (trackId, field, value) => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return false;

    const parsedValue = parseFloat(value);
    const isNumberValid = !isNaN(parsedValue) && isFinite(parsedValue);

    if (!isTrackLengthDefined || derivedTrackLengthMeters === 0) {
      if (value !== "" && isNumberValid) {
        alert(
          "Please enter valid, different numeric Station A and Station B ABS values to define the track length first."
        );
      }
      return false;
    }

    if (value !== "" && isNumberValid) {
      switch (field) {
        case "focusFrom":
          if (parsedValue < minOverallAbsKm || parsedValue > maxOverallAbsKm) {
            alert(
              `"Focus from" distance (${parsedValue.toFixed(
                3
              )} km) must be within the overall track range [${minOverallAbsKm.toFixed(
                3
              )} km, ${maxOverallAbsKm.toFixed(3)} km].`
            );
            return false;
          }
          break;
        case "focusTo":
          const focusFromAbsKm = parseFloat(track.focusFrom);
          if (
            isNaN(focusFromAbsKm) ||
            focusFromAbsKm < minOverallAbsKm ||
            focusFromAbsKm > maxOverallAbsKm
          ) {
            alert(
              'Please enter a valid "Focus from" distance first (within track bounds).'
            );
            return false;
          }

          if (isAbsDirectionNominal) {
            if (parsedValue <= focusFromAbsKm) {
              alert(
                `Track ${track.id}: "Focus to" (${parsedValue.toFixed(
                  3
                )} km) must be greater than "Focus from" (${focusFromAbsKm.toFixed(
                  3
                )} km) when Station B ABS is greater than Station A ABS.`
              );
              return false;
            }
          } else {
            if (parsedValue >= focusFromAbsKm) {
              alert(
                `Track ${track.id}: "Focus to" (${parsedValue.toFixed(
                  3
                )} km) must be less than "Focus from" (${focusFromAbsKm.toFixed(
                  3
                )} km) when Station A ABS is greater than Station B ABS.`
              );
              return false;
            }
          }

          if (parsedValue < minOverallAbsKm || parsedValue > maxOverallAbsKm) {
            alert(
              `Track ${track.id}: "Focus to" distance (${parsedValue.toFixed(
                3
              )} km) must be within the overall track range [${minOverallAbsKm.toFixed(
                3
              )} km, ${maxOverallAbsKm.toFixed(3)} km].`
            );
            return false;
          }
          break;
        default:
          break;
      }
    }
    return true;
  };

  const handleGlobalTagChange = (id, field, value) => {
    setGlobalTagConfigs((prevConfigs) =>
      prevConfigs.map((config) => {
        if (config.id === id) {
          let updatedConfig = { ...config, [field]: value };

          if (field === "numTags") {
            const num = parseInt(value, 10);
            if (isNaN(num) || num < 0) {
              updatedConfig.numTags = value === "" ? "" : 0;
            } else {
              updatedConfig.numTags = num;
            }
            if (updatedConfig.numTags <= 1) {
              updatedConfig.tagEndAbs = "";
              updatedConfig.distanceBetweenTagsMeters = "";
            }
          } else if (
            ["tagStartAbs", "tagEndAbs", "distanceBetweenTagsMeters"].includes(
              field
            )
          ) {
            if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
              updatedConfig[field] = value;
            } else {
              updatedConfig[field] = "";
            }
          }
          return updatedConfig;
        }
        return config;
      })
    );
  };

  const validateGlobalTagField = (id, field, value) => {
    const tagConfig = globalTagConfigs.find((tc) => tc.id === id);
    if (!tagConfig) return false;

    const parsedValue = parseFloat(value);
    const isNumberValid = !isNaN(parsedValue) && isFinite(parsedValue);

    if (!isTrackLengthDefined || derivedTrackLengthMeters === 0) {
      if (value !== "" && isNumberValid) {
        alert(
          "Please enter valid, different numeric Station A and Station B ABS values to define the track length first."
        );
      }
      return false;
    }

    switch (field) {
      case "numTags":
        if (value !== "" && isNumberValid) {
          if (parsedValue < 0) {
            alert("Number of tags cannot be negative.");
            return false;
          }
        }
        break;
      case "tagStartAbs":
        if (value !== "" && isNumberValid) {
          if (parsedValue < minOverallAbsKm || parsedValue > maxOverallAbsKm) {
            alert(
              `Tag start ABS (${parsedValue.toFixed(
                3
              )} km) must be within the overall track range [${minOverallAbsKm.toFixed(
                3
              )} km, ${maxOverallAbsKm.toFixed(3)} km].`
            );
            return false;
          }
        }
        break;
      case "tagEndAbs":
        if (tagConfig.numTags > 1 && value !== "" && isNumberValid) {
          const startAbs = parseFloat(tagConfig.tagStartAbs);
          if (
            isNaN(startAbs) ||
            startAbs < minOverallAbsKm ||
            startAbs > maxOverallAbsKm
          ) {
            alert(
              "Please enter a valid Tag start ABS first, within track bounds."
            );
            return false;
          }

          if (tagConfig.direction === "nominal") {
            if (parsedValue <= startAbs) {
              alert(
                `Tag end ABS (${parsedValue.toFixed(
                  3
                )} km) must be greater than Tag start ABS (${startAbs.toFixed(
                  3
                )} km) for Nominal (Increasing ABS Order) arrangement.`
              );
              return false;
            }
          } else {
            if (parsedValue >= startAbs) {
              alert(
                `Tag end ABS (${parsedValue.toFixed(
                  3
                )} km) must be less than Tag start ABS (${startAbs.toFixed(
                  3
                )} km) for Reverse (Decreasing ABS Order) arrangement.`
              );
              return false;
            }
          }

          if (parsedValue < minOverallAbsKm || parsedValue > maxOverallAbsKm) {
            alert(
              `Tag end ABS (${parsedValue.toFixed(
                3
              )} km) must be within the overall track range [${minOverallAbsKm.toFixed(
                3
              )} km, ${maxOverallAbsKm.toFixed(3)} km].`
            );
            return false;
          }
        }
        break;
      case "distanceBetweenTagsMeters":
        if (tagConfig.numTags > 1 && value !== "" && isNumberValid) {
          if (parsedValue <= 0) {
            alert("Distance between tags must be a positive number of meters.");
            return false;
          }
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleAddSignal = () => {
    setSignals((prevSignals) => [
      ...prevSignals,
      {
        id: nextSignalId,
        signalName: "",
        signalAbs: "",
        signalType: "RYGY",
        defaultAspect: "R",
        selectedLine: "downMain",
        direction: "nominal",
      },
    ]);
    setNextSignalId((prevId) => prevId + 1);
  };

  const handleUpdateSignal = (id, field, value) => {
    setSignals((prevSignals) =>
      prevSignals.map((signal) =>
        signal.id === id ? { ...signal, [field]: value } : signal
      )
    );
  };

  const handleRemoveSignal = (id) => {
    setSignals((prevSignals) =>
      prevSignals.filter((signal) => signal.id !== id)
    );
  };

  const validateSignalField = (id, field, value) => {
    const signal = signals.find((s) => s.id === id);
    if (!signal) return false;

    const parsedValue = parseFloat(value);
    const isNumberValid = !isNaN(parsedValue) && isFinite(parsedValue);

    if (!isTrackLengthDefined || derivedTrackLengthMeters === 0) {
      if (value !== "" && isNumberValid) {
        alert(
          "Please enter valid, different numeric Station A and Station B ABS values to define the track length first."
        );
      }
      return false;
    }

    if (value !== "" && isNumberValid) {
      switch (field) {
        case "signalAbs":
          if (parsedValue < minOverallAbsKm || parsedValue > maxOverallAbsKm) {
            alert(
              `Signal ABS (${parsedValue.toFixed(
                3
              )} km) must be within the overall track range [${minOverallAbsKm.toFixed(
                3
              )} km, ${maxOverallAbsKm.toFixed(3)} km].`
            );
            return false;
          }
          break;
        default:
          break;
      }
    }
    return true;
  };

  const handleAddTrack = () => {
    setTracks((prevTracks) => [
      ...prevTracks,
      {
        id: nextTrackId,
        focusFrom: "",
        focusTo: "",
        selectedColor: "red",
        trackDirection: "downMain",
        trackPosition: 0,
        trackVisualTraversalDirection: "nominal",
      },
    ]);
    setNextTrackId((prevId) => prevId + 1);
  };

  const handleUpdateTrack = (id, field, value) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === id ? { ...track, [field]: value } : track
      )
    );
  };

  const handleRemoveTrack = (id) => {
    setTracks((prevTracks) => prevTracks.filter((track) => track.id !== id));
  };

  const handleAddTagConfig = () => {
    setGlobalTagConfigs((prevConfigs) => [
      ...prevConfigs,
      {
        id: nextTagConfigId,
        selectedLine: "downMain",
        direction: "nominal",
        tagType: "normal",
        numTags: 1,
        tagStartAbs: "",
        tagEndAbs: "",
        distanceBetweenTagsMeters: "",
        tagId: "",
      },
    ]);
    setNextTagConfigId((prevId) => prevId + 1);
  };

  const handleRemoveTagConfig = (id) => {
    setGlobalTagConfigs((prevConfigs) =>
      prevConfigs.filter((config) => config.id !== id)
    );
  };

  const handleAddShunt = () => {
    setShunts((prevShunts) => [
      ...prevShunts,
      {
        id: nextShuntId,
        selectedLine: "downMain",
        shuntName: "",
        shuntAbs: "",
      },
    ]);
    setNextShuntId((prevId) => prevId + 1);
  };

  const handleUpdateShunt = (id, field, value) => {
    setShunts((prevShunts) =>
      prevShunts.map((shunt) =>
        shunt.id === id ? { ...shunt, [field]: value } : shunt
      )
    );
  };

  const handleRemoveShunt = (id) => {
    setShunts((prevShunts) => prevShunts.filter((shunt) => shunt.id !== id));
  };

  const handleAddBslb = () => {
    setBslbs((prev) => [
      ...prev,
      {
        id: nextBslbId,
        selectedLine: "downMain",
        direction: "nominal",
        abs: "",
      },
    ]);
    setNextBslbId((id) => id + 1);
  };
  const handleUpdateBslb = (id, field, value) => {
    setBslbs((prev) =>
      prev.map((bslb) => (bslb.id === id ? { ...bslb, [field]: value } : bslb))
    );
  };
  const handleRemoveBslb = (id) => {
    setBslbs((prev) => prev.filter((bslb) => bslb.id !== id));
  };

  const handleAddCautionBoard = () => {
    setCautionBoards((prev) => [
      ...prev,
      {
        id: nextCautionBoardId,
        selectedLine: "downMain",
        direction: "nominal",
        abs: "",
      },
    ]);
    setNextCautionBoardId((id) => id + 1);
  };
  const handleUpdateCautionBoard = (id, field, value) => {
    setCautionBoards((prev) =>
      prev.map((cb) => (cb.id === id ? { ...cb, [field]: value } : cb))
    );
  };
  const handleRemoveCautionBoard = (id) => {
    setCautionBoards((prev) => prev.filter((cb) => cb.id !== id));
  };

  const handleAddLcGate = () => {
    setLcGates((prev) => [
      ...prev,
      {
        id: nextLcGateId,
        lcNumber: "",
        lcType: "INTERLOCKED",
        operationType: "MANNED",
        lcClass: "A",
        abs: "",
      },
    ]);
    setNextLcGateId((id) => id + 1);
  };
  const handleUpdateLcGate = (id, field, value) => {
    setLcGates((prev) =>
      prev.map((lc) => (lc.id === id ? { ...lc, [field]: value } : lc))
    );
  };
  const handleRemoveLcGate = (id) => {
    setLcGates((prev) => prev.filter((lc) => lc.id !== id));
  };

  const validateShuntField = (id, field, value) => {
    if (field === "shuntAbs" && value !== "") {
      const num = parseFloat(value);
      if (
        isNaN(num) ||
        num < Math.min(stationAAbsKm, stationBAbsKm) ||
        num > Math.max(stationAAbsKm, stationBAbsKm)
      ) {
        alert(
          `Shunt Abs (${value}) must be within the overall track range [${Math.min(
            stationAAbsKm,
            stationBAbsKm
          )} km, ${Math.max(stationAAbsKm, stationBAbsKm)} km].`
        );
        return false;
      }
    }
    return true;
  };

  const availableShuntLineOptions = useMemo(
    () => [
      { value: "downMain", label: "Down Main" },
      { value: "upMain", label: "Up Main" },
    ],
    []
  );

  const availableLineOptions = useMemo(() => {
    const options = new Set();
    if (tracks.length === 0) {
      return [
        { value: "downMain", label: "Down Main" },
        { value: "upMain", label: "Up Main" },
      ];
    }

    tracks.forEach((track) => {
      options.add(track.trackDirection);
    });

    const filteredOptions = [];
    if (options.has("downMain")) {
      filteredOptions.push({ value: "downMain", label: "Down Main" });
    }
    if (options.has("upMain")) {
      filteredOptions.push({ value: "upMain", label: "Up Main" });
    }
    return filteredOptions.length > 0
      ? filteredOptions
      : [{ value: "", label: "No Lines Configured" }];
  }, [tracks]);

  const generateSvgContent = () => {
    if (!isTrackLengthDefined || derivedTrackLengthMeters === 0) {
      alert(
        "Please enter valid and different numeric Station A and Station B ABS values to define the track length."
      );
      return "";
    }
    if (tracks.length === 0) {
      alert("Please add at least one track configuration.");
      return "";
    }

    for (const track of tracks) {
      if (track.focusFrom !== "") {
        if (!validateTrackField(track.id, "focusFrom", track.focusFrom))
          return "";
      } else {
        alert(`Track ${track.id}: "Focus from" distance is required.`);
        return "";
      }
      if (track.focusTo !== "") {
        if (!validateTrackField(track.id, "focusTo", track.focusTo)) return "";
      } else {
        alert(`Track ${track.id}: "Focus to" distance is required.`);
        return "";
      }

      const focusFromAbsKm = parseFloat(track.focusFrom);
      const focusToAbsKm = parseFloat(track.focusTo);
      if (!isNaN(focusFromAbsKm) && !isNaN(focusToAbsKm)) {
        if (isAbsDirectionNominal) {
          if (focusFromAbsKm >= focusToAbsKm) {
            alert(
              `Track ${track.id}: "Focus to" (${focusToAbsKm.toFixed(
                3
              )} km) must be greater than "Focus from" (${focusFromAbsKm.toFixed(
                3
              )} km) as Station B ABS is greater than Station A ABS.`
            );
            return "";
          }
        } else {
          if (focusFromAbsKm <= focusToAbsKm) {
            alert(
              `Track ${track.id}: "Focus to" (${focusToAbsKm.toFixed(
                3
              )} km) must be less than "Focus from" (${focusFromAbsKm.toFixed(
                3
              )} km) as Station A ABS is greater than Station B ABS.`
            );
            return "";
          }
        }
      }
    }

    for (const tagConfig of globalTagConfigs) {
      const numTagsVal = parseFloat(tagConfig.numTags);

      if (numTagsVal < 0) {
        alert(
          `Tag configuration ${tagConfig.id}: Number of tags cannot be negative.`
        );
        return "";
      }

      if (numTagsVal > 0) {
        if (tagConfig.tagStartAbs !== "") {
          if (
            !validateGlobalTagField(
              tagConfig.id,
              "tagStartAbs",
              tagConfig.tagStartAbs
            )
          )
            return "";
        } else {
          alert(
            `Tag configuration ${tagConfig.id}: "Tag start ABS" is required to draw tags.`
          );
          return "";
        }

        if (numTagsVal > 1) {
          if (tagConfig.tagEndAbs !== "") {
            if (
              !validateGlobalTagField(
                tagConfig.id,
                "tagEndAbs",
                tagConfig.tagEndAbs
              )
            )
              return "";
          } else {
            alert(
              `Tag configuration ${tagConfig.id}: "Tag end ABS" is required for multiple tags.`
            );
            return "";
          }

          if (tagConfig.distanceBetweenTagsMeters !== "") {
            if (
              !validateGlobalTagField(
                tagConfig.id,
                "distanceBetweenTagsMeters",
                tagConfig.distanceBetweenTagsMeters
              )
            )
              return "";
          } else {
            alert(
              `Tag configuration ${tagConfig.id}: "Distance between tags" is required for multiple tags.`
            );
            return "";
          }

          const globalTagStartAbsKm = parseFloat(tagConfig.tagStartAbs);
          const globalTagEndAbsKm = parseFloat(tagConfig.tagEndAbs);
          const globalDistanceBetweenTagsMeters = parseFloat(
            tagConfig.distanceBetweenTagsMeters
          );

          if (
            tagConfig.direction === "nominal" &&
            (isNaN(globalTagStartAbsKm) ||
              isNaN(globalTagEndAbsKm) ||
              globalTagStartAbsKm >= globalTagEndAbsKm)
          ) {
            alert(
              `Tag configuration ${tagConfig.id}: For Nominal (Increasing ABS Order) arrangement, "Tag end ABS" must be greater than "Tag start ABS".`
            );
            return "";
          }
          if (
            tagConfig.direction === "reverse" &&
            (isNaN(globalTagStartAbsKm) ||
              isNaN(globalTagEndAbsKm) ||
              globalTagStartAbsKm <= globalTagEndAbsKm)
          ) {
            alert(
              `Tag configuration ${tagConfig.id}: For Reverse (Decreasing ABS Order) arrangement, "Tag end ABS" must be less than "Tag start ABS".`
            );
            return "";
          }
          if (
            isNaN(globalDistanceBetweenTagsMeters) ||
            globalDistanceBetweenTagsMeters <= 0
          ) {
            alert(
              `Tag configuration ${tagConfig.id}: Distance between tags must be a positive number if more than one tag is used.`
            );
            return "";
          }
        }
      }
    }

    for (const signal of signals) {
      if (signal.signalAbs !== "") {
        if (!validateSignalField(signal.id, "signalAbs", signal.signalAbs)) {
          return "";
        }
      } else {
        alert(`Signal ${signal.id}: "Signal ABS" distance is required.`);
        return "";
      }
    }

    let totalSvgElements = "";
    let currentYOffset = VIEWBOX_PADDING_Y;

    const sortedTracks = [...tracks].sort(
      (a, b) => b.trackPosition - a.trackPosition
    );

    const trackLineYCoords = [];

    for (let i = 0; i < sortedTracks.length; i++) {
      const track = sortedTracks[i];
      const actualTrackLenMeters = derivedTrackLengthMeters;

      const drawSingleDirectionTrack = (direction, baseYOffsetInGroup) => {
        let trackSvg = "";
        const isDownMain = direction === "downMain";

        const currentLineY1 =
          baseYOffsetInGroup +
          (BLOCK_HEIGHT_PER_DIRECTION - LINE_HEIGHT) / 2 -
          20;
        const currentLineY2 = currentLineY1 + LINE_HEIGHT;
        const currentTrackCenterY = currentLineY1 + LINE_HEIGHT / 2;

        const getVisualX = (absKm) => {
          if (actualTrackLenMeters === 0) return VIEWBOX_PADDING_X;
          const relativeDistanceMetersFromMin =
            (absKm - minOverallAbsKm) * 1000;
          return (
            VIEWBOX_PADDING_X +
            (relativeDistanceMetersFromMin / actualTrackLenMeters) *
              INTERNAL_SVG_TRACK_WIDTH
          );
        };

        let trackStartX, trackEndX;
        let absDirectionText;

        if (track.trackVisualTraversalDirection === "nominal") {
          trackStartX = VIEWBOX_PADDING_X;
          trackEndX = VIEWBOX_PADDING_X + INTERNAL_SVG_TRACK_WIDTH;
          absDirectionText = isAbsDirectionNominal
            ? "Increasing ABS (L to R)"
            : "Decreasing ABS (L to R)";
        } else {
          trackStartX = VIEWBOX_PADDING_X + INTERNAL_SVG_TRACK_WIDTH;
          trackEndX = VIEWBOX_PADDING_X;
          absDirectionText = isAbsDirectionNominal
            ? "Increasing ABS (R to L)"
            : "Decreasing ABS (R to L)";
        }

        trackLineYCoords.push({
          trackId: track.id,
          direction: direction,
          centerY: currentTrackCenterY,
          y1: currentLineY1,
          y2: currentLineY2,
          visualStartX: trackStartX,
          visualEndX: trackEndX,
          absMappingMin: minOverallAbsKm,
          absMappingMax: maxOverallAbsKm,
          physicalLengthMeters: derivedTrackLengthMeters,
        });

        const visualFocusStartX = getVisualX(parseFloat(track.focusFrom));
        const visualFocusEndX = getVisualX(parseFloat(track.focusTo));

        trackSvg += `
                <text x="${
                  (VIEWBOX_PADDING_X +
                    INTERNAL_SVG_TRACK_WIDTH +
                    VIEWBOX_PADDING_X) /
                  2
                }" y="${
          baseYOffsetInGroup + 30
        }" font-family="Arial" font-size="28" fill="#333" text-anchor="middle" font-weight="bold">
                    Track ${track.id} - ${
          isDownMain ? `Down Main` : `Up Main`
        } (${absDirectionText})
                </text>
            `;

        trackSvg += `
                <text x="${VIEWBOX_PADDING_X}" y="${
          currentLineY1 - 10
        }" font-family="Arial" font-size="24" fill="#333" text-anchor="middle">
                    ${stationAAbsKm.toFixed(3)}km (St A)
                </text>
                <text x="${VIEWBOX_PADDING_X + INTERNAL_SVG_TRACK_WIDTH}" y="${
          currentLineY1 - 10
        }" font-family="Arial" font-size="24" fill="#333" text-anchor="middle">
                    ${stationBAbsKm.toFixed(3)}km (St B)
                </text>
            `;

        trackSvg += `
                <line x1="${trackStartX}" y1="${currentLineY1}" x2="${trackEndX}" y2="${currentLineY1}" stroke="black" stroke-width="4" />
                <line x1="${trackStartX}" y1="${currentLineY2}" x2="${trackEndX}" y2="${currentLineY2}" stroke="black" stroke-width="4" />
            `;

        let focusVisualWidth = Math.abs(visualFocusEndX - visualFocusStartX);
        let actualFocusStartX = Math.min(visualFocusStartX, visualFocusEndX);

        if (
          focusVisualWidth < MIN_FOCUS_VISUAL_WIDTH &&
          actualTrackLenMeters > 0
        ) {
          focusVisualWidth = MIN_FOCUS_VISUAL_WIDTH;
          if (
            actualFocusStartX + focusVisualWidth >
            VIEWBOX_PADDING_X + INTERNAL_SVG_TRACK_WIDTH
          ) {
            actualFocusStartX =
              VIEWBOX_PADDING_X + INTERNAL_SVG_TRACK_WIDTH - focusVisualWidth;
          }
          if (actualFocusStartX < VIEWBOX_PADDING_X) {
            actualFocusStartX = VIEWBOX_PADDING_X;
          }
        }

        const focusTextX = actualFocusStartX + focusVisualWidth / 2;

        if (
          !isNaN(parseFloat(track.focusFrom)) &&
          !isNaN(parseFloat(track.focusTo))
        ) {
          trackSvg += `
                    <rect
                        x="${actualFocusStartX}"
                        y="${currentLineY1}"
                        width="${focusVisualWidth}"
                        height="${LINE_HEIGHT}"
                        fill="${track.selectedColor}" 
                        opacity="0.7"
                    />
                    <text x="${focusTextX}" y="${currentTrackCenterY + 10}"
                            text-anchor="middle" font-family="Arial" font-size="24" fill="white" stroke="black" stroke-width="0.8">
                        ${parseFloat(track.focusFrom).toFixed(
                          3
                        )}km - ${parseFloat(track.focusTo).toFixed(3)}km
                    </text>
                `;
        }
        return trackSvg;
      };

      let currentTrackBlockHeight = 10;
      let yOffsetForDownMain = currentYOffset;
      let yOffsetForUpMain = currentYOffset;

      if (track.trackDirection === "downMain") {
        totalSvgElements += drawSingleDirectionTrack(
          "downMain",
          yOffsetForDownMain
        );
        currentTrackBlockHeight += BLOCK_HEIGHT_PER_DIRECTION;
      } else if (track.trackDirection === "upMain") {
        totalSvgElements += drawSingleDirectionTrack(
          "upMain",
          yOffsetForUpMain
        );
        currentTrackBlockHeight += BLOCK_HEIGHT_PER_DIRECTION;
      }

      if (currentTrackBlockHeight === 0) {
        currentTrackBlockHeight = 60;
      }

      currentYOffset += currentTrackBlockHeight + OUTER_TRACK_GAP;
    }

    let pointsSvgElement = "";
    points.forEach((pt) => {
      const pointA = parseFloat(pt.pointA);
      const pointB = parseFloat(pt.pointB);
      const abs = parseFloat(pt.abs);

      if (
        !isNaN(pointA) &&
        !isNaN(pointB) &&
        !isNaN(abs) &&
        trackLineYCoords.length >= 2
      ) {
        const getVisualX = (absKm) =>
          VIEWBOX_PADDING_X +
          (((absKm - minOverallAbsKm) * 1000) / derivedTrackLengthMeters) *
            INTERNAL_SVG_TRACK_WIDTH;

        const x = getVisualX(abs);

        const y1 = trackLineYCoords[0].centerY;
        const y2 = trackLineYCoords[1].centerY;
        const centerY = (y1 + y2) / 2;

        const svgWidth = 162;
        const svgHeight = 100;
        const scale = 2;
        let svgX = x - (svgWidth * scale) / 2;
        const rightEdge = VIEWBOX_PADDING_X + INTERNAL_SVG_TRACK_WIDTH;
        if (svgX + svgWidth * scale > rightEdge) {
          svgX = rightEdge - svgWidth * scale;
        }
        if (svgX < VIEWBOX_PADDING_X) {
          svgX = VIEWBOX_PADDING_X;
        }
        const svgY = centerY - (svgHeight * scale) / 2;

        let svgContent = "";
        if (pointA < pointB) {
          svgContent = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 162 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="161" y1="0.5" x2="111" y2="0.5" stroke="black" />
        <line x1="161.5" y1="17" x2="161.5" stroke="black" />
        <line x1="161" y1="16.5" x2="121" y2="16.5" stroke="black" />
        <line x1="121.354" y1="16.6429" x2="50.6429" y2="87.3535" stroke="black" />
        <line x1="111.354" y1="0.64286" x2="40.6429" y2="71.3535" stroke="black" />
        <line x1="51" y1="87.5" x2="1" y2="87.5" stroke="black" />
        <line x1="41" y1="71.5" x2="1" y2="71.5" stroke="black" />
        <line x1="0.5" y1="88" x2="0.5" y2="71" stroke="black" />
      </svg>`;
        } else if (pointA > pointB) {
          svgContent = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 162 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="-0.5" x2="50" y2="-0.5" transform="matrix(1 0 0 -1 1 0)" stroke="black" />
        <line y1="-0.5" x2="17" y2="-0.5" transform="matrix(0 -1 -1 0 0 17)" stroke="black" />
        <line y1="-0.5" x2="40" y2="-0.5" transform="matrix(1 0 0 -1 1 16)" stroke="black" />
        <line y1="-0.5" x2="100" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 41 16.2893)" stroke="black" />
        <line y1="-0.5" x2="100" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 51 0.289307)" stroke="black" />
        <line y1="-0.5" x2="50" y2="-0.5" transform="matrix(1 0 0 -1 111 87)" stroke="black" />
        <line y1="-0.5" x2="40" y2="-0.5" transform="matrix(1 0 0 -1 121 71)" stroke="black" />
        <line y1="-0.5" x2="17" y2="-0.5" transform="matrix(0 -1 -1 0 161 88)" stroke="black" />
      </svg>`;
        }

        if (svgContent) {
          pointsSvgElement += `
        <g transform="translate(${svgX}, ${svgY}) scale(${scale})">
          ${svgContent}
        </g>
      `;
        }
      }
    });

    const globalTagSvgElements = [];

    globalTagConfigs.forEach((tagConfig) => {
      const numTagsVal = parseFloat(tagConfig.numTags);

      if (
        numTagsVal > 0 &&
        isTrackLengthDefined &&
        derivedTrackLengthMeters > 0
      ) {
        const globalTagStartAbsKm = parseFloat(tagConfig.tagStartAbs);
        const globalTagEndAbsKm = parseFloat(tagConfig.tagEndAbs);
        const globalDistanceBetweenTagsMeters = parseFloat(
          tagConfig.distanceBetweenTagsMeters
        );

        let tagFillColor = "none";
        let tagTextColor = "black";
        let tagText = "N";

        if (tagConfig.tagType === "signalFoot") {
          tagFillColor = "blue";
          tagText = "S";
        } else if (tagConfig.tagType === "exit") {
          tagFillColor = "red";
          tagText = "X";
        } else if (tagConfig.tagType === "adjacent") {
          tagFillColor = "orange";
          tagText = "L";
        }

        trackLineYCoords.forEach((line) => {
          if (line.direction === tagConfig.selectedLine) {
            const currentTrackCenterY = line.centerY;
            const tagWidth = 50;
            const tagHeight = 70;
            const tagY = currentTrackCenterY - tagHeight / 2;

            const getTagVisualX = (absKm) => {
              if (derivedTrackLengthMeters === 0) return VIEWBOX_PADDING_X;
              const relativeDistanceMetersFromMin =
                (absKm - minOverallAbsKm) * 1000;
              return (
                VIEWBOX_PADDING_X +
                (relativeDistanceMetersFromMin / derivedTrackLengthMeters) *
                  INTERNAL_SVG_TRACK_WIDTH
              );
            };

            let tagCurrentAbsKm;
            let tagsPlaced = 0;
            let absStepKm = globalDistanceBetweenTagsMeters / 1000;

            if (tagConfig.direction === "nominal") {
              tagCurrentAbsKm = globalTagStartAbsKm;
            } else {
              tagCurrentAbsKm = globalTagStartAbsKm;
              absStepKm = -absStepKm;
            }

            const shouldContinueLoop = (currentAbs) => {
              if (numTagsVal === 1) {
                return (
                  currentAbs >= minOverallAbsKm && currentAbs <= maxOverallAbsKm
                );
              }
              if (tagConfig.direction === "nominal") {
                return currentAbs <= globalTagEndAbsKm;
              } else {
                return currentAbs >= globalTagEndAbsKm;
              }
            };

            while (
              tagsPlaced < numTagsVal &&
              shouldContinueLoop(tagCurrentAbsKm)
            ) {
              if (
                tagCurrentAbsKm < minOverallAbsKm ||
                tagCurrentAbsKm > maxOverallAbsKm
              ) {
                break;
              }

              const tagX = getTagVisualX(tagCurrentAbsKm);

              let trianglePoints;
              let textX;
              const textY = currentTrackCenterY + 5;

              if (tagConfig.direction === "nominal") {
                trianglePoints = `${tagX},${tagY} ${tagX + tagWidth},${
                  tagY + tagHeight / 2
                } ${tagX},${tagY + tagHeight}`;
                textX = tagX + tagWidth / 3 + 2;
              } else {
                trianglePoints = `${tagX},${tagY} ${tagX - tagWidth},${
                  tagY + tagHeight / 2
                } ${tagX},${tagY + tagHeight}`;
                textX = tagX - tagWidth / 3 - 2;
              }
              const tagIdText = tagConfig.tagId ? `R-${tagConfig.tagId}` : "";
              const tagIdBoxWidth =
                48 + (tagIdText.length > 4 ? (tagIdText.length - 4) * 8 : 0);
              const tagIdBoxHeight = 22;
              const tagIdBoxX = textX - tagIdBoxWidth / 2;
              const tagIdBoxY = textY + 35;

              globalTagSvgElements.push(`
  <polygon points="${trianglePoints}" fill="${tagFillColor}" stroke="black" stroke-width="2" />
  <text x="${textX}" y="${textY}" font-family="Arial" font-size="20" fill="${tagTextColor}" text-anchor="middle" alignment-baseline="middle">${tagText}</text>
  <rect
    x="${tagIdBoxX}"
    y="${tagIdBoxY}"
    width="${tagIdBoxWidth - 5}"
    height="${tagIdBoxHeight - 5}"
    rx="3"
    fill="#ffffff"
    stroke="#1000f7"
    stroke-width="1"

  />
  <text
    x="${textX}"
     y="${tagIdBoxY + (tagIdBoxHeight - 5) / 2 + tagIdBoxY / 100}"
    font-size="10"
    fill="#1000f7"
    font-weight="normal"
    text-anchor="middle"
    alignment-text="middle"
    alignment-baseline="middle"

  >
    ${tagIdText}
  </text>
  <text
    x="${textX}"
    y="${tagIdBoxY + tagIdBoxHeight + 10}"
    font-family="Arial"
    font-size="15"
    fill="#333"
    text-anchor="middle"
    alignment-baseline="middle"
  >
    ${tagCurrentAbsKm.toFixed(3)}
  </text>
`);

              tagsPlaced++;
              if (numTagsVal > 1) {
                tagCurrentAbsKm += absStepKm;
              } else {
                break;
              }
            }
          }
        });
      }
    });

    const signalSvgElements = [];

    signals.forEach((signal) => {
      const signalAbsKm = parseFloat(signal.signalAbs);
      if (isNaN(signalAbsKm)) return;

      const targetLine = trackLineYCoords.find(
        (line) => line.direction === signal.selectedLine
      );

      if (targetLine) {
        const getSignalVisualX = (absKm) => {
          if (targetLine.physicalLengthMeters === 0) return VIEWBOX_PADDING_X;
          const relativeDistanceMetersFromMin =
            (absKm - targetLine.absMappingMin) * 1000;
          return (
            VIEWBOX_PADDING_X +
            (relativeDistanceMetersFromMin / targetLine.physicalLengthMeters) *
              INTERNAL_SVG_TRACK_WIDTH
          );
        };

        const signalVisualX = getSignalVisualX(signalAbsKm);

        let SignalSvgComponent = null;
        let transformTranslateX = 0;
        let transformTranslateY = 0;
        let signalWidth = 267;
        let signalHeight = 147;
        const signalScale = 0.5;

        const scaledSignalWidth = signalWidth * signalScale;
        const scaledSignalHeight = signalHeight * signalScale;

        let arrowTipXOffsetOriginal = 0;

        if (
          signal.selectedLine === "downMain" &&
          signal.direction === "nominal"
        ) {
          SignalSvgComponent = SignalDownMainNominalSVG;
          arrowTipXOffsetOriginal = 266.005;
          const rightOffset = 128;
          transformTranslateX =
            signalVisualX - arrowTipXOffsetOriginal * signalScale + rightOffset;
          transformTranslateY = targetLine.y1 - scaledSignalHeight;
        } else if (
          signal.selectedLine === "upMain" &&
          signal.direction === "reverse"
        ) {
          SignalSvgComponent = SignalUpMainReverseSVG;
          arrowTipXOffsetOriginal = 1;
          const leftOffset = 4;

          transformTranslateX =
            signalVisualX - arrowTipXOffsetOriginal * signalScale - leftOffset;
          transformTranslateY = targetLine.y2 - scaledSignalHeight / 40;
        } else {
          return;
        }

        signalSvgElements.push(`
          <g transform="translate(${transformTranslateX}, ${transformTranslateY}) scale(${signalScale})">
            ${getSvgString(SignalSvgComponent)}
          </g>
          <text x="${signalVisualX}" y="${
          signal.selectedLine === "downMain" && signal.direction === "nominal"
            ? targetLine.y1 - scaledSignalHeight - 10
            : targetLine.y1 + scaledSignalHeight + 20
        }" font-family="Arial" font-size="20" fill="#333" text-anchor="middle">
              ${signal.signalName} (${signal.signalAbs}km)
          </text>
        `);
      }
    });
    const shuntSvgElements = [];

    shunts.forEach((shunt) => {
      const shuntAbsKm = parseFloat(shunt.shuntAbs);
      if (isNaN(shuntAbsKm)) return;

      const targetLine = trackLineYCoords.find(
        (line) => line.direction === shunt.selectedLine
      );
      if (!targetLine) return;

      const getShuntVisualX = (absKm) => {
        if (targetLine.physicalLengthMeters === 0) return VIEWBOX_PADDING_X;
        const relativeDistanceMetersFromMin =
          (absKm - targetLine.absMappingMin) * 1000;
        return (
          VIEWBOX_PADDING_X +
          (relativeDistanceMetersFromMin / targetLine.physicalLengthMeters) *
            INTERNAL_SVG_TRACK_WIDTH
        );
      };

      const shuntVisualX = getShuntVisualX(shuntAbsKm);

      const svgWidth = 511;
      const svgHeight = 845;
      const scale = 0.12;

      let ShuntSvgComponent = null;
      let translateX = shuntVisualX - (svgWidth * scale) / 2;
      let translateY = 0;

      if (shunt.selectedLine === "downMain") {
        ShuntSvgComponent = ShuntDownMainSVG;
        const rightOffset = 68;
        translateX = shuntVisualX - (svgWidth * scale) / 2 + rightOffset;
        translateY = targetLine.y2;
      } else if (shunt.selectedLine === "upMain") {
        ShuntSvgComponent = ShuntUpMainSVG;
        const liftOffset = 15;
        const rightOffset = 28;

        translateX = shuntVisualX - (svgWidth * scale) / 2 + rightOffset;
        translateY = targetLine.y1 - svgHeight * scale - liftOffset;
      } else {
        return;
      }

      shuntSvgElements.push(`
    <g transform="translate(${translateX}, ${translateY}) scale(${scale})">
      ${getSvgString(ShuntSvgComponent)}
    </g>
    <text x="${shuntVisualX}" y="${
        shunt.selectedLine === "downMain"
          ? translateY + svgHeight * scale + 20
          : translateY - 10
      }" font-family="Arial" font-size="18" fill="#333" text-anchor="middle">
      ${shunt.shuntName} (${shunt.shuntAbs}km)
    </text>
  `);
    });

    const bslbSvgElements = [];
    bslbs.forEach((bslb) => {
      const absKm = parseFloat(bslb.abs);
      if (isNaN(absKm)) return;
      const targetLine = trackLineYCoords.find(
        (line) => line.direction === bslb.selectedLine
      );
      if (!targetLine) return;

      const getVisualX = (absKm) =>
        VIEWBOX_PADDING_X +
        (((absKm - minOverallAbsKm) * 1000) / derivedTrackLengthMeters) *
          INTERNAL_SVG_TRACK_WIDTH;
      const bslbVisualX = getVisualX(absKm);

      const svgWidth = 133;
      const svgHeight = 71;
      const scale = 1.035;

      let BslbSvgComponent = null;
      let translateX = bslbVisualX - (svgWidth * scale) / 2;
      let translateY = 0;

      if (bslb.selectedLine === "downMain" && bslb.direction === "nominal") {
        BslbSvgComponent = BSLBDownMainNominalSVG;
        const liftOffset = 22;
        const leftOffset = 38;
        translateX = bslbVisualX - 82 * scale - leftOffset;
        translateY = targetLine.y1 - 51 * scale - liftOffset;
      } else if (
        bslb.selectedLine === "upMain" &&
        bslb.direction === "reverse"
      ) {
        BslbSvgComponent = BSLBUpMainReverseSVG;
        const liftOffset = 62;
        const rightOffset = 42;
        translateX = bslbVisualX - 50.5 * scale + rightOffset;
        translateY = targetLine.y2 - 51 * scale - liftOffset;
      } else {
        return;
      }

      const verticalOffset = 8; // Adjust vertical offset for  placement of bslb (arrow tip)
      bslbSvgElements.push(`
    <g transform="translate(${translateX}, ${
        translateY + verticalOffset
      }) scale(${scale})">
      ${getSvgString(BslbSvgComponent)}
    </g>
    <text x="${bslbVisualX}" y="${
        bslb.selectedLine === "downMain" && bslb.direction === "nominal"
          ? targetLine.y1 - 55 * scale
          : targetLine.y2 + 60 * scale
      }" font-family="Arial" font-size="18" fill="#333" text-anchor="middle">
      BSLB (${bslb.abs}km)
    </text>
  `);
    });

    const cautionBoardSvgElements = [];
    cautionBoards.forEach((cb) => {
      const absKm = parseFloat(cb.abs);
      if (isNaN(absKm)) return;
      const targetLine = trackLineYCoords.find(
        (line) => line.direction === cb.selectedLine
      );
      if (!targetLine) return;

      const getCbVisualX = (absKm) => {
        if (targetLine.physicalLengthMeters === 0) return VIEWBOX_PADDING_X;
        const relativeDistanceMetersFromMin =
          (absKm - targetLine.absMappingMin) * 1000;
        return (
          VIEWBOX_PADDING_X +
          (relativeDistanceMetersFromMin / targetLine.physicalLengthMeters) *
            INTERNAL_SVG_TRACK_WIDTH
        );
      };

      const cbVisualX = getCbVisualX(absKm);

      const svgWidth = 1382;
      const svgHeight = 1143;
      const scale = 0.08;

      let CautionBoardSvgComponent = null;
      let translateX = cbVisualX - (svgWidth * scale) / 2;
      let translateY = 0;

      if (cb.selectedLine === "downMain" && cb.direction === "nominal") {
        CautionBoardSvgComponent = CautionBoardDownMainNominalSVG;
        translateX = cbVisualX - 39 * scale;
        translateY = targetLine.y1 - 1143 * scale;
      } else if (cb.selectedLine === "upMain" && cb.direction === "reverse") {
        CautionBoardSvgComponent = CautionBoardUpMainReverseSVG;
        translateX = cbVisualX - 1343 * scale;
        translateY = targetLine.y2;
      } else {
        return;
      }

      cautionBoardSvgElements.push(`
    <g transform="translate(${translateX}, ${translateY}) scale(${scale})">
      ${getSvgString(CautionBoardSvgComponent)}
    </g>
    <text x="${cbVisualX}" y="${
        cb.selectedLine === "downMain" && cb.direction === "nominal"
          ? targetLine.y1 - 40 * scale
          : targetLine.y2 + 60 * scale
      }" font-family="Arial" font-size="18" fill="#333" text-anchor="middle">
      Caution Board (${cb.abs}km)
    </text>
  `);
    });

    const lcGateSvgElements = [];
    if (lcGates.length > 0 && trackLineYCoords.length > 0) {
      const minY = Math.min(...trackLineYCoords.map((line) => line.y1));
      const maxY = Math.max(...trackLineYCoords.map((line) => line.y2));
      const centerY = (minY + maxY) / 2;
      const verticalSpan = maxY - minY;

      lcGates.forEach((lc) => {
        const absKm = parseFloat(lc.abs);
        if (isNaN(absKm)) return;

        const line = trackLineYCoords[0];
        const getLcVisualX = (absKm) => {
          if (line.physicalLengthMeters === 0) return VIEWBOX_PADDING_X;
          const relativeDistanceMetersFromMin =
            (absKm - line.absMappingMin) * 1000;
          return (
            VIEWBOX_PADDING_X +
            (relativeDistanceMetersFromMin / line.physicalLengthMeters) *
              INTERNAL_SVG_TRACK_WIDTH
          );
        };
        const lcVisualX = getLcVisualX(absKm);

        let LCGateSvgComponent = null;
        let svgWidth = 0;
        let svgHeight = 0;
        let scale = 1;
        let translateX = 0;
        let translateY = 0;

        let centerDashedX = 0;
        if (lc.lcType === "INTERLOCKED" && lc.operationType === "MANNED") {
          LCGateSvgComponent = LCInterlockedMannedSVG;
          svgWidth = 4610;
          svgHeight = 10274;
          scale = (verticalSpan * 2) / svgHeight;
          translateX = lcVisualX - (svgWidth * scale) / 2;
          translateY = centerY - (svgHeight * scale) / 2;
          centerDashedX = (1889.25 + 2727) / 2;
        } else if (
          lc.lcType === "NON-INTERLOCKED" &&
          lc.operationType === "UNMANNED"
        ) {
          LCGateSvgComponent = LCNonInterlockedUnmannedSVG;
          svgWidth = 694;
          svgHeight = 10274;
          scale = (verticalSpan * 2) / svgHeight;
          translateX = lcVisualX - (svgWidth * scale) / 2;
          translateY = centerY - (svgHeight * scale) / 2;
          centerDashedX = (5 + 689) / 2;
        } else {
          return;
        }

        const textX = translateX + centerDashedX * scale + 0;
        const textY = translateY + (svgHeight * scale) / 2;

        lcGateSvgElements.push(`
  <g transform="translate(${translateX}, ${translateY}) scale(${scale})">
    ${getSvgString(LCGateSvgComponent)}
  </g>
<text
  x="${textX}"
  y="${textY}"
  font-family="Arial"
  font-size="18"
  fill="#333"
  text-anchor="middle"
  alignment-baseline="middle"
  transform="rotate(90, ${textX}, ${textY})"
>
  LC Gate ${lc.lcNumber} (${lc.abs}km)
</text>
`);
      });
    }

    const viewBoxWidth = INTERNAL_SVG_TRACK_WIDTH + 2 * VIEWBOX_PADDING_X;
    const viewBoxHeight = currentYOffset + VIEWBOX_PADDING_Y;

    const finalSvg = `
      <svg
        id="trackLayoutSvg"
        width="100%"
        height="auto"
        viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="${viewBoxWidth}" height="${viewBoxHeight}" fill="white" />
        ${totalSvgElements}
        ${globalTagSvgElements.join("")}
        ${signalSvgElements.join("")}
        ${shuntSvgElements.join("")}
        ${bslbSvgElements.join("")}
        ${cautionBoardSvgElements.join("")}
        ${lcGateSvgElements.join("")}
        ${pointsSvgElement}

      </svg>
    `;

    return finalSvg;
  };

  const openSvgInNewTab = () => {
    const svgContent = generateSvgContent();
    if (!svgContent) return;

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE HTML>
        <html>
        <head>
          <style>
            body {
              border-style : solid;
              border-width : 1px;
              margin: 5;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 0;
              box-sizing: border-box;
            }
            .svg-container {
              width: 100%;
              margin: 0 auto;
            }
            svg {
                display: block;
            }

          </style>

        </head>
        <body>

          <div class="svg-container">
            ${svgContent}
          </div>
        </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      alert(
        "Pop-up blocked! Please allow pop-ups for this site to view the SVG."
      );
    }
  };

  const getCurrentConfigState = () => ({
    stationA,
    stationB,
    tracks,
    globalTagConfigs,
    signals,
    shunts,
    bslbs,
    cautionBoards,
    lcGates,
    points,
  });

  const saveConfiguration = async () => {
    try {
      const configToSave = getCurrentConfigState();
      const response = await fetch("http://localhost:5000/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(configToSave),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Failed to save configuration. Check console for details.");
    }
  };

  const loadConfiguration = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/load-config");
      const data = await response.json();
      if (data.success) {
        const loadedData = data.data;

        setStationA({
          name: loadedData.stationA.name,
          id: loadedData.stationA.id,
          abs: loadedData.stationA.abs.toString(),
        });
        setStationB({
          name: loadedData.stationB.name,
          id: loadedData.stationB.id,
          abs: loadedData.stationB.abs.toString(),
        });

        setTracks(
          loadedData.tracks.map((t) => ({
            ...t,
            focusFrom: t.focusFrom !== null ? t.focusFrom.toString() : "",
            focusTo: t.focusTo !== null ? t.focusTo.toString() : "",
            trackPosition: t.trackPosition,
          }))
        );
        setGlobalTagConfigs(
          loadedData.globalTagConfigs.map((gt) => ({
            ...gt,
            numTags: gt.numTags !== null ? gt.numTags.toString() : "",
            tagStartAbs:
              gt.tagStartAbs !== null ? gt.tagStartAbs.toString() : "",
            tagEndAbs: gt.tagEndAbs !== null ? gt.tagEndAbs.toString() : "",
            distanceBetweenTagsMeters:
              gt.distanceBetweenTagsMeters !== null
                ? gt.distanceBetweenTagsMeters.toString()
                : "",
            tagId: gt.tagId !== null ? gt.tagId.toString() : "",
          }))
        );
        setSignals(
          loadedData.signals.map((s) => ({
            ...s,
            signalAbs: s.signalAbs !== null ? s.signalAbs.toString() : "",
          }))
        );
        setShunts(
          loadedData.shunts.map((s) => ({
            ...s,
            shuntAbs: s.shuntAbs !== null ? s.shuntAbs.toString() : "",
          }))
        );
        setBslbs(
          loadedData.bslbs.map((b) => ({
            ...b,
            abs: b.abs !== null ? b.abs.toString() : "",
          }))
        );
        setCautionBoards(
          loadedData.cautionBoards.map((cb) => ({
            ...cb,
            abs: cb.abs !== null ? cb.abs.toString() : "",
          }))
        );
        setLcGates(
          loadedData.lcGates.map((lc) => ({
            ...lc,
            lcNumber: lc.lcNumber !== null ? lc.lcNumber.toString() : "",
            abs: lc.abs !== null ? lc.abs.toString() : "",
          }))
        );
        setPoints(
          loadedData.points.map((p) => ({
            ...p,
            pointA: p.pointA !== null ? p.pointA.toString() : "",
            pointB: p.pointB !== null ? p.pointB.toString() : "",
            abs: p.abs !== null ? p.abs.toString() : "",
          }))
        );

        const maxTrackId =
          loadedData.tracks.length > 0
            ? Math.max(...loadedData.tracks.map((t) => t.id))
            : 0;
        setNextTrackId(maxTrackId + 1);

        const maxTagId =
          loadedData.globalTagConfigs.length > 0
            ? Math.max(...loadedData.globalTagConfigs.map((t) => t.id))
            : 0;
        setNextTagConfigId(maxTagId + 1);

        const maxSignalId =
          loadedData.signals.length > 0
            ? Math.max(...loadedData.signals.map((s) => s.id))
            : 0;
        setNextSignalId(maxSignalId + 1);

        const maxShuntId =
          loadedData.shunts.length > 0
            ? Math.max(...loadedData.shunts.map((s) => s.id))
            : 0;
        setNextShuntId(maxShuntId + 1);

        const maxBslbId =
          loadedData.bslbs.length > 0
            ? Math.max(...loadedData.bslbs.map((b) => b.id))
            : 0;
        setNextBslbId(maxBslbId + 1);

        const maxCbId =
          loadedData.cautionBoards.length > 0
            ? Math.max(...loadedData.cautionBoards.map((cb) => cb.id))
            : 0;
        setNextCautionBoardId(maxCbId + 1);

        const maxLcId =
          loadedData.lcGates.length > 0
            ? Math.max(...loadedData.lcGates.map((lc) => lc.id))
            : 0;
        setNextLcGateId(maxLcId + 1);

        const maxPointId =
          loadedData.points.length > 0
            ? Math.max(...loadedData.points.map((p) => p.id))
            : 0;
        setNextPointId(maxPointId + 1);

        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error loading configuration:", error);
      alert("Failed to load configuration. Check console for details.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        width: "100%",
        margin: "0",
      }}
    >
      <h1>Track Layout Generator</h1>

      <div
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Configuration</h2>
        <div
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
        >
          <button
            onClick={() => setActiveAppTab("stationDetails")}
            style={{
              padding: "8px 12px",
              marginRight: "8px",
              backgroundColor:
                activeAppTab === "stationDetails" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "stationDetails" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Station Details
          </button>
          <button
            onClick={() => setActiveAppTab("trackConfigurations")}
            style={{
              padding: "8px 12px",
              marginRight: "8px",
              backgroundColor:
                activeAppTab === "trackConfigurations" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "trackConfigurations" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Track Specifics
          </button>
          <button
            onClick={() => setActiveAppTab("tags")}
            style={{
              padding: "8px 12px",
              marginRight: "8px",
              backgroundColor: activeAppTab === "tags" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "tags" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Tags
          </button>
          <button
            onClick={() => setActiveAppTab("signals")}
            style={{
              padding: "8px 12px",
              backgroundColor:
                activeAppTab === "signals" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "signals" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "8px",
            }}
          >
            Signals
          </button>
          <button
            onClick={() => setActiveAppTab("shunts")}
            style={{
              padding: "8px 12px",
              backgroundColor:
                activeAppTab === "shunts" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "shunts" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Shunts
          </button>

          <button
            onClick={() => setActiveAppTab("bslb")}
            style={{
              padding: "8px 12px",
              backgroundColor: activeAppTab === "bslb" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "bslb" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            BSLB
          </button>

          <button
            onClick={() => setActiveAppTab("cautionBoards")}
            style={{
              padding: "8px 12px",
              backgroundColor:
                activeAppTab === "cautionBoards" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "cautionBoards" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            Caution Boards
          </button>

          <button
            onClick={() => setActiveAppTab("lcGates")}
            style={{
              padding: "8px 12px",
              backgroundColor:
                activeAppTab === "lcGates" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "lcGates" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            LC Gates
          </button>

          <button
            onClick={() => setActiveAppTab("points")}
            style={{
              padding: "8px 12px",
              backgroundColor:
                activeAppTab === "points" ? "#007bff" : "#e9ecef",
              color: activeAppTab === "points" ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            Points
          </button>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {activeAppTab === "stationDetails" && (
          <StationDetailsForm
            stationA={stationA}
            stationB={stationB}
            handleStationAChange={handleStationAChange}
            handleStationBChange={handleStationBChange}
            isTrackLengthDefined={isTrackLengthDefined}
            derivedTrackLengthKm={derivedTrackLengthKm}
          />
        )}

        {activeAppTab === "trackConfigurations" && (
          <>
            <button
              onClick={handleAddTrack}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New Track Configuration
            </button>

            {tracks.map((track) => (
              <TrackFormCard
                key={track.id}
                track={track}
                onUpdate={handleUpdateTrack}
                onRemove={handleRemoveTrack}
                colors={colors}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
                onValidateField={validateTrackField}
                isTrackLengthDefined={isTrackLengthDefined}
                isAbsDirectionNominal={isAbsDirectionNominal}
              />
            ))}
          </>
        )}

        {activeAppTab === "tags" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
              Global Tags Configuration
            </h3>

            <button
              onClick={handleAddTagConfig}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New Tag Configuration
            </button>

            {globalTagConfigs.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No tag configurations added yet.
              </p>
            )}

            {globalTagConfigs.map((tagConfig) => (
              <GlobalTagFormCard
                key={tagConfig.id}
                tagConfig={tagConfig}
                onUpdate={handleGlobalTagChange}
                onRemove={handleRemoveTagConfig}
                tagTypes={tagTypes}
                lineOptions={availableLineOptions}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
                onValidateField={validateGlobalTagField}
                isTrackLengthDefined={isTrackLengthDefined}
                isAbsDirectionNominal={isAbsDirectionNominal}
              />
            ))}
          </div>
        )}

        {activeAppTab === "signals" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
              Signals Configuration
            </h3>

            <button
              onClick={handleAddSignal}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New Signal Configuration
            </button>

            {signals.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No signal configurations added yet.
              </p>
            )}

            {signals.map((signal) => (
              <SignalFormCard
                key={signal.id}
                signal={signal}
                onUpdate={handleUpdateSignal}
                onRemove={handleRemoveSignal}
                lineOptions={availableLineOptions}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
                onValidateField={validateSignalField}
                isTrackLengthDefined={isTrackLengthDefined}
              />
            ))}
          </div>
        )}

        {activeAppTab === "shunts" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
              Shunts Configuration
            </h3>
            <button
              onClick={handleAddShunt}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New Shunt
            </button>
            {shunts.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No shunts added yet.
              </p>
            )}
            {shunts.map((shunt) => (
              <ShuntFormCard
                key={shunt.id}
                shunt={shunt}
                onUpdate={handleUpdateShunt}
                onRemove={handleRemoveShunt}
                lineOptions={availableShuntLineOptions}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
                isTrackLengthDefined={isTrackLengthDefined}
                onValidateField={validateShuntField}
              />
            ))}
          </div>
        )}

        {activeAppTab === "bslb" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
              BSLB Configuration
            </h3>
            <button
              onClick={handleAddBslb}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New BSLB
            </button>
            {bslbs.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No BSLB added yet.
              </p>
            )}
            {bslbs.map((bslb) => (
              <BSLBFormCard
                key={bslb.id}
                bslb={bslb}
                onUpdate={handleUpdateBslb}
                onRemove={handleRemoveBslb}
                lineOptions={[
                  { value: "downMain", label: "Down Main" },
                  { value: "upMain", label: "Up Main" },
                ]}
                isTrackLengthDefined={isTrackLengthDefined}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
              />
            ))}
          </div>
        )}

        {activeAppTab === "cautionBoards" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
              Caution Boards Configuration
            </h3>
            <button
              onClick={handleAddCautionBoard}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New Caution Board
            </button>
            {cautionBoards.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No Caution Boards added yet.
              </p>
            )}
            {cautionBoards.map((cb) => (
              <CautionBoardFormCard
                key={cb.id}
                cb={cb}
                onUpdate={handleUpdateCautionBoard}
                onRemove={handleRemoveCautionBoard}
                lineOptions={[
                  { value: "downMain", label: "Down Main" },
                  { value: "upMain", label: "Up Main" },
                ]}
                isTrackLengthDefined={isTrackLengthDefined}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
              />
            ))}
          </div>
        )}

        {activeAppTab === "lcGates" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#333" }}>
              LC Gates Configuration
            </h3>
            <button
              onClick={handleAddLcGate}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New LC Gate
            </button>
            {lcGates.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "20px",
                }}
              >
                No LC Gates added yet.
              </p>
            )}
            {lcGates.map((lc) => (
              <LCGateFormCard
                key={lc.id}
                lc={lc}
                onUpdate={handleUpdateLcGate}
                onRemove={handleRemoveLcGate}
                isTrackLengthDefined={isTrackLengthDefined}
                stationAAbsKm={stationAAbsKm}
                stationBAbsKm={stationBAbsKm}
              />
            ))}
          </div>
        )}

        {activeAppTab === "points" && (
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginTop: 0, marginBottom: 20, color: "#333" }}>
              Points Configuration
            </h3>
            <button
              type="button"
              onClick={handleAddPoint}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Add New Point
            </button>
            {points.length === 0 && (
              <p style={{ color: "#666", marginTop: "20px" }}>
                No points added yet.
              </p>
            )}
            {points.map((pt, idx) => (
              <PointsFormCard
                key={pt.id}
                point={pt}
                onUpdate={handleUpdatePoint}
                onRemove={handleRemovePoint}
                idx={idx}
              />
            ))}
          </div>
        )}

        <button
          onClick={openSvgInNewTab}
          style={{
            padding: "12px 25px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "18px",
            marginTop: "30px",
            width: "100%",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          Generate and View Full Layout
        </button>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={saveConfiguration}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Save Configuration
          </button>
          <button
            onClick={loadConfiguration}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Load Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
