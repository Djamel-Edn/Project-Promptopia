import React from 'react';

const Tick = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    shapeRendering="geometricPrecision"
    stroke="#2563eb"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"   
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default Tick;
