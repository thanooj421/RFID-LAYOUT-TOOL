// server/server.js

const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000; // Choose a different port than your React app

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

// Path to your SQLite database file (it will be created if it doesn't exist)
const dbPath = path.join(__dirname, "track_layout.db");
const db = new Database(dbPath);

// --- Database Schema (Run this once to set up your tables) ---
db.exec(`
  CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    station_id TEXT NOT NULL UNIQUE,
    abs REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tin_id TEXT,
    focus_from REAL,
    focus_to REAL,
    selected_color TEXT,
    track_direction TEXT,
    track_position INTEGER,
    track_visual_traversal_direction TEXT
  );

  CREATE TABLE IF NOT EXISTS global_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_line TEXT,
    direction TEXT,
    tag_type TEXT,
    num_tags INTEGER,
    tag_start_abs REAL,
    tag_end_abs REAL,
    distance_between_tags_meters REAL,
    tag_id TEXT
  );

  CREATE TABLE IF NOT EXISTS tag_ranges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start TEXT,
    end TEXT);

  CREATE TABLE IF NOT EXISTS signals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    signal_name TEXT,
    signal_abs REAL,
    signal_type TEXT,
    default_aspect TEXT,
    selected_line TEXT,
    direction TEXT
  );

  CREATE TABLE IF NOT EXISTS shunts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_line TEXT,
    shunt_name TEXT,
    shunt_abs REAL
  );

  CREATE TABLE IF NOT EXISTS bslbs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_line TEXT,
    direction TEXT,
    abs REAL
  );

  CREATE TABLE IF NOT EXISTS caution_boards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selected_line TEXT,
    direction TEXT,
    abs REAL
  );

  CREATE TABLE IF NOT EXISTS lc_gates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lc_number TEXT,
    lc_type TEXT,
    operation_type TEXT,
    lc_class TEXT,
    abs REAL
  );

  CREATE TABLE IF NOT EXISTS points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    point_a TEXT,
    point_b TEXT,
    abs REAL
  );

  CREATE TABLE IF NOT EXISTS track_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    line TEXT,
    direction TEXT,
    start_abs REAL,
    end_abs REAL,
    track_section_name TEXT
  );
`);

// --- API Endpoints ---

