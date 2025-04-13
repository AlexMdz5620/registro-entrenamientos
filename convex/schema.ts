import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    trainings: defineTable({
        capacidad: v.string(),
        capaEspe: v.string(),
        nombre: v.string(),
        duracion: v.number(),
        fecha: v.string(),
        ejercicios: v.string(),
        intencidad: v.number(),
    }),
});