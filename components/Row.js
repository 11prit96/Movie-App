/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef, useState } from "react";

export default function Row(props) {
  const imgUrlHead = "https://image.tmdb.org/t/p/w500";
  const imageBoxRef = useRef();
  const [imageContainer, setImageContainer] = useState(null);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragValue, setDragValue] = useState(0);

  useEffect(() => {
    setImageContainer(imageBoxRef.current);
  }, []);

  useEffect(() => {
    if (imageContainer) {
      imageContainer.scrollLeft += dragValue;
    }
  }, [dragValue, imageContainer]);

  function scrollLeftSide() {
    if (imageContainer) {
      imageContainer.scrollLeft += -400;
    }
  }

  function scrollRightSide() {
    if (imageContainer) {
      imageContainer.scrollLeft += 400;
    }
  }

  function handleDragStart(e) {
    setStartX(e.clientX);
  }

  function handleDrag(e) {
    setDragX(e.clientX);
    setDragValue(startX - dragX);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "22vh",
        backgroundColor: "rgba(0,0,0,0.9)",
        position: "relative",
      }}
    >
      <ArrowBackIosIcon
        sx={{
          color: "rgba(200,200,200,0.4)",
          backgroundColor: "rgba(30,30,30,0.4)",
          position: "absolute",
          height: "100%",
          fontSize: "3rem",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          zIndex: "10",
          transition: "all 350ms",
          "&:hover": {
            color: "#ddd",
            backgroundColor: "rgba(30,30,30,0.6)",
          },
        }}
        onClick={() => scrollLeftSide()}
      />
      <ArrowForwardIosIcon
        sx={{
          color: "rgba(200,200,200,0.4)",
          backgroundColor: "rgba(30,30,30,0.4)",
          position: "absolute",
          height: "100%",
          fontSize: "3rem",
          top: "50%",
          transform: "translateY(-50%)",
          right: 0,
          zIndex: "10",
          transition: "all 350ms",
          "&:hover": {
            color: "#ddd",
            backgroundColor: "rgba(30,30,30,0.6)",
          },
        }}
        onClick={() => scrollRightSide()}
      />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowX: "scroll",
        }}
        id="row1"
        ref={imageBoxRef}
        draggable
        onDragStart={(e) => handleDragStart(e)}
        onDrag={(e) => handleDrag(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <Box sx={{ display: "flex", padding: "0.5rem", height: "80%" }}>
          {props.movies?.map((item, index) => (
            <img
              src={`${imgUrlHead}${item.backdrop_path}`}
              alt={`${index}`}
              key={index}
              className="image"
            />
          ))}
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: "1.25rem",
          color: "#ddd",
          fontWeight: "bold",
          marginLeft: "6rem",
          position: "absolute",
          bottom: 0,
        }}
      >
        {props.name}
      </Typography>
    </Box>
  );
}
