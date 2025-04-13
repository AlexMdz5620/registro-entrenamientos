"use client";

interface Props {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
}

export default function TextareaField({
  label,
  name,
  required = false,
  className = "",
  defaultValue = "",
}: Props) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-gray-100">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
}
