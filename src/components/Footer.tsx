import { Button, Chip, Stack } from "@mui/material";
import { userQuestionData } from "../hooks/userQuestionData";
import { useQuetionsState } from "../stores/question";

export const Footer = () => {
  const { correct, incorrect, unanswered } = userQuestionData();
 const question  = useQuetionsState(state => state.reset)

  return (
    <>
    
    <Stack direction="row" spacing={1} justifyContent={"center"} marginTop={2}>
      <Chip label={correct} color="success" variant="outlined" />
      <Chip label={incorrect} color="error" variant="outlined" />
      <Chip label={unanswered} variant="outlined" />
    </Stack>

    <Button  onClick={()=> question()} variant="contained" sx={{mt:6}}>Restablecer</Button>
    
    </>
  );
};
