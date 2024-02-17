import React from "react";
import * as diff from "diff";
import PropTypes from "prop-types";
import {Box} from "@mui/material";

const styles = {
  added: {
    color: "green",
    backgroundColor: "#b5efdb"
  },
  removed: {
    color: "red",
    backgroundColor: "#fec4c0",
    textDecoration: "line-through"
  }
};

const DiffWord = ({string1 = "", string2 = "", mode = "words", hide = false}) => {
  let groups = [];

  if (mode === "characters") groups = diff.diffChars(string1, string2);
  if (mode === "words") groups = diff.diffWordsWithSpace(string1, string2);
  if (mode === "lines")
    groups = diff.diffLines(string1, string2, {newlineIsToken: true});
  if (mode === "sentences")
    groups = diff.diffSentences(string1, string2, {newlineIsToken: true});

  console.log(`mode ${mode} groups`, groups);
  const mappedNodes = groups.map((group) => {
    let {value, added, removed} = group;
    if ((added || removed) && !/\S/.test(value)) {
      const linebreaks = value.match(/(\r\n|\r|\n)/g);
      // console.log(`contains ${linebreaks.length} new line`, linebreaks);
      if (linebreaks) {
        if (removed) value = `\u00b6`.repeat(linebreaks.length);
        if (added) value = `\u00b6\n`.repeat(linebreaks.length);
      }
    }
    let nodeStyles;
    if (added) nodeStyles = styles.added;
    if (removed) nodeStyles = styles.removed;
    return <><span style={nodeStyles}>{value}</span></>
  });

  return <>
    <div hidden={hide} className="pb-4 pt-4">
      <Box component="section" sx={{p: 2, border: '1px dashed grey'}}>
        <span autoFocus={true} style={{whiteSpace: "pre"}}>{mappedNodes}</span>
      </Box>
    </div>
  </>
};

DiffWord.propTypes = {
  string1: PropTypes.string,
  string2: PropTypes.string,
  mode: PropTypes.oneOf(["characters", "words"])
};

export default DiffWord;