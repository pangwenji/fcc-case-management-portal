import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import clsx from "clsx";

const useStyle = makeStyles({
  root: {
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover p,&:hover svg,& img": {
      opacity: 1,
    },
    "& p, svg": {
      opacity: 0.4,
    },
    "&:hover img": {
      opacity: 0.3,
    },
  },
  noMouseEvent: {
    pointerEvents: "none",
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  onDragOver: {
    "& img": {
      opacity: 0.3,
    },
    "& p, svg": {
      opacity: 1,
    },
  },
});

export const FileUpload = ({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "600px",
  height = "100px",
  backgroundColor = "#fff",
  image: {
    url = "",
    imageStyle = {
      height: "inherit",
    },
  } = {},
  onChange,
  onDrop,
}) => {
  const classes = useStyle();
  const [labelText, setLabelText] = React.useState(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const stopDefaults = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      onDrop(e);
    },
  };

  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <>
      <input
        onChange={handleChange}
        accept={accept}
        className={classes.hidden}
        id="file-upload"
        type="file"
      />

      <label
        htmlFor="file-upload"
        {...dragEvents}
        className={clsx(classes.root, isDragOver && classes.onDragOver)}
      >
        <Box
          width={width}
          height={height}
          bgcolor={backgroundColor}
          className={classes.noMouseEvent}
        >
          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <Box height={height} width={width} className={classes.iconText}>
                <CloudUploadIcon />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </label>
    </>
  );
};
