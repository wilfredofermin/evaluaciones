import Button from "@mui/material/Button";
import { useQuetionsState } from "../stores/question";

export const StartButton = () => {
  const fechQuestion = useQuetionsState((state) => state.fechQuestion);

  const handleClick = () => fechQuestion(5);

  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      Empieza ya!
    </Button>
  );
};
