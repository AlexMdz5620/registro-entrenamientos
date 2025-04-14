"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Training } from "@/types/training";
import DeleteButton from "./table-fields/DeleteButton";
import TrainingTable from "./table-fields/TrainingTable";

interface Props {
  trainings: Training[];
  onEdit: (training: Training & { _id: Id<"trainings">; }) => void;
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIDs(trainings.map((t) => t._id));
    } else {
      setSelectedIDs([]);
    }
  };

  return (
    <div className="w-full max-w-5xl mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold">Sesiones Registradas</h2>

        <div className="flex gap-2">
          <DeleteButton
            onDelete={() => {
              handlerDelete(selectedIDs as Id<"trainings">[]);
            }}
            isDisabled={selectedIDs.length}
          />
        </div>
      </div>
      <TrainingTable 
        trainings={trainings}
        selectedIDs={selectedIDs}
        handleSelectAll={handleSelectAll}
        toggleSelection={toggleSelection}
        onEdit={onEdit}
      />
    </div>
  );
}
