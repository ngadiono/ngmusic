import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Track {
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  primaryGenreName: string;
  trackPrice: string;
}

const SearchPage = () => {
  const router = useRouter();
  const { term } = router.query;
  const [searchTerm, setSearchTerm] = useState<string>(term as string);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [displayedTracks, setDisplayedTracks] = useState<Track[]>([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [offset, setOffset] = useState(4);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async (term: string | string[], offset: number) => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=4&offset=${offset}`
      );

      if (response.status === 200) {
        const data = response.data;
        const newTracks = data.results || [];

        setTracks([...tracks, ...newTracks]);
        setDisplayedTracks([...tracks, ...newTracks]);

        if (newTracks.length < 4) {
          setLoadMoreVisible(false);
        }
      } else {
        console.error(
          `Failed to fetch data from iTunes API: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (term) {
      fetchData(term, offset);
    }
  }, [term]);

  const loadMore = () => {
    setOffset(offset + 4);
    fetchData(searchTerm, offset + 4);
  };

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTracks([]);
    setDisplayedTracks([]);
    fetchData(searchTerm, 1);
    handleClose();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img alt="icon menu" src="/assets/icons/menu.svg" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ngmusic
            </Typography>
            <div color="inherit" onClick={handleOpen}>
              <img alt="icon menu" src="/assets/icons/search.svg" />
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <p>
        Search result for :{" "}
        <span style={{ textTransform: "capitalize" }}>{term}</span>
      </p>

      {tracks.map((track, index) => (
        <div key={index} className="card">
          <img
            alt={track.artistName}
            src={track.artworkUrl100}
            width={100}
            height={100}
          />
          <p>{track.artistName}</p>
          <p>{track.trackName}</p>
          <p>{track.primaryGenreName}</p>
          <p>{track.trackPrice}</p>
        </div>
      ))}

      {loadMoreVisible && (
        <Button
          onClick={loadMore}
          disabled={!loadMoreVisible}
          variant="contained"
        >
          Load More
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            component="form"
            sx={{
              width: "25ch",
            }}
            spacing={2}
            noValidate
            autoComplete="off"
            onSubmit={handleSearchFormSubmit}
          >
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              placeholder="Artist / Album / Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target.value)}
            />
            <Button variant="contained" type="submit">
              Search
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default SearchPage;
