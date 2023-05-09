import React from 'react';
import {coinbase, gemini, kraken, cryptocom} from '../assets';

const CustomButton = ({ btnType, title, handleClick, styles, showLogo, showLogo1, showLogo2, showLogo3 }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {showLogo && (
        <img
          src={coinbase}
          alt="Coinbase"
          className="inline mr-2"
        />
      )}
      {showLogo1 && (
        <img
          src={kraken}
          alt="Kraken"
          className="inline mr-2"
        />
      )}
      {showLogo2 && (
        <img
          src={gemini}
          alt="Gemini"
          className="inline mr-2"
        />
      )}
      {showLogo3 && (
        <img
          src={cryptocom}
          alt="Cryptocom"
          className="inline mr-2"
        />
      )}
      {title}
    </button>
  );
};

export default CustomButton;