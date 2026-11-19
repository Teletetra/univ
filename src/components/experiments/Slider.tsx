"use client";

export default function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-[#aab6d0]">{label}</span>
        <span className="font-mono text-[#c4b7ff]">
          {value.toFixed(2)} {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />

      <div className="flex justify-between text-xs text-[#667594]">
        <span>{min}</span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}