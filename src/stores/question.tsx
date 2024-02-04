import { create } from "zustand";
import { type Question } from "../types";
import confetti from 'canvas-confetti';

interface State {
  questions: Question[]; //----> Aqui recibire las pregutas tipadas
  currentQuestion: number; //----> Pregunta seleccionada
  fechQuestion: (limit: number) => Promise<void>; //----> Funcion para obtener las preguntas y actualizar

  // Esta funcion correponde al evento al momento de hacer click en la respuesta
  selectAnswer: (questionId: number, answerIndex: number) => void;
}

export const useQuetionsState = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0, //----> Inicializamos la posicion del array de la pregunta(question)

    fechQuestion: async (limit: number) => {
      // Consultamos y obtenemos nuestros datos
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();

      // Obtenemos los datos de manero aleatoria
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

      // Aqui actualizo el estado
      set({ questions });
    },

    selectAnswer : (questionId: number, answerIndex: number) => {
      
      //Mediante get obtemos acceso al estado. Lo destructuramos para solo obtener el datos que nos intersesa,en esta caso es question
      const { questions } = get();

      //Aqui estamos usando structuredClone para clonar el objeto. En otras palabras, copiaremos todas las preguntas y cambiaremos aquellas que necesitemos cambiar.
      const newQuestions = structuredClone(questions)

      //Buscaremos el indice de la pregunta que ya tenemos clonado en base al valor recibido como parametro <questionId> 
      const questionIndex = newQuestions.findIndex(q => q.id ===questionId)

      //Una vez tememos el indice,ya podemos buscar la informacion
      const questionInfo = newQuestions[questionIndex]

      //Ahora ya con los datos(questionInfo) validamos si el usuario ha hecho bien la respuesta. Este valos nos llega como parametro(answerIndex)
      const isCorrectoSelectAnswer = questionInfo.correctAnswer === answerIndex

      if(isCorrectoSelectAnswer) confetti()

      //Modificamos los datos mutados para posteor actualizar
      newQuestions[questionIndex] ={
      
        ...questionInfo,
        isCorrectoSelectAnswer,
        userSelectedAnswer : answerIndex
        
      }

      //Finalmente, actualizamos los datos con la mutacion previamente realizada. 
      set({questions: newQuestions})

    },
  };
});
