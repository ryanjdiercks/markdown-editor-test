import { useState } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const lineBreakRegEx = /\n/g;
const h1RegEx = /#\s(.*)\n/g;
const h2RegEx = /##\s(.*)\n/g;
const h3RegEx = /###\s(.*)\n/g;
const strongRegEx = /\*{2}(.*)\*{2}|__(.*)__/g;
const italicRegEx = /\*(.*)\*|_(.*)_/g;

export default function Home() {
  const [preview, setPreview] = useState();

  const handleMarkdownChange = (event) => {
    let markdown = event.target.value

    markdown = markdown.replaceAll(h3RegEx, '<h3>$1</h3>')
    markdown = markdown.replaceAll(h2RegEx, '<h2>$1</h2>')
    markdown = markdown.replaceAll(h1RegEx, '<h1>$1</h1>')
    markdown = markdown.replaceAll(strongRegEx, '<strong>$1</strong>')
    markdown = markdown.replaceAll(italicRegEx, '<em>$1</em>')
    markdown = markdown.replaceAll(lineBreakRegEx, '<br />')

    setPreview(markdown)
  };

  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={12} md={6}>
        <Typography>Editor:</Typography>
        <TextField multiline minRows={25} fullWidth onChange={handleMarkdownChange} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Preview:</Typography>
        <Paper variant="outlined" sx={{ p: 2}}>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </Paper>
      </Grid>
    </Grid>
  );
}
