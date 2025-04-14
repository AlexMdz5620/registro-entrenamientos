"use client";

import { Training } from "@/types/training";
import { Id } from "../../../../convex/_generated/dataModel";
import TrainingForm from "./TrainingForm";

interface Props {
  trainingToEdit?: Training & { _id: Id<"trainings"> };
  setIsModalOpen: (value: boolean) => void;
  setTrainingToEdit?: (value: undefined) => void;
}

export default function TrainingModal({
  trainingToEdit,
  setIsModalOpen,
  setTrainingToEdit,
}: Props) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 min-h-screen">
      <div className="bg-gray-700 p-6 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-xl text-center font-semibold">
          {trainingToEdit ? "Editar entrenamiento" : "Nuevo entrenamiento"}
        </h2>
        <TrainingForm
          setIsModalOpen={setIsModalOpen}
          trainingToEdit={trainingToEdit}
          setTrainingToEdit={setTrainingToEdit}
        />
      </div>
    </div>
  );
}
