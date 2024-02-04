import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[]; //----> Aqui recibire las pregutas tipadas
  currentQuestion: number; //----> Pregunta seleccionada
  fechQuestion: (limit: number) => Promise<void>; //----> Funcion para obtener las preguntas y actualizar
}

export const useQuetionsState = create<State>((set) => {
  return {
    questions: [],
    currentQuestion: 0, //----> Inicializamos la posicion del array de la pregunta(question)

    fechQuestion: async (limit: number) => {
    
      // Consultamos y obtenemos nuestros datos
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();

      // Obtenemos los datos de manero aleatoria
      const questions =  json.sort(() => Math.random() - 0.5).slice(0, limit);

      // Aqui actualizo el estado
      set({ questions });
    },
  };
});
