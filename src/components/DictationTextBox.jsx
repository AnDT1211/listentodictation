import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";

export default function DictationTextBox(props) {
  return <>
    <div hidden={props.hide}>
      <Stack direction="row" spacing={2} className="my-5" >
        {/*{showTranscript()}*/}
        <div className="container mx-auto my-5">
          <TextField
            autoFocus
            id="outlined-multiline-flexible"
            label="Type what you are listen here."
            multiline
            minRows={20}
            fullWidth
            // value={props.content}
            value={props.content}
            onChange={(e) => props.setContent(e.target.value)}
            // hidden={hide}
          />
        </div>
      </Stack>
    </div>
  </>
}



