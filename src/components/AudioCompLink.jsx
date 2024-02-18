"use client"

import {Box, Button, FormControlLabel, FormGroup, IconButton, Slider, Stack, Switch} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import Grid from "@mui/material/Grid";
import DialogGuideController from "@/components/audio/DialogGuideController";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DialogLinkRegister from "@/components/audio/DialogLinkRegister";
import DialogTranscriptLinkRegister from "@/components/audio/DialogTranscriptLinkRegister";
import ReactPlayer from "react-player";

const MAX_VALUE_SLIDER = 10000;

export default function AudioCompLink(props) {
  let aud = useRef(null);
  let [sliderVal, setSliderVal] = useState(0);
  let [second, setSecond] = useState(2);
  let [stateVal, setStateVal] = useState(0);
  let [duration, setDuration] = useState("");
  let [durationSecond, setDurationSecond] = useState(0);
  let [currentTimeAud, setCurrentTimeAud] = useState("");
  let [isPlaying, setIsPlaying] = useState(false);
  const [link, setLink] = useState("");
  const playerRef = useRef(null);
  const [hideVideo, setHideVideo] = useState(true);


  useEffect(() => {
    setDuration("0:00");
    setCurrentTimeAud("0:00");
  }, []);

  useEffect(() => {
    if (sliderVal === MAX_VALUE_SLIDER) {
      resetAll();
    }

    const callback = (event) => {
      // console.log(event.key)
      if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "Enter") {
        setIsPlaying(!isPlaying);
      } else if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "ArrowLeft") {
        timeAudioUpdateKeyTrigger(-1);
      } else if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "ArrowRight") {
        timeAudioUpdateKeyTrigger(1);
      }
    };
    document.addEventListener('keydown', callback);
    return () => {
      document.removeEventListener('keydown', callback);
    };
  })

  function timeAudioUpdateKeyTrigger(sec) {
    const newTime = Math.max(0, playerRef.current.getCurrentTime() + second*(sec));
    playerRef.current.seekTo(newTime);
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
  }

  function handleUseChangeSlider(e) {
    setSliderVal(e.target.value);
    let curTime = e.target.value / MAX_VALUE_SLIDER * playerRef.current.getDuration();
    playerRef.current.seekTo(curTime, 'seconds');
  }

  function resetAll() {
    // aud.current?.pause();
    setSliderVal(0);
    setCurrentTimeAud("0:00");
    setDuration("0:00");
    if (isPlaying === true) {
      setIsPlaying(false);
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
          <p>{link}</p>
        </Grid>
        <div className="pt-7">
          <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
            <DialogLinkRegister setLink={setLink}/>
            <DialogTranscriptLinkRegister addTranscript={props.addTranscript}/>
            <FormGroup>
              <FormControlLabel control={<Switch onChange={() => setHideVideo(!hideVideo)}/>} label="Show Video"/>
            </FormGroup>
          </Grid>
        </div>
      </div>
    </Grid>

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      // sx={{ minHeight: '100vh' }}
    >

      <div hidden={hideVideo} className="pt-3">
        <ReactPlayer
          ref={playerRef}
          url={link}
          controls={false}
          // playing
          playing={isPlaying}
          width="100%"
          height="100%"
          onDuration={(duration) => {
            setDuration(fmtMSS(Math.round(duration)));
            setDurationSecond(duration);
          }}

          onProgress={(e) => {
            setCurrentTimeAud(fmtMSS(Math.round(e.playedSeconds)));
            // set slide value
            let curTime = Math.round(e.playedSeconds);
            let durTime = Math.round(durationSecond);

            let curSlide = Math.round(curTime / durTime * MAX_VALUE_SLIDER);
            if (curSlide !== sliderVal) {
              setSliderVal(curSlide);
            }
          }}
        />
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
          timeAudioUpdateKeyTrigger(-1)
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
          timeAudioUpdateKeyTrigger(1)
        }}>
          <ArrowForwardIosIcon/>
        </IconButton>

        {/*guide controller button*/}
        <DialogGuideController second={second} setSecond={setSecond}/>
      </div>
    </Grid>

  </>
}

