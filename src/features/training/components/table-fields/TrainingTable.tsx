"use client";

import { Training } from "@/types/training";
import TrainingRow from "./TrainingRow";
import { Id } from "../../../../../convex/_generated/dataModel";

interface Props {
  trainings: Training[];
  selectedIDs: string[];
  toggleSelection: (id: string) => void;
  handleSelectAll: (checked: boolean) => void;
  onEdit: (training: Training & { _id: Id<"trainings">; }) => void;
}

export default function TrainingTable({
  trainings,
  selectedIDs,
  toggleSelection,
  handleSelectAll,
  onEdit,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-gray-800 text-white text-sm text-center">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3">
              <input
                type="checkbox"
                onChange={(e) => {
                  handleSelectAll(e.target.checked);
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
            <TrainingRow
              key={training._id}
              training={training}
              selected={selectedIDs}
              toggleSelection={toggleSelection}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
