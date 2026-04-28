import React from "react";

/* 
  Helper function to calculate height from width while maintaining aspect ratio.
  All SVG components will use this.
*/
const calculateHeight = (size, viewBox) => {
  if (!viewBox) return size; // Default to square if no viewBox
  const parts = viewBox.split(" ");
  const viewW = parseFloat(parts[2]);
  const viewH = parseFloat(parts[3]);
  if (!viewW || !viewH) return size;
  return (size * viewH) / viewW;
};

export const NoMarkerSVG = ({ size = 24 }) => (
  <g>
    <svg
      width={size}
      height={size}
      viewBox="0 0 170 334"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 116H170" stroke="black" stroke-width="10" />
      <path
        d="M25 5C25 2.23858 22.7614 1.20706e-07 20 0C17.2386 -1.20706e-07 15 2.23858 15 5L20 5L25 5ZM15 255L15 260L25 260L25 255L20 255L15 255ZM20 5L15 5L15 255L20 255L25 255L25 5L20 5Z"
        fill="black"
      />
      <path
        d="M36.6914 259.5H3.30859L20 331.778L36.6914 259.5Z"
        fill="black"
        stroke="black"
      />
    </svg>
  </g>
);
/* Aspect svgs (named exports) */
export const RedSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="500"
      cy="500"
      r="492.5"
      fill="white"
      stroke="black"
      strokeWidth="15"
    />
    <line
      x1="492.5"
      y1="1000"
      x2="492.5"
      y2="0"
      stroke="black"
      strokeWidth="15"
    />
  </svg>
);

export const YellowSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="500"
      cy="500"
      r="492.5"
      transform="matrix(0 -1 -1 0 1000 1000)"
      fill="white"
      stroke="black"
      strokeWidth="15"
    />
    <line
      y1="-7.5"
      x2="1000"
      y2="-7.5"
      transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 146.447 853.555)"
      stroke="black"
      strokeWidth="15"
    />
  </svg>
);

export const GreenSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="500"
      cy="500"
      r="492.5"
      transform="rotate(-90 500 500)"
      fill="white"
      stroke="black"
      strokeWidth="15"
    />
    <line
      x1="1000"
      y1="507.5"
      x2="0"
      y2="507.5"
      stroke="black"
      strokeWidth="15"
    />
  </svg>
);

export const DefaultRedSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="500"
      cy="500"
      r="492.5"
      fill="white"
      stroke="black"
      strokeWidth="15"
    />
    <line
      x1="357.5"
      y1="977"
      x2="357.5"
      y2="27"
      stroke="black"
      strokeWidth="15"
    />
    <line
      x1="642.5"
      y1="977"
      x2="642.5"
      y2="27"
      stroke="black"
      strokeWidth="15"
    />
  </svg>
);

export const DefaultYellowSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="500"
      cy="500"
      r="492.5"
      fill="white"
      stroke="black"
      stroke-width="15"
    />
    <line
      x1="82.6967"
      y1="769.587"
      x2="768.59"
      y2="83.6938"
      stroke="black"
      stroke-width="15"
    />
    <line
      x1="272.697"
      y1="931.806"
      x2="937.377"
      y2="267.126"
      stroke="black"
      stroke-width="15"
    />
  </svg>
);

export const DefaultGreenSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="500"
      cy="500"
      r="492.5"
      fill="white"
      stroke="black"
      strokeWidth="15"
    />
    <line
      x1="25"
      y1="648.5"
      x2="975"
      y2="648.5"
      stroke="black"
      strokeWidth="15"
    />
    <line
      x1="24"
      y1="363.5"
      x2="974"
      y2="363.5"
      stroke="black"
      strokeWidth="15"
    />
  </svg>
);

