"use client"

import DiffWord from "@/components/DiffWord";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import AudioComp from "@/components/AudioComp";
import DictationTextBox from "@/components/DictationTextBox";
import DialogSubmit from "@/components/compute/DialogSubmit";
import transformText from "@/utils/transformText";

export default function Home() {
  const [hide, setHide] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [dictationInputContent, setDictationInputContent] = useState("");
  return (
    <>
      <div className="pt-5">
        <AudioComp addTranscript={setTranscript} hide={hide}/>
        <DictationTextBox content={dictationInputContent} setContent={setDictationInputContent} hide={hide}/>
        <DiffWord
          hide={!hide}
          string1={transformText(dictationInputContent)}
          string2={transformText(transcript)} />
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <DialogSubmit hide={hide} setHide={setHide} />
        </Grid>
      </div>
    </>
  );
}
