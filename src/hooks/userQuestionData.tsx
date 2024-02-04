import { useQuetionsState } from "../stores/question";

export const userQuestionData = () => {
    const question = useQuetionsState((state) => state.questions);
  
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
  
    question.forEach((question) => {
      const { userSelectedAnswer, correctAnswer } = question;
  
      if (userSelectedAnswer == null) unanswered++;
      else if (userSelectedAnswer === correctAnswer) correct++;
      else incorrect++;
    });
  
    return { correct, incorrect, unanswered };
  };