/* Markers / other elements */
export const DependentShuntSVG = ({ size = 36 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 624 500")}
    viewBox="0 0 624 500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M500 250C500 217.17 493.534 184.661 480.97 154.329C468.406 123.998 449.991 96.4379 426.777 73.2233C403.562 50.0087 376.002 31.5938 345.671 19.0301C315.339 6.46644 282.83 -1.43507e-06 250 0L250 250H500Z"
      fill="white"
      stroke="black"
      strokeWidth="12"
    />
    <circle
      cx="396"
      cy="119"
      r="20"
      fill="white"
      stroke="black"
      strokeWidth="8"
    />
    <path d="M100 144H250" stroke="black" strokeWidth="10" />
    <path d="M474 143H624" stroke="black" strokeWidth="10" />
  </svg>
);

export const AutomaticSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 568 343")}
    viewBox="0 0 568 343"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="294"
      cy="125"
      r="120"
      transform="rotate(90 294 125)"
      fill="white"
      stroke="black"
      strokeWidth="10"
    />
    <path
      d="M232.684 181.973L231.512 179.238L279.461 160.781V88.418L231.512 69.9609L232.684 67.2266L380.633 123.574V125.723L232.684 181.973ZM282.684 159.609L374.676 124.648L282.684 89.5898V159.609Z"
      fill="black"
    />
    <path d="M20 125H170" stroke="black" strokeWidth="10" />
    <path d="M418 123H568" stroke="black" strokeWidth="10" />
    <path
      d="M25 14C25 11.2386 22.7614 9 20 9C17.2386 9 15 11.2386 15 14L20 14L25 14ZM15 264L15 269L25 269L25 264L20 264L15 264ZM20 14L15 14L15 264L20 264L25 264L25 14L20 14Z"
      fill="black"
    />
    <path
      d="M36.6914 268.5H3.30859L20 340.778L36.6914 268.5Z"
      fill="black"
      stroke="black"
    />
  </svg>
);

export const CallingOnSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 568 343")}
    viewBox="0 0 568 343"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="294"
      cy="125"
      r="120"
      transform="rotate(90 294 125)"
      fill="white"
      stroke="black"
      strokeWidth="10"
    />
    <path
      d="M266.277 189.004L252.02 181.973L237.664 167.617L230.535 152.969L230.535 124.16L237.664 109.609L252.02 95.1562L266.473 88.2227L287.859 80.9961H323.211L344.598 88.2227L359.051 95.1562L373.406 109.609L380.633 124.16V152.969L373.406 167.617L359.051 181.973L344.793 189.004L343.23 186.172L357 179.238L370.672 165.566L377.41 152.188V125.039L370.672 111.562L357 97.9883L343.426 90.957L322.82 84.2187H288.25L267.645 90.957L254.07 97.9883L240.398 111.562L233.66 125.039L233.66 152.187L240.398 165.566L254.07 179.238L267.84 186.172L266.277 189.004Z"
      fill="black"
    />
    <path d="M20 125H170" stroke="black" strokeWidth="10" />
    <path d="M418 123H568" stroke="black" strokeWidth="10" />
    <path
      d="M25 14C25 11.2386 22.7614 9 20 9C17.2386 9 15 11.2386 15 14L20 14L25 14ZM15 264L15 269L25 269L25 264L20 264L15 264ZM20 14L15 14L15 264L20 264L25 264L25 14L20 14Z"
      fill="black"
    />
    <path
      d="M36.6914 268.5H3.30859L20 340.778L36.6914 268.5Z"
      fill="black"
      stroke="black"
    />
  </svg>
);

