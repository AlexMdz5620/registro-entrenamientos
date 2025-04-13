"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Training } from "@/types/training";

interface Props {
  trainings: Training[];
  onEdit: (training: Training) => void;
}

export default function TrainingList({ trainings, onEdit }: Props) {
  // Arreglo de los IDs de los regisrtos
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);

  // Eliminar uno o más registros de entrenamiento
  const deletTraining = useMutation(api.training.deletTraining);
  const handlerDelete = async (ids: Id<"trainings">[] | Id<"trainings">) => {
    const idsToDelete = Array.isArray(ids) ? ids : [ids];

    for (const id of idsToDelete) {
      await deletTraining({ id });
    }

    setSelectedIDs((prev) =>
      prev.filter((i) => !idsToDelete.includes(i as Id<"trainings">))
    );
  };

  // Seleccionar o no los registros de los entrenamientos
  const toggleSelection = (id: string) => {
    setSelectedIDs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  return (
    <div className="w-full max-w-5xl mt-6">
      {/* Barra de acciones */}
      <div className="flex justify-between items-center mb-4">
        {/* Título alineado a la izquierda */}
        <h2 className="text-white text-2xl font-bold">Sesiones Registradas</h2>

        {/* Botones alineados a la derecha */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              handlerDelete(selectedIDs as Id<"trainings">[]);
            }}
            className={`w-24 px-4 py-2 rounded transition text-white ${
              selectedIDs.length > 0
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedIDs.length === 0}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-gray-800 text-white text-sm text-center">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIDs(trainings.map((t) => t._id));
                    } else {
                      setSelectedIDs([]);
                    }
                  }}
                  checked={selectedIDs.length === trainings.length}
                />
              </th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Capacidad</th>
              <th className="p-3">Específica</th>
              <th className="p-3">Duración</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Intensidad</th>
              {selectedIDs.length > 0 && <th>Editar</th>}
            </tr>
          </thead>
          <tbody>
            {trainings.map((training) => (
              <tr
                key={training._id}
                className={`border-t border-gray-600 ${
                  selectedIDs.includes(training._id) ? "bg-gray-600" : ""
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIDs.includes(training._id)}
                    onChange={() => toggleSelection(training._id)}
                  />
                </td>
                <td className="p-3">{training.nombre}</td>
                <td className="p-3">
                  {training.capacidad === "cond"
                    ? "Condicional"
                    : "Coordinativa"}
                </td>
                <td className="p-3">{training.capaEspe}</td>
                <td className="p-3">{training.duracion} min</td>
                <td className="p-3">{training.fecha}</td>
                <td className="p-3">{training.intencidad}</td>
                {selectedIDs.length > 0 && (
                  <td className="p-3">
                    {selectedIDs.includes(training._id) && (
                      <button
                        onClick={() => {
                          onEdit(training);
                        }}
                        className="w-24 px-4 py-2 rounded transition-all duration-200 text-white bg-blue-600 hover:bg-blue-500"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
