import { Typography } from "@mui/material";
import React from "react";
import styles from "../pages-styles/About.module.scss";
const About = () => {
  return (
    <div className={styles.aboutWrapper}>
      <Typography className={styles.verse} variant="subtitle1" component="h6">
        I have done - <br />
        Put by the lute. <br />
        Song and singing soon are over <br />
        As the airy shades that hover <br />
        In among the purple clover. <br />
        I have done - <br />
        Put by the lute. <br />
        Once I sang as early thrushes <br />
        Sing among the dewy bushes; <br />
        Now I'm mute. <br />
        I am like a weary linnet, <br />
        For my throat has no song in it; <br />
        I have had my singing minute. <br />
        I have done. <br />
        Put by the lute.
      </Typography>
    </div>
  );
};

export default About;