export const GateSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 568 343")}
    viewBox="0 0 568 343"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="294"
      cy="125"
      r="120"
      transform="rotate(90 294 125)"
      fill="white"
      stroke="black"
      strokeWidth="10"
    />
    <path
      d="M289.617 152.578V189.199H266.668L252.02 181.973L237.664 167.617L230.535 152.969L230.535 124.16L237.664 109.609L252.02 95.1562L266.473 88.2227L287.859 80.9961H323.211L344.598 88.2227L359.051 95.1562L373.406 109.609L380.633 124.16V152.969L373.406 167.617L359.051 181.973L344.793 189.004L343.23 186.172L357 179.238L370.672 165.566L377.41 152.188V125.039L370.672 111.562L357 97.9883L343.426 90.957L322.82 84.2187H288.25L267.645 90.957L254.07 97.9883L240.398 111.562L233.66 125.039L233.66 152.187L240.398 165.566L254.07 179.238L267.449 185.977L286.395 185.977V152.578H289.617Z"
      fill="black"
    />
    <path d="M20 125H170" stroke="black" strokeWidth="10" />
    <path d="M418 123H568" stroke="black" strokeWidth="10" />
    <path
      d="M25 14C25 11.2386 22.7614 9 20 9C17.2386 9 15 11.2386 15 14L20 14L25 14ZM15 264L15 269L25 269L25 264L20 264L15 264ZM20 14L15 14L15 264L20 264L25 264L25 14L20 14Z"
      fill="black"
    />
    <path
      d="M36.6914 268.5H3.30859L20 340.778L36.6914 268.5Z"
      fill="black"
      stroke="black"
    />
  </svg>
);

export const PermissiveSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 568 343")}
    viewBox="0 0 568 343"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="294"
      cy="125"
      r="120"
      transform="rotate(90 294 125)"
      fill="white"
      stroke="black"
      strokeWidth="10"
    />
    <path
      d="M303.68 91.1523V152.383L310.418 172.793L317.059 179.238L330.438 185.977H350.652L364.031 179.238L370.672 172.793L377.41 152.383V91.1523L303.68 91.1523ZM232 88.0273L380.633 88.0273V152.773L373.406 174.355L366.082 181.973L351.434 189.199H329.656L315.008 181.973L307.684 174.355L300.457 152.773V91.1523L232 91.1523V88.0273Z"
      fill="black"
    />
    <path d="M20 125H170" stroke="black" strokeWidth="10" />
    <path d="M418 123H568" stroke="black" strokeWidth="10" />
    <path
      d="M25 14C25 11.2386 22.7614 9 20 9C17.2386 9 15 11.2386 15 14L20 14L25 14ZM15 264L15 269L25 269L25 264L20 264L15 264ZM20 14L15 14L15 264L20 264L25 264L25 14L20 14Z"
      fill="black"
    />
    <path
      d="M36.6914 268.5H3.30859L20 340.778L36.6914 268.5Z"
      fill="black"
      stroke="black"
    />
  </svg>
);

export const RepeaterSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 568 343")}
    viewBox="0 0 568 343"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="294"
      cy="125"
      r="120"
      transform="rotate(90 294 125)"
      fill="white"
      stroke="black"
      strokeWidth="10"
    />
    <path
      d="M310.613 91.1523V152.383L317.449 172.793L323.992 179.238L337.469 185.977H350.652L364.031 179.238L370.672 172.793L377.41 152.383V91.1523L310.613 91.1523ZM231.316 186.172L307.391 137.832V91.1523L232 91.1523V88.0273L380.633 88.0273V152.773L373.406 174.355L366.082 181.973L351.434 189.199H336.59L322.039 181.973L314.617 174.355L307.391 152.773V141.641L232.879 189.004L231.316 186.172Z"
      fill="black"
    />
    <path d="M20 125H170" stroke="black" strokeWidth="10" />
    <path d="M418 123H568" stroke="black" strokeWidth="10" />
    <path
      d="M25 14C25 11.2386 22.7614 9 20 9C17.2386 9 15 11.2386 15 14L20 14L25 14ZM15 264L15 269L25 269L25 264L20 264L15 264ZM20 14L15 14L15 264L20 264L25 264L25 14L20 14Z"
      fill="black"
    />
    <path
      d="M36.6914 268.5H3.30859L20 340.778L36.6914 268.5Z"
      fill="black"
      stroke="black"
    />
  </svg>
);

