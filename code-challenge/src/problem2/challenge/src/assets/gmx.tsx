import React from "react";

type GMXProps = {};

const GMX: React.FC<GMXProps> = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2046_6947)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37259 18.6274 0 12 0C5.37259 0 0 5.37259 0 12C0 18.6274 5.37259 24 12 24Z"
          fill="black"
        />
        <path
          d="M20 16.8745L12.0124 4.87439L4 16.8745H15.1628L12.0124 12.2944L10.4496 14.6739H8.78758L12.0123 9.88929L16.676 16.8745H20Z"
          fill="url(#paint0_linear_2046_6947_gmx)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2046_6947_gmx"
          x1="12.576"
          y1="5.18639"
          x2="7.33471"
          y2="18.1514"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#03D1CF" stop-opacity="0.988" />
          <stop offset="1" stop-color="#4E09F8" />
        </linearGradient>
        <clipPath id="clip0_2046_6947">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GMX;
