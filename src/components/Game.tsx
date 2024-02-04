import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuetionsState } from "../stores/question";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { type Question as QuestionType } from "../types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  // El usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return "transparent";

  // Si ya selecciono pero la soluccion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";

  // si esta es la soluccion correcta
  if (index === correctAnswer) return "green";

  // Si esta es la seleccoin del usuario pero es la incorrecta
  if (index === userSelectedAnswer) return "red";

  // Si no es ninguna de las anteriores
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  // Obtemos la funcion del store
  const selectAnswer = useQuetionsState((state) => state.selectAnswer);

  //----> Opcion secundario
  //Ahora haremos una funcion que llame a otra funcion. Esto con el objetivo de que primero obtener el answerIndex(index) y una vez obtendio le pasamos este paramtreo a la otra funcion.

  // const handleClick =(answerIndex:number)=> ()=>{
  //     selectAnswer(info.id,answerIndex)
  // }

  return (
    <Card
      variant="outlined"
      sx={{ textAlign: "left", p: 3, bgcolor: "#0f111a" }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter style={gradientDark} lenguage="javascript">
        {info.code}{" "}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#444444" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              // onClick={handleClick(index)} //----> Opcion secundaria

              //  Aqui evitamos que el usuario vuelva a dar click
              disabled={info.userSelectedAnswer != null}
              //   Aqui el evento de seleccion de la respuesta
              onClick={() => selectAnswer(info.id, index)}
              //    Aqui establecemos los colores segun la respuesta
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
              divider
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuetionsState((state) => state.questions);
  const currentQuestion = useQuetionsState((state) => state.currentQuestion);

  const goNextQuestion = useQuetionsState((state) => state.goNextQuestion);
  const goPreviusQuestion = useQuetionsState(
    (state) => state.goPreviusQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        marginBottom={4}
      >
        <IconButton
          onClick={goPreviusQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
