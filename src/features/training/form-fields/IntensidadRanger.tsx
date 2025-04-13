"use client";

interface Props {
  intensidad: string;
  setIntensidad: (value: string) => void;
}

export default function IntensidadRange({
  intensidad,
  setIntensidad,
}: Props) {
  return (
    <div className="flex flex-col mt-2">
      <label
        htmlFor="intencidad"
        className="text-sm font-medium text-gray-100"
      >
        Intensidad Percibida{" "}
        <span className="font-bold text-blue-300">{intensidad}</span>
      </label>
      <input
        type="range"
        name="intencidad"
        id="intencidad"
        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2"
        min="0"
        max="10"
        value={intensidad}
        onChange={(e) => setIntensidad(e.target.value)}
        required
      />
    </div>
  );
}
