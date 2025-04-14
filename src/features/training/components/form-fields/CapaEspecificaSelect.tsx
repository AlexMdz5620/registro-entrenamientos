"use client";

interface Props {
  styleDivInput: string;
  capacidadSeleccionada: string;
  capacidadesCondicionales: Array<string>;
  capacidadesCoordinativas: Array<string>;
}

export default function CapaEspecificaSelect({
  styleDivInput,
  capacidadSeleccionada,
  capacidadesCondicionales,
  capacidadesCoordinativas,
}: Props) {
  return (
    <div className={styleDivInput}>
      <label className="text-sm font-medium text-gray-100 mb-1">
        {capacidadSeleccionada === "cond" ? "Condicionales" : "Coordinativas"}
      </label>
      <select
        name="capaEspe"
        id="capaEspe"
        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {capacidadSeleccionada === "" ? (
          <option className="text-black">Seleccione una opción</option>
        ) : (
          (capacidadSeleccionada === "cond"
            ? capacidadesCondicionales
            : capacidadesCoordinativas
          ).map((capacidad) => (
            <option key={capacidad} value={capacidad} className="text-black">
              {capacidad}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
