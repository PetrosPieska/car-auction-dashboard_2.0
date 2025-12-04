import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceSlider({ min, max, value, onChange }: PriceSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-400">
        <span>Price range</span>
        <span className="font-medium text-accent">
          {value[0].toLocaleString()} € – {value[1].toLocaleString()} €
        </span>
      </div>
      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={(v) => onChange(v as [number, number])}
        trackStyle={[{ backgroundColor: "#F97316", height: 6 }]}
        handleStyle={[
          { borderColor: "#F97316", backgroundColor: "#F97316" },
          { borderColor: "#F97316", backgroundColor: "#F97316" },
        ]}
        railStyle={{ backgroundColor: "#1F2937", height: 6 }}
      />
    </div>
  );
}
