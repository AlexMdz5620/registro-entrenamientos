"user client";

interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string | number;
}

export default function InputFile({
  label,
  name,
  type = "text",
  required = false,
  className = "",
  defaultValue,
}: Props) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-gray-100">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
}
