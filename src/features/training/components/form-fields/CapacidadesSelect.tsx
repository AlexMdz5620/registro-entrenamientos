'use client';

interface Props {
    capacidadSeleccionada: string;
    setCapacidadSeleccionada: (value: string) => void;
}

export default function CapacidadSelect({
    capacidadSeleccionada,
    setCapacidadSeleccionada
}: Props) {
    return (
        <div className="flex flex-col">
        <label
          htmlFor="capacidad"
          className="text-sm font-medium text-gray-100"
        >
          Capacidad Física
        </label>
        <select
          name="capacidad"
          id="capacidad"
          value={capacidadSeleccionada}
          onChange={(e) => setCapacidadSeleccionada(e.target.value)}
          className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" className="text-black">Seleccione una opción</option>
          <option value="cond" className="text-black">
            Condicional
          </option>
          <option value="coor" className="text-black">
            Coordinativa
          </option>
        </select>
      </div>
    )
}