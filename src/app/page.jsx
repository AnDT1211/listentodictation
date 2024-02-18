"use client"

import DiffWord from "@/components/DiffWord";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import AudioComp from "@/components/AudioComp";
import DictationTextBox from "@/components/DictationTextBox";
import DialogSubmit from "@/components/compute/DialogSubmit";
import transformText from "@/utils/transformText";
import {Button, Stack} from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import Link from "next/link";

export default function Home() {
  const [hide, setHide] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [dictationInputContent, setDictationInputContent] = useState("");
  return (
    <>
      <div className="pt-5">


        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
          <Stack direction="row" spacing={2}>
            <Link href="/via-link">
              <Button size="large" variant="outlined" startIcon={<YouTubeIcon />}>
                Listen on Youtube
              </Button>
            </Link>
            <Link href="/via-file">
              <Button size="large" variant="outlined" endIcon={<AudioFileIcon />}>
                Listen on mp3 file
              </Button>
            </Link>
          </Stack>
        </Grid>

        {/*<AudioComp addTranscript={setTranscript} hide={hide}/>*/}
        {/*<DictationTextBox content={dictationInputContent} setContent={setDictationInputContent} hide={hide}/>*/}
        {/*<DiffWord*/}
        {/*  hide={!hide}*/}
        {/*  string1={transformText(dictationInputContent)}*/}
        {/*  string2={transformText(transcript)}/>*/}
        {/*<Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">*/}
        {/*  <DialogSubmit hide={hide} setHide={setHide}/>*/}
        {/*</Grid>*/}
      </div>
    </>
  );
}
