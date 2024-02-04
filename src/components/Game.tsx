import {
  Card,
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

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 3, bgcolor: "black" }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter style={gradientDark} lenguage ='javascript'>{info.code} </SyntaxHighlighter>
      <List sx={{ bgcolor: "gray" }}>
        {info.answers.map((answer, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton>
              <ListItemText primary={answer} />
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

  const questionInfo = questions[currentQuestion];

  return (
    <Stack>
      <Question info={questionInfo} />
    </Stack>
  );
};