export const DependentShuntCallingOnMiniatureSvg = ({ size = 36 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 1420 378")}
    viewBox="0 0 1420 378"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Content of DependentShuntCallingOnMiniatureSvg, ensure it fits within the new viewBox */}
    <g transform="scale(1)">
      <circle
        cx="125"
        cy="125"
        r="117.5"
        transform="matrix(-1 0 0 1 1271 17)"
        fill="white"
        stroke="black"
        strokeWidth="15"
      />
      <line
        opacity="0.9"
        y1="-7.5"
        x2="247.5"
        y2="-7.5"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 1236.01 59)"
        stroke="black"
        strokeWidth="15"
      />
      <mask id="path-3-inside-1_135_14" fill="white">
        <path d="M500 250C500 217.17 493.534 184.661 480.97 154.329C468.406 123.998 449.991 96.438 426.777 73.2233C403.562 50.0087 376.002 31.5938 345.671 19.0301C315.339 6.46644 282.83 -1.43507e-06 250 0L250 250H500Z" />
      </mask>
      <path
        d="M500 250C500 217.17 493.534 184.661 480.97 154.329C468.406 123.998 449.991 96.438 426.777 73.2233C403.562 50.0087 376.002 31.5938 345.671 19.0301C315.339 6.46644 282.83 -1.43507e-06 250 0L250 250H500Z"
        fill="white"
        stroke="black"
        strokeWidth="30"
        mask="url(#path-3-inside-1_135_14)"
      />
      <path
        d="M313 161C324.046 161 333 169.954 333 181C333 192.046 324.046 201 313 201C301.954 201 293 192.046 293 181C293 169.954 301.954 161 313 161Z"
        fill="white"
        stroke="black"
        strokeWidth="10"
      />
      <path
        d="M100 50C100 47.2386 97.7614 45 95 45C92.2386 45 90 47.2386 90 50L95 50L100 50ZM90 300L90 305L100 305L100 300L95 300L90 300ZM95 50L90 50L90 300L95 300L100 300L100 50L95 50Z"
        fill="black"
      />
      <path
        d="M111.691 305.5H78.3086L95 377.778L111.691 305.5Z"
        fill="black"
        stroke="black"
      />
      <circle
        cx="396"
        cy="119"
        r="20"
        fill="white"
        stroke="black"
        strokeWidth="10"
      />
      <path d="M100 144H250" stroke="black" strokeWidth="10" />
      <path d="M474 143H624" stroke="black" strokeWidth="10" />
      <circle
        cx="748"
        cy="143"
        r="120"
        transform="rotate(90 748 143)"
        fill="white"
        stroke="black"
        strokeWidth="10"
      />
      <path
        d="M720.277 207.004L706.02 199.973L691.664 185.617L684.535 170.969V142.16L691.664 127.609L706.02 113.156L720.473 106.223L741.859 98.9961H777.211L798.598 106.223L813.051 113.156L827.406 127.609L834.633 142.16V170.969L827.406 185.617L813.051 199.973L798.793 207.004L797.23 204.172L811 197.238L824.672 183.566L831.41 170.188V143.039L824.672 129.562L811 115.988L797.426 108.957L776.82 102.219H742.25L721.645 108.957L708.07 115.988L694.398 129.562L687.66 143.039V170.187L694.398 183.566L708.07 197.238L721.84 204.172L720.277 207.004Z"
        fill="black"
      />
      <path d="M872 142H1022" stroke="black" strokeWidth="10" />
      <path d="M1270 142H1420" stroke="black" strokeWidth="10" />
    </g>
  </svg>
);

