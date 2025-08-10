interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  placeholder: string;
  className?: string;
}

export const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  placeholder,
  className = '',
}: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange(0);
    } else {
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        onChange(numValue);
      }
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <label className="text-sm font-medium text-gray-700 whitespace-pre-line">
        {label}
      </label>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value || ''}
        onChange={handleChange}
        className="w-20 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
        placeholder={placeholder}
      />
    </div>
  );
};
