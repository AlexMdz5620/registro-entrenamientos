export type Capacidad = "cond" | "coor";

export type Entrenamiento = {
  capacidad: Capacidad;
  capaEspe: string;
  nombre: string;
  duracion: number;
  fecha: string;
  ejercicios: string;
  intencidad: number;
};

export type Training = {
  _id: string;
  _creationTime: number;
  nombre: string;
  capacidad: string;
  capaEspe: string;
  duracion: number;
  fecha: string;
  ejercicios: string;
  intencidad: number;
};