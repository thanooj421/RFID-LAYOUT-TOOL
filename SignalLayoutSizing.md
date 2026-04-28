Adjusting SVG sizes in SignalLayoutBuilder.js

Primary place to change sizes
- Edit the CONFIG object near the top of the file:
  - ASPECT_WIDTH: pixel width per main aspect (Red/Yellow/Green/Default)
  - MARKER_WIDTH: pixel width for marker plates (Calling On, Automatic, Gate, Permissive, Repeater)
  - SHUNT_WIDTH: pixel width for the dependent shunt symbol
  - MINIATURE_WIDTH: pixel width for the miniature calling-on + shunt strip
  - GAP: horizontal spacing between items

How scaling works
- Each item is scaled by width/rawW, preserving aspect ratio.
- width comes from CONFIG.*.
- rawW/rawH come from RAW and must match the source SVG’s viewBox.

When to touch RAW
- Only update RAW if the source SVG’s viewBox values change:
  - aspectSquare: 1000x1000 (Red/Yellow/Green/DefaultRed/DefaultGreen)
  - aspectDY: 1415x1415 (DefaultYellow)
  - marker: 1000x343 (CallingOn/Automatic/Gate/Permissive/Repeater)
  - shunt: 1000x500 (DependentShuntSVG)
  - miniature: 1420x378 (DependentShuntCallingOnMiniatureSvg)
  - blockInstrument: 673x349 (BlockInstrumentSVG)

Other related tweaks
- Spacing: CONFIG.GAP.
- Label text size: change font-size="14" in the label string near the end of buildSignalSvg.
- Track scaling (do not use for symbol sizing): INTERNAL_SVG_TRACK_WIDTH and VIEWBOX_PADDING_X in opts affect mapping along the track, not icon sizes.

Quick examples
- Make everything smaller: reduce ASPECT_WIDTH/MARKER_WIDTH/SHUNT_WIDTH/MINIATURE_WIDTH by the same percentage.
- Fix a single icon that looks too big/small: first verify RAW entry matches that component’s viewBox; then adjust the corresponding CONFIG width if you simply want it larger/smaller on canvas.