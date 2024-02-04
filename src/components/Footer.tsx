import { Chip, Stack } from "@mui/material";
import { userQuestionData } from "../hooks/userQuestionData";

export const Footer = () => {
  const { correct, incorrect, unanswered } = userQuestionData();

  return (
    <Stack direction="row" spacing={1} justifyContent={"center"} marginTop={2}>
      <Chip label={correct} color="success" variant="outlined" />
      <Chip label={incorrect} color="error" variant="outlined" />
      <Chip label={unanswered} variant="outlined" />
    </Stack>
  );
};
