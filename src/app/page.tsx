"use client";

import { useState } from "react";
import TrainingList from "../features/training/components/TrainingList";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Training } from "@/types/training";
import { Id } from "../../convex/_generated/dataModel";
import TrainingModal from "@/features/training/components/TrainingModal";
import NewSessionBtn from "@/features/training/components/NewSessionBtn";

export default function Home() {
  const trainings = useQuery(api.training.getTrainings);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainingToEdit, setTrainingToEdit] = useState<
    (Training & { _id: Id<"trainings"> }) | undefined
  >(undefined);

  const handleEdit = (training: Training & { _id: Id<"trainings"> }) => {
    setTrainingToEdit(training);
    setIsModalOpen(true);
  };

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
            <NewSessionBtn onClick={() => setIsModalOpen(true)}/>
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
            <NewSessionBtn onClick={() => setIsModalOpen(true)}/>
          </div>
        ) : (
          ""
        )}
        {trainings && trainings.length > 0 && (
          <TrainingList trainings={trainings} onEdit={handleEdit} />
        )}

        {isModalOpen && (
          <TrainingModal
            setIsModalOpen={setIsModalOpen}
            trainingToEdit={trainingToEdit}
            setTrainingToEdit={setTrainingToEdit}
          />
        )}
      </main>
    </>
  );
}
