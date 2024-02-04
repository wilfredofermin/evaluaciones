export interface Question {
    id: number;
    question: string;
    code: string;
    answers: string[];
    correctAnswer: number;
    userSelectCorrectAnswer?: number;
    isCorrectoSelectAnswer?: boolean;

  }