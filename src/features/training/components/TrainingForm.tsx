"use client";

import { useState } from "react";
import {
  capacidadesCondicionales,
  capacidadesCoordinativas,
  styleDivInput,
} from "@/utils/trainingOptions";
import CapacidadSelect from "../form-fields/CapacidadesSelect";
import CapaEspecificaSelect from "@/features/training/form-fields/CapaEspecificaSelect";
import InputFile from "@/features/training/form-fields/InputFile";
import TextareaField from "@/features/training/form-fields/TextareaFile";
import IntensidadRange from "@/features/training/form-fields/IntensidadRanger";
import { useTrainingFormHandlers } from "@/features/training/hooks/useTrainingFormHandlers";
import { Training } from "@/types/training";
import { Id } from "../../../../convex/_generated/dataModel";

export default function TrainingForm({
  setIsModalOpen,
  trainingToEdit,
}: {
  setIsModalOpen: (value: boolean) => void;
  trainingToEdit?: (Training & { _id: Id<"trainings"> }) | undefined;
}) {
  // Inicio del input range
  const [intensidad, setIntensidad] = useState("5");

  // Almacenamiento del valor de la Capacidad Física
  const [capacidadSeleccionada, setCapacidadSeleccionada] = useState(
    trainingToEdit?.capacidad || ""
  );

  // Handlers necesarios
  const { handleCloseModal, handleSubmit } = useTrainingFormHandlers(
    setIsModalOpen,
    setCapacidadSeleccionada,
    setIntensidad,
    trainingToEdit
  );

  return (
    <form
      className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col"
      onSubmit={handleSubmit}
    >
      <CapacidadSelect
        capacidadSeleccionada={capacidadSeleccionada}
        setCapacidadSeleccionada={setCapacidadSeleccionada}
      />

      <CapaEspecificaSelect
        styleDivInput={styleDivInput}
        capacidadSeleccionada={capacidadSeleccionada}
        capacidadesCondicionales={capacidadesCondicionales}
        capacidadesCoordinativas={capacidadesCoordinativas}
      />

      <InputFile
        label={"Nombre de la sesión"}
        name={"nombre"}
        required
        defaultValue={trainingToEdit?.nombre}
        className={styleDivInput}
      />
      <InputFile
        label={"Duración (minutos)"}
        name={"duracion"}
        type={"number"}
        required
        defaultValue={trainingToEdit?.duracion?.toString()}
        className={styleDivInput}
      />
      <InputFile
        label={"Fecha"}
        name={"fecha"}
        type={"date"}
        required
        defaultValue={
          trainingToEdit?.fecha
            ? new Date(trainingToEdit.fecha).toISOString().substring(0, 10)
            : undefined
        }
        className={styleDivInput}
      />

      <TextareaField
        label="Ejercicios"
        name="ejercicios"
        required
        defaultValue={trainingToEdit?.ejercicios}
        className={styleDivInput}
      />

      <IntensidadRange
        intensidad={intensidad}
        setIntensidad={setIntensidad}
      />

      <div className="mt-6 flex justify-end gap-4 md:gap-2 md:mt-3 ">
        <button
          className="text-black hover:bg-gray-800 hover:text-gray-100 px-4 py-2 rounded-md transition"
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
          Guardar
        </button>
      </div>
    </form>
  );
}
