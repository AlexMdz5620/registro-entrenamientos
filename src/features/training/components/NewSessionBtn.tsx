"use client";

interface Props {
  onClick: () => void;
}

export default function NewSessionBtn({ onClick }: Props) {
  return (
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
      onClick={onClick}
    >
      Nueva sesión de entrenamiento
    </button>
  );
}
