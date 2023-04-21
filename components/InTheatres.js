/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function InTheatres({ nowPlayingMovies }) {
  const mainRowRef = useRef();
  const imgUrlHead = "https://image.tmdb.org/t/p/w500";
  const [mainRow, setMainRow] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMainRow(mainRowRef.current);
    setCount(1);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      if (mainRow) {
        mainRow.scrollLeft += mainRow.clientWidth;
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [count]);

  

  return (
    <Box sx={{ width: "100%", height: "60vh", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "scroll",
        }}
        id="highlightedRow"
        ref={mainRowRef}
      >
        {nowPlayingMovies.map((item, index) => (
          <Box
            sx={{
              minWidth: "100%",
              background: `linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.2)),url(${imgUrlHead}${item.poster_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "right",
              px: "6rem",
              paddingTop: "4rem",
            }}
            key={index}
          >
            <Box sx={{ width: "55%" }}>
              <Typography
                sx={{
                  fontSize: "2.25rem",
                  color: "#ddd",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                {item.title.length > 28 ? item.title.slice(0, 28) : item.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <Typography sx={{ color: "#ddd" }}>
                  {item.vote_average}/10
                </Typography>
                <Typography sx={{ color: "#ddd" }}>
                  {item.release_date}
                </Typography>
              </Box>
              <Typography sx={{ color: "#ddd" }}>{item.overview}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Typography
        sx={{
          fontSize: "1.25rem",
          color: "#ddd",
          fontWeight: "bold",
          position: "absolute",
          bottom: 0,
          left: "6rem",
          zIndex: "100",
        }}
      >
        Now Playing
      </Typography>
    </Box>
  );
}
