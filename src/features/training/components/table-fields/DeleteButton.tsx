"use client";

interface Props {
  onDelete: () => void;
  isDisabled: number;
}

export default function DeleteButton({ onDelete, isDisabled }: Props) {
  return (
    <button
      onClick={onDelete}
      className={`w-24 px-4 py-2 rounded transition text-white ${
        isDisabled > 0
          ? "bg-gray-600 hover:bg-gray-500"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={isDisabled === 0}
    >
      Eliminar
    </button>
  );
}
