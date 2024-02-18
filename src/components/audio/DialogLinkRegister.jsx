import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DescriptionIcon from "@mui/icons-material/Description";
import TextField from "@mui/material/TextField";
import LinkIcon from "@mui/icons-material/Link";

export default function DialogLinkRegister(props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;
  const [open, setOpen] = React.useState(false);
  const [transcriptContent, setTranscriptContent] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    // props.addTranscript(transcriptContent);
    props.setLink(link);
  }

  return (
    <React.Fragment>
      <Button component="label" variant="outlined" startIcon={<LinkIcon/>} sx={{marginRight: "1rem"}}
              onClick={handleClickOpen}>
        Youtube
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Youtube Link
        </DialogTitle>
        <DialogContent>
          <DialogContentText autoFocus={true} id="alert-dialog-description" minWidth={isMobile ? 300 : 500}>
            <TextField autoFocus={true} value={link} onChange={(e) => {setLink(e.target.value)}} id="outlined-basic" variant="outlined" fullWidth={true}/>
            {/*<TextField*/}
            {/*  autoFocus*/}
            {/*  id="outlined-multiline-flexible"*/}
            {/*  multiline*/}
            {/*  minRows={10}*/}
            {/*  maxRows={20}*/}
            {/*  fullWidth*/}
            {/*  value={transcriptContent}*/}
            {/*  onChange={(e) => setTranscriptContent(e.target.value)}*/}
            {/*/>*/}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Add Link
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}