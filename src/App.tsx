import { Container, Stack, Typography } from "@mui/material";
import { JavaScriptLogo } from "./components/JavaScriptLogo";
import "./App.css";
import { StartButton } from "./components/StartButton";
import { useQuetionsState } from "./stores/question";
import { Game } from "./components/Game";



function App() {

  const question = useQuetionsState((state) => state.questions);

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} justifyContent={'center'} sx={{mb:6}}>
        <JavaScriptLogo />
        <Typography variant="h3">
          Evaluaciones
        </Typography>
      </Stack>

      {question.length > 0 && <Game />}
      {question.length === 0 && <StartButton />}
      
    </Container>
  );
}

export default App;
