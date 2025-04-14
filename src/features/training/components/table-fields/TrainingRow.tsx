"use client";

import { Training } from "@/types/training";
import { Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  training: Training;
  selected: string[];
  toggleSelection: (id: string) => void;
  onEdit: (training: Training & { _id: Id<"trainings">; }) => void;
}

export default function TrainingRow({
  training,
  selected,
  toggleSelection,
  onEdit,
}: Props) {
  return (
    <tr
      key={training._id}
      className={`border-t border-gray-600 ${
        selected.includes(training._id) ? "bg-gray-600" : ""
      }`}
    >
      <td className="p-3">
        <input
          type="checkbox"
          checked={selected.includes(training._id)}
          onChange={() => toggleSelection(training._id)}
        />
      </td>
      <td className="p-3">{training.nombre}</td>
      <td className="p-3">
        {training.capacidad === "cond" ? "Condicional" : "Coordinativa"}
      </td>
      <td className="p-3">{training.capaEspe}</td>
      <td className="p-3">{training.duracion} min</td>
      <td className="p-3">{training.fecha}</td>
      <td className="p-3">{training.intencidad}</td>
      {selected.length > 0 && (
        <td className="p-3">
          {selected.includes(training._id) && (
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
  );
}