// Endpoint to save all configuration data
app.post("/api/save-config", (req, res) => {
  const {
    stationA,
    stationB,
    tracks,
    globalTagConfigs,
    tagRanges,
    signals,
    shunts,
    bslbs,
    cautionBoards,
    lcGates,
    points,
    trackSections,
  } = req.body;

  let success = true;
  let message = "Configuration saved successfully.";

  try {
    // Start a transaction for atomicity
    db.transaction(() => {
      // Clear existing data before inserting new data
      db.exec("DELETE FROM stations");
      db.exec("DELETE FROM tracks");
      db.exec("DELETE FROM global_tags");
      db.exec("DELETE FROM tag_ranges");
      db.exec("DELETE FROM signals");
      db.exec("DELETE FROM shunts");
      db.exec("DELETE FROM bslbs");
      db.exec("DELETE FROM caution_boards");
      db.exec("DELETE FROM lc_gates");
      db.exec("DELETE FROM points");
      db.exec("DELETE FROM track_sections");

      // Insert Station A
      const insertStationA = db.prepare(
        "INSERT INTO stations (name, station_id, abs) VALUES (?, ?, ?)"
      );
      insertStationA.run(stationA.name, stationA.id, parseFloat(stationA.abs));

      // Insert Station B
      const insertStationB = db.prepare(
        "INSERT INTO stations (name, station_id, abs) VALUES (?, ?, ?)"
      );
      insertStationB.run(stationB.name, stationB.id, parseFloat(stationB.abs));

      // Insert Tracks
      const insertTrack = db.prepare(`
        INSERT INTO tracks (tin_id, focus_from, focus_to, selected_color, track_direction, track_position, track_visual_traversal_direction)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      tracks.forEach((track) => {
        insertTrack.run(
          track.tinId,
          parseFloat(track.focusFrom),
          parseFloat(track.focusTo),
          track.selectedColor,
          track.trackDirection,
          track.trackPosition,
          track.trackVisualTraversalDirection
        );
      });

      // Insert Global Tags
      const insertTag = db.prepare(`
        INSERT INTO global_tags (selected_line, direction, tag_type, num_tags, tag_start_abs, tag_end_abs, distance_between_tags_meters, tag_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      globalTagConfigs.forEach((tag) => {
        insertTag.run(
          tag.selectedLine,
          tag.direction,
          tag.tagType,
          parseInt(tag.numTags),
          parseFloat(tag.tagStartAbs),
          parseFloat(tag.tagEndAbs),
          parseFloat(tag.distanceBetweenTagsMeters),
          tag.tagId
        );
      });

      // Insert Tag Ranges
      const insertTagRange = db.prepare(`
        insert into tag_ranges (start,end)
        values (?, ?)`);
      (tagRanges || []).forEach((range) => {
        insertTagRange.run(range.start, range.end);
      });

      // Insert Signals
      const insertSignal = db.prepare(`
        INSERT INTO signals (signal_name, signal_abs, signal_type, default_aspect, selected_line, direction)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      signals.forEach((signal) => {
        insertSignal.run(
          signal.signalName,
          parseFloat(signal.signalAbs),
          signal.signalType,
          signal.defaultAspect,
          signal.selectedLine,
          signal.direction
        );
      });

      // Insert Shunts
      const insertShunt = db.prepare(`
        INSERT INTO shunts (selected_line, shunt_name, shunt_abs)
        VALUES (?, ?, ?)
      `);
      shunts.forEach((shunt) => {
        insertShunt.run(
          shunt.selectedLine,
          shunt.shuntName,
          parseFloat(shunt.shuntAbs)
        );
      });

      // Insert BSLBs
      const insertBslb = db.prepare(`
        INSERT INTO bslbs (selected_line, direction, abs)
        VALUES (?, ?, ?)
      `);
      bslbs.forEach((bslb) => {
        insertBslb.run(bslb.selectedLine, bslb.direction, parseFloat(bslb.abs));
      });

      // Insert Caution Boards
      const insertCautionBoard = db.prepare(`
        INSERT INTO caution_boards (selected_line, direction, abs)
        VALUES (?, ?, ?)
      `);
      cautionBoards.forEach((cb) => {
        insertCautionBoard.run(
          cb.selectedLine,
          cb.direction,
          parseFloat(cb.abs)
        );
      });

      // Insert LC Gates
      const insertLcGate = db.prepare(`
        INSERT INTO lc_gates (lc_number, lc_type, operation_type, lc_class, abs)
        VALUES (?, ?, ?, ?, ?)
      `);
      lcGates.forEach((lc) => {
        insertLcGate.run(
          lc.lcNumber,
          lc.lcType,
          lc.operationType,
          lc.lcClass,
          parseFloat(lc.abs)
        );
      });

      // Insert Track Sections
      const insertTrackSection = db.prepare(`
        INSERT INTO track_sections (title, line, direction, start_abs, end_abs, track_section_name)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      trackSections.forEach((section) => {
        insertTrackSection.run(
          section.title,
          section.selectedLine, // FIXED: was section.line, now section.selectedLine
          section.direction,
          parseFloat(section.startAbs),
          parseFloat(section.endAbs),
          section.trackSectionName
        );
      });

      // Insert Points
      const insertPoint = db.prepare(`
        INSERT INTO points (point_a, point_b, abs)
        VALUES (?, ?, ?)
      `);
      points.forEach((point) => {
        insertPoint.run(point.pointA, point.pointB, parseFloat(point.abs));
      });
    })(); // Execute the transaction
  } catch (error) {
    success = false;
    message = `Failed to save configuration: ${error.message}`;
    console.error("Database save error:", error);
  }

  res.json({ success, message });
});

// Endpoint to load all configuration data
app.get("/api/load-config", (req, res) => {
  try {
    // Note: The `stations` table design means stationA will be the first entry and stationB the second.
    // If you always insert Station A then Station B, this will work.
    // A more robust approach might be to add a 'type' column (e.g., 'stationA', 'stationB') to the stations table.
    const stationA = db
      .prepare("SELECT name, station_id as id, abs FROM stations LIMIT 1")
      .get();
    const stationB = db
      .prepare(
        "SELECT name, station_id as id, abs FROM stations LIMIT 1 OFFSET 1"
      )
      .get();

    const tracks = db.prepare("SELECT * FROM tracks").all();
    const globalTagConfigs = db.prepare("SELECT * FROM global_tags").all();
    const tagRanges = db.prepare("SELECT * FROM tag_ranges").all();
    const signals = db.prepare("SELECT * FROM signals").all();
    const shunts = db.prepare("SELECT * FROM shunts").all();
    const bslbs = db.prepare("SELECT * FROM bslbs").all();
    const cautionBoards = db.prepare("SELECT * FROM caution_boards").all();
    const lcGates = db.prepare("SELECT * FROM lc_gates").all();
    const points = db.prepare("SELECT * FROM points").all();
    const trackSections = db.prepare("SELECT * FROM track_sections").all();

    res.json({
      success: true,
      data: {
        // Provide empty objects/arrays if no data is found, to prevent frontend errors
        stationA: stationA || { name: "", id: "", abs: "" },
        stationB: stationB || { name: "", id: "", abs: "" },
        tracks:
          tracks.map((t) => ({
            id: t.id,
            tinId: t.tin_id ? t.tin_id.toString() : "",
            focusFrom: t.focus_from !== null ? t.focus_from.toString() : "",
            focusTo: t.focus_to !== null ? t.focus_to.toString() : "",
            selectedColor: t.selected_color,
            trackDirection: t.track_direction,
            trackPosition: t.track_position,
            trackVisualTraversalDirection: t.track_visual_traversal_direction,
          })) || [],
        globalTagConfigs:
          globalTagConfigs.map((gt) => ({
            id: gt.id,
            selectedLine: gt.selected_line,
            direction: gt.direction,
            tagType: gt.tag_type,
            numTags: gt.num_tags !== null ? gt.num_tags.toString() : "",
            tagStartAbs:
              gt.tag_start_abs !== null ? gt.tag_start_abs.toString() : "",
            tagEndAbs: gt.tag_end_abs !== null ? gt.tag_end_abs.toString() : "",
            distanceBetweenTagsMeters:
              gt.distance_between_tags_meters !== null
                ? gt.distance_between_tags_meters.toString()
                : "",
            tagId: gt.tag_id !== null ? gt.tag_id.toString() : "",
          })) || [],
        tagRanges:
          tagRanges.map((r) => ({
            id: r.id,
            start: r.start,
            end: r.end,
          })) || [],
        signals:
          signals.map((s) => ({
            id: s.id,
            signalName: s.signal_name,
            signalAbs: s.signal_abs !== null ? s.signal_abs.toString() : "",
            signalType: s.signal_type,
            defaultAspect: s.default_aspect,
            selectedLine: s.selected_line,
            direction: s.direction,
          })) || [],
        shunts:
          shunts.map((s) => ({
            id: s.id,
            selectedLine: s.selected_line,
            shuntName: s.shunt_name,
            shuntAbs: s.shunt_abs !== null ? s.shunt_abs.toString() : "",
          })) || [],
        bslbs:
          bslbs.map((b) => ({
            id: b.id,
            selectedLine: b.selected_line,
            direction: b.direction,
            abs: b.abs !== null ? b.abs.toString() : "",
          })) || [],
        cautionBoards:
          cautionBoards.map((cb) => ({
            id: cb.id,
            selectedLine: cb.selected_line,
            direction: cb.direction,
            abs: cb.abs !== null ? cb.abs.toString() : "",
          })) || [],
        lcGates:
          lcGates.map((lc) => ({
            id: lc.id,
            lcNumber: lc.lc_number !== null ? lc.lc_number.toString() : "",
            lcType: lc.lc_type,
            operationType: lc.operation_type,
            lcClass: lc.lc_class,
            abs: lc.abs !== null ? lc.abs.toString() : "",
          })) || [],
        points:
          points.map((p) => ({
            id: p.id,
            pointA: p.point_a !== null ? p.point_a.toString() : "",
            pointB: p.point_b !== null ? p.point_b.toString() : "",
            abs: p.abs !== null ? p.abs.toString() : "",
          })) || [],
        trackSections:
          trackSections.map((section) => ({
            id: section.id,
            title: section.title,
            selectedLine: section.line,
            direction: section.direction,
            startAbs:
              section.start_abs !== null ? section.start_abs.toString() : "",
            endAbs: section.end_abs !== null ? section.end_abs.toString() : "",
            trackSectionName: section.track_section_name || "",
          })) || [],
      },
    });
  } catch (error) {
    console.error("Database load error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load configuration." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
