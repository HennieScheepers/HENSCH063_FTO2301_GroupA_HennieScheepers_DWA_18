import { IAudio } from "./Main";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import expandLessIcon from "../../public/icons/expand-less.svg";
import expandMoreIcon from "../../public/icons/expand-more.svg";

const AudioPlayer = (props: {
  audioSource: string;
  imgSrc: string;
  episodeName: string;
  audioInfo: IAudio;
  setAudioInfo: Function;
}) => {
  const theme = useTheme();

  const [expand, setExpand] = useState(true);
  const icon = expand ? expandMoreIcon : expandLessIcon;

  const onExpandClick = () => {
    setExpand((prevValue) => !prevValue);
  };
  return (
    <Card sx={{ display: "flex" }} className="audio--player--container">
      <div className="button--container">
        <button
          onClick={onExpandClick}
          className="primary--button expand--button"
        >
          <Image src={icon} width={20} height={20} alt="expand icon"></Image>
        </button>
      </div>
      {expand && (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={props.audioInfo.seasonImage}
          alt="Podcast cover image"
        />
      )}
      {expand && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {props.episodeName}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
              justifyContent: "center",
            }}
          >
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default AudioPlayer;
