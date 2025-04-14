"user client";

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useEffect } from "react";
import { Capacidad, Entrenamiento, Training } from "@/types/training";
import { Id } from "../../../../convex/_generated/dataModel";

export function useTrainingFormHandlers(
  setIsModalOpen: (value: boolean) => void,
  setCapacidadSeleccionada: (value: string) => void,
  setIntensidad: (value: string) => void,
  trainingToEdit?: Training & { _id: Id<"trainings"> },
  setTrainingToEdit?: (value: undefined) => void,
) {
  // Instancia para creación de un nuevo entrenamiento
  const createTraining = useMutation(api.training.saveTraining);
  const updateTraining = useMutation(api.training.updateTraining);

  useEffect(() => {
    if (trainingToEdit?.intencidad !== undefined) {
      setIntensidad(trainingToEdit.intencidad.toString());
    }
  }, [trainingToEdit, setIntensidad]);

  // Cerrar el modal del registro de entrenmaienot
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCapacidadSeleccionada("");
    setIntensidad("5");
    if(setTrainingToEdit){
      setTrainingToEdit(undefined);
    }
  }, [setIsModalOpen, setCapacidadSeleccionada, setIntensidad, setTrainingToEdit]);

  // Crear un nuevo entrenamiento
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data: Entrenamiento = {
        capacidad: formData.get("capacidad") as Capacidad,
        capaEspe: formData.get("capaEspe") as string,
        nombre: formData.get("nombre") as string,
        duracion: Number(formData.get("duracion")),
        fecha: formData.get("fecha") as string,
        ejercicios: formData.get("ejercicios") as string,
        intencidad: Number(formData.get("intencidad")),
      };

      if (trainingToEdit) {
        await updateTraining({ id: trainingToEdit._id, ...data });
      } else {
        await createTraining(data);
      }

      handleCloseModal();
    },
    [createTraining, updateTraining, handleCloseModal, trainingToEdit]
  );

  return { handleCloseModal, handleSubmit };
}
