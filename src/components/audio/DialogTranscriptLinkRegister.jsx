import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DescriptionIcon from "@mui/icons-material/Description";
import TextField from "@mui/material/TextField";

export default function DialogTranscriptLinkRegister(props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;
  const [open, setOpen] = React.useState(false);
  const [transcriptContent, setTranscriptContent] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    props.addTranscript(transcriptContent);
  }

  return (
    <React.Fragment>
      <Button component="label" variant="outlined" startIcon={<DescriptionIcon/>} sx={{marginRight: "1rem"}}
              onClick={handleClickOpen}>
        {/*Upload Transcript*/}
        Transcript
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Transcript Register
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" minWidth={isMobile ? 300 : 500}>
            <TextField
              autoFocus
              id="outlined-multiline-flexible"
              multiline
              minRows={10}
              maxRows={20}
              fullWidth
              value={transcriptContent}
              onChange={(e) => setTranscriptContent(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}