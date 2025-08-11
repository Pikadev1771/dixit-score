'use client';

import { useState, useEffect } from 'react';

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;

  className?: string;
}

export const NumberInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 20,
  className = '',
}: NumberInputProps) => {
  const [displayValue, setDisplayValue] = useState(
    value === 0 ? '' : value.toString()
  );

  useEffect(() => {
    setDisplayValue(value === 0 ? '' : value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    if (inputValue === '') return;

    const numValue = parseInt(inputValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleBlur = () => {
    if (displayValue === '') {
      onChange(0);
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {label && (
        <label className="text-sm text-gray-700 whitespace-pre-line">
          {label}
        </label>
      )}
      <input
        type="number"
        inputMode="numeric"
        placeholder="0"
        min={min}
        max={max}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-20 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
      />
    </div>
  );
};
