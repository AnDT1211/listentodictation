import * as React from 'react';

import {IconButton} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {Box, Stack} from "@mui/material";
import Grid from '@mui/material/Grid';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from '@mui/material/Tooltip';
import {Typography} from '@mui/material';
import KeyboardOptionKeyIcon from '@mui/icons-material/KeyboardOptionKey';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function DialogGuideController() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <Tooltip title="Audio Control" arrow>
      <IconButton size="large" onClick={handleClickOpen}>
        <TuneIcon/>
      </IconButton>
    </Tooltip>

    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Audio Controller</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container direction="column" justifyContent="left" gap={1}>
            <Stack container direction="row" justifyContent="center" alignItems="center" gap={1}>
              <Grid container direction="row" justifyContent="left" alignItems="center" gap={1}>
                <Box sx={{height: 26, textAlign: "center"}}>Press</Box>
                <Box>
                  <Box sx={{
                    border: 1, borderRadius: 1, borderColor: "primary.main", textAlign: "center", padding: 0.5
                  }}>
                    <Tooltip title="Control + Alt + Enter" placement="top-start">
                      <Typography component={'div'}><KeyboardControlKeyIcon/> <KeyboardOptionKeyIcon/>
                        <KeyboardReturnIcon/></Typography>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{height: 26, textAlign: "center"}}> to PLAY/PAUSE</Box>
              </Grid>
            </Stack>
            <Stack container direction="row" justifyContent="center" alignItems="center" gap={1}>
              <Grid container direction="row" justifyContent="left" alignItems="center" gap={1}>
                <Box sx={{height: 26, textAlign: "center"}}>Press</Box>
                <Box>
                  <Box sx={{
                    border: 1, borderRadius: 1, borderColor: "primary.main", textAlign: "center", padding: 0.5
                  }}>
                    <Tooltip title="Control + Alt + Left-Arrow" placement="top-start">
                      <Typography component={'div'}><KeyboardControlKeyIcon/> <KeyboardOptionKeyIcon/>
                        <KeyboardArrowLeftIcon/></Typography>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{height: 26, textAlign: "center"}}> to BACKWARD</Box>
              </Grid>
            </Stack>
            <Stack container direction="row" justifyContent="center" alignItems="center" gap={1}>
              <Grid container direction="row" justifyContent="left" alignItems="center" gap={1}>
                <Box sx={{height: 26, textAlign: "center"}}>Press</Box>
                <Box>
                  <Box sx={{
                    border: 1, borderRadius: 1, borderColor: "primary.main", textAlign: "center", padding: 0.5
                  }}>
                    <Tooltip title="Control + Alt + Right-Arrow" placement="top-start">
                      <Typography component={'div'}><KeyboardControlKeyIcon/> <KeyboardOptionKeyIcon/>
                        <KeyboardArrowRightIcon/></Typography>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{height: 26, textAlign: "center"}}> to FORWARD</Box>
              </Grid>
            </Stack>
          </Grid>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  </>
}