export const BlockInstrumentSVG = ({ size = 24 }) => (
  <svg
    width={size}
    height={calculateHeight(size, "0 0 673 349")}
    viewBox="0 0 673 349"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.9">
      <circle
        cx="125"
        cy="125"
        r="120"
        transform="matrix(0 1 1 0 274 0)"
        fill="white"
        stroke="black"
        stroke-width="10"
      />
      <path
        d="M467 48.0273L319.93 48.0273V51.1523L467 51.1523V48.0273ZM388.387 110.332V171.562L381.551 191.973L375.008 198.418L361.531 205.156H348.348L334.969 198.418L328.328 191.973L321.59 171.562V110.332L388.387 110.332ZM391.609 171.562V110.332L465.34 110.332V171.562L458.602 191.973L451.961 198.418L438.582 205.156H418.367L404.988 198.418L398.348 191.973L391.609 171.562ZM389.949 176.738L395.516 193.535L402.938 201.152L417.586 208.379H439.363L453.914 201.152L461.336 193.535L468.465 171.953V107.207L318.367 107.207V171.953L325.594 193.535L332.918 201.152L347.566 208.379H362.41L376.961 201.152L384.383 193.535L389.949 176.738Z"
        fill="black"
      />
      <path d="M275 125L25 125" stroke="black" stroke-width="10" />
      <path
        d="M154.387 95.1523V156.383L147.551 176.793L141.008 183.238L127.531 189.977H114.348L100.969 183.238L94.3281 176.793L87.5898 156.383L87.5898 95.1523L154.387 95.1523ZM157.609 156.383V95.1523L231.34 95.1523L231.34 156.383L224.602 176.793L217.961 183.238L204.582 189.977L184.367 189.977L170.988 183.238L164.348 176.793L157.609 156.383ZM155.949 161.559L161.516 178.355L168.938 185.973L183.586 193.199H205.363L219.914 185.973L227.336 178.355L234.465 156.773L234.465 92.0273L84.3672 92.0273L84.3672 156.773L91.5938 178.355L98.918 185.973L113.566 193.199H128.41L142.961 185.973L150.383 178.355L155.949 161.559Z"
        fill="black"
      />
    </g>
    <path d="M523 125H673" stroke="black" stroke-width="10" />
    <path
      d="M25 19C25 16.2386 22.7614 14 20 14C17.2386 14 15 16.2386 15 19L20 19L25 19ZM15 269L15 274L25 274L25 269L20 269L15 269ZM20 19L15 19L15 269L20 269L25 269L25 19L20 19Z"
      fill="black"
    />
    <path
      d="M36.6914 274.5H3.30859L20 346.778L36.6914 274.5Z"
      fill="black"
      stroke="black"
    />
  </svg>
);

export const routeASVG = () => (
  <svg
    width="369"
    height="369"
    viewBox="0 0 369 369"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 361.053L361.053 7.49935"
      stroke="black"
      stroke-width="15"
      stroke-linecap="round"
    />
  </svg>
);

export const routeBSVG = () => (
  <svg
    width="15"
    height="515"
    viewBox="0 0 15 515"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 507.5L7.5 7.5"
      stroke="black"
      stroke-width="15"
      stroke-linecap="round"
    />
  </svg>
);

export const routeCSVG = () => (
  <svg
    width="369"
    height="369"
    viewBox="0 0 369 369"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M361.054 361.053L7.50033 7.49935"
      stroke="black"
      stroke-width="15"
      stroke-linecap="round"
    />
  </svg>
);

export const routeDSVG = () => (
  <svg
    width="369"
    height="369"
    viewBox="0 0 369 369"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 7.5L361.053 361.053"
      stroke="black"
      stroke-width="15"
      stroke-linecap="round"
    />
  </svg>
);

export const routeESVG = () => (
  <svg
    width="15"
    height="515"
    viewBox="0 0 15 515"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 7.5L7.5 507.5"
      stroke="black"
      stroke-width="15"
      stroke-linecap="round"
    />
  </svg>
);

export const routeFSVG = () => (
  <svg
    width="369"
    height="369"
    viewBox="0 0 369 369"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M361.054 7.5L7.50033 361.053"
      stroke="black"
      stroke-width="15"
      stroke-linecap="round"
    />
  </svg>
);
