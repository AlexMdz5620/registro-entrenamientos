"use client";

import { useState } from "react";
import TrainingForm from "@/features/training/components/TrainingForm";
import TrainingList from "../features/training/components/TrainingList";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Training } from "@/types/training";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const trainings = useQuery(api.training.getTrainings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainingToEdit, setTrainingToEdit] = useState<
  (Training & {_id:Id<"trainings">}) | undefined
  >(undefined);

  const handleEdit = (training: Training & {_id:Id<"trainings">}) => {
    setTrainingToEdit(training);
    setIsModalOpen(true);
  }

  return (
    <>
      <header
        className={
          trainings !== undefined
            ? "w-full px-6 py-4 flex justify-end border-b border-gray-700"
            : ""
        }
      >
        {!trainings || trainings.length === 0 ? (
          ""
        ) : (
          <div className="w-full flex justify-end">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Nueva sesión de entrenamiento
            </button>
          </div>
        )}
      </header>
      <main
        className={
          trainings?.length === 0
            ? "flex flex-col items-center justify-center p-4 min-h-screen"
            : "flex flex-col items-center justify-center p-4"
        }
      >
        {!trainings || trainings.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Nueva sesión de entrenamiento
            </button>
          </div>
        ) : (
          ""
        )}
        {trainings && trainings.length > 0 && (
          <TrainingList trainings={trainings} onEdit={handleEdit} />
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 min-h-screen">
            <div className="bg-gray-700 p-6 rounded-2xl shadow-lg max-w-md w-full">
              <h2 className="text-xl text-center font-semibold">
                {trainingToEdit ? 'Editar entrenamiento' : 'Nuevo entrenamiento'}
              </h2>
              <TrainingForm setIsModalOpen={setIsModalOpen} trainingToEdit={trainingToEdit} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
