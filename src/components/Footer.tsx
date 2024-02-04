import { Chip, Stack } from "@mui/material";
import { useQuetionsState } from "../stores/question";

export const Footer = () => {
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


return(
    
    // <footer style={{marginTop:'16px'}}>

    //     <strong>{`${correct} Correctas - ${incorrect} Incorrectas - ${unanswered} Sin responder`}</strong>
    // </footer>

<Stack direction="row" spacing={1} justifyContent={'center'} marginTop={2}>
  <Chip label={correct} color="success" variant="outlined" />
  <Chip label={incorrect} color="error" variant="outlined" />
  <Chip label={unanswered}  variant="outlined" />
</Stack>

    
    
    )

};
