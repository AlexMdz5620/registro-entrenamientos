import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveTraining = mutation({
  args: {
    capacidad: v.string(),
    capaEspe: v.string(),
    nombre: v.string(),
    duracion: v.number(),
    fecha: v.string(),
    ejercicios: v.string(),
    intencidad: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("trainings", {
      ...args,
    });
  },
});

export const getTrainings = query({
  handler: async (ctx) => {
    return await ctx.db.query("trainings").collect();
  },
});

export const deletTraining = mutation({
  args: { id: v.id("trainings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTraining = mutation({
  args: {
    id: v.id("trainings"),
    capacidad: v.string(),
    capaEspe: v.string(),
    nombre: v.string(),
    duracion: v.number(),
    fecha: v.string(),
    ejercicios: v.string(),
    intencidad: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});
