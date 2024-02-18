"use client"

import {Box, Button, IconButton, Slider, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import UploadFileIcon from "@mui/icons-material/UploadFile";
import Grid from "@mui/material/Grid";
import DialogTranscriptRegister from "@/components/audio/DialogTranscriptRegister";
import DialogGuideController from "@/components/audio/DialogGuideController";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const MAX_VALUE_SLIDER = 10000;

export default function AudioComp(props) {
  let aud = useRef(null);
  let [sliderVal, setSliderVal] = useState(0);
  let [stateVal, setStateVal] = useState(0);
  let [duration, setDuration] = useState("");
  let [currentTimeAud, setCurrentTimeAud] = useState("");
  let [isPlaying, setIsPlaying] = useState(false);
  const [filename, setFilename] = useState("");


  const [audio, setAudio] = useState();


  useEffect(() => {
    setDuration("0:00");
    setCurrentTimeAud("0:00");
  }, []);

  useEffect(() => {
    if (isPlaying) {
      aud.current?.play();
    } else {
      aud.current?.pause();
    }
    // console.log(aud.current?.currentTime + " - " + aud.current?.duration);
  }, [isPlaying])

  useEffect(() => {

    if (sliderVal === MAX_VALUE_SLIDER) {
      resetAll();
    }


    const callback = (event) => {
      // console.log(event.key)
      if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "Enter") {
        setIsPlaying(!isPlaying);
      } else if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "ArrowLeft") {
        timeAudioUpdateKeyTrigger(-2);
      } else if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "ArrowRight") {
        timeAudioUpdateKeyTrigger(2);
      }
    };
    document.addEventListener('keydown', callback);
    return () => {
      document.removeEventListener('keydown', callback);
    };
  })

  function timeAudioUpdateKeyTrigger(sec) {
    if (aud.current?.currentTime + sec >= 0 && aud.current?.currentTime + sec <= aud.current?.duration) {
      aud.current.currentTime = aud.current?.currentTime + sec;
      let curTime = Math.round(aud.current?.currentTime);
      let durTime = Math.round(aud.current?.duration);
      setCurrentTimeAud(fmtMSS(curTime));

      let curSlide = Math.round(curTime / durTime * MAX_VALUE_SLIDER);
      if (curSlide !== sliderVal) {
        setSliderVal(curSlide);
      }

      if (curTime === Math.round(aud.current?.duration)) {
        setIsPlaying(!isPlaying);
      }
    }
  }

  function fmtMSS(s) {
    if (s == null) {
      return "0:00";
    }
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }

  function handlePlayPauseButton(e) {
    e.preventDefault();
    setStateVal(stateVal + 1);
    setIsPlaying(!isPlaying);
    if (!isNaN(aud.current.duration)) {
      setDuration(fmtMSS(Math.round(aud.current.duration)));
    }
  }

  function timeAudioUpdate() {
    let curTime = Math.round(aud.current?.currentTime);
    let durTime = Math.round(aud.current?.duration);
    setCurrentTimeAud(fmtMSS(curTime));

    let curSlide = Math.round(curTime / durTime * MAX_VALUE_SLIDER);
    if (curSlide !== sliderVal) {
      setSliderVal(curSlide);
    }

    if (curTime === Math.round(aud.current?.duration)) {
      setIsPlaying(!isPlaying);
    }
  }

  function handleUseChangeSlider(e) {
    setSliderVal(e.target.value);
    let curTime = e.target.value / MAX_VALUE_SLIDER * aud.current?.duration;
    try {
      aud.current.currentTime = curTime;
    } catch (exceptionVar) {
      // catchStatements
    }
  }

  function resetAll() {
    aud.current?.pause();
    setSliderVal(0);
    setCurrentTimeAud("0:00");
    setDuration("0:00");
    if (isPlaying === true) {
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    resetAll();
    aud.current = new Audio(audio);
    aud.current.addEventListener("timeupdate", () => {
      timeAudioUpdate()
    }, false);
  }, [audio]);


  function addFile(e) {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
    // console.log("file name: " + e.target.files[0]?.name)
    if (e.target.files[0] != null) {
      let inputString = e.target.files[0]?.name;
      const maxLengthName = 15;
      if (inputString.length > maxLengthName) {
        inputString = inputString.substring(0, maxLengthName);
      }
      setFilename(inputString.trim() + "...");
    }
  }

  return <>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      // sx={{ minHeight: '100vh' }}
    >
      <div hidden={props.hide}>
        {/*display file name*/}
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <p>{filename}</p>
        </Grid>
        <Button component="label" variant="outlined" startIcon={<UploadFileIcon/>} sx={{marginRight: "1rem"}}>
          {/*Upload Audio*/}
          Audio
          <input type="file" accept=".mp3" hidden onChange={addFile}/>
        </Button>
        <DialogTranscriptRegister addTranscript={props.addTranscript}/>
      </div>
    </Grid>

    <Stack py={2} direction="row" spacing={2} justifyContent="center" alignItems="center">


      {/*current time audio*/}
      <Box sx={{display: {xs: 'block'}}} width={30}>
        {currentTimeAud}
      </Box>


      {/*audio bar controller*/}
      <Box display="flex" justifyContent="center" alignItems="center" height={20} width={500}>
        <Slider value={sliderVal} max={MAX_VALUE_SLIDER} onChange={handleUseChangeSlider}/>
      </Box>

      {/*audio duration*/}
      <Box sx={{display: {xs: 'block'}}} width={50}>
        {duration}
      </Box>


    </Stack>
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <div>
        {/*back button*/}
        <IconButton onMouseDown={(e) => {
          e.preventDefault();
          timeAudioUpdateKeyTrigger(-2)
        }}>
          <ArrowBackIosNewIcon/>
        </IconButton>
        {/*play button*/}
        <IconButton size="large" onMouseDown={handlePlayPauseButton}>
          {isPlaying ? <><PauseIcon/></> : <><PlayArrowIcon/></>}
        </IconButton>
        {/*forward button*/}
        <IconButton onMouseDown={(e) => {
          e.preventDefault();
          timeAudioUpdateKeyTrigger(2)
        }}>
          <ArrowForwardIosIcon/>
        </IconButton>

        {/*guide controller button*/}
        <DialogGuideController/>
      </div>
    </Grid>

  </>
}















