import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [displayedTracks, setDisplayedTracks] = useState<Track[]>([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [offset, setOffset] = useState(4);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async (term: any, offset: number) => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=4&offset=${offset}`
      );

      if (response.status === 200) {
        const data = response.data;
        const newTracks = data.results || [];

        if (open) {
          setTracks([[], ...newTracks]);
          setDisplayedTracks([[], ...newTracks]);
        } else {
          setTracks([...tracks, ...newTracks]);
          setDisplayedTracks([...tracks, ...newTracks]);
        }

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
    fetchData(searchTerm === "" ? term : searchTerm, offset + 4);
  };

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTracks([]);
    setDisplayedTracks([]);
    fetchData(searchTerm, 1);
    setLoadMoreVisible(true);
    handleClose();
  };

  return (
    <Container maxWidth="sm" style={{ paddingBottom: "40px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          style={{
            height: "60px",
            boxShadow: "0 0 6px 0 rgba(148, 77, 230, 0.75)",
            backgroundImage: "linear-gradient(100deg, #712bda, #a45deb 100%)",
          }}
        >
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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              ngmusic
            </Typography>
            <div style={{ cursor: "pointer" }} onClick={handleOpen}>
              <img alt="icon menu" src="/assets/icons/search.svg" />
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box pt={"100px"}>
        <Box mb="38px">
          Search result for :{" "}
          <span
            style={{
              textTransform: "capitalize",
              color: "#7b34dd",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {searchTerm === "" ? term : searchTerm}
          </span>
        </Box>

        {tracks.map((track, index) => (
          <div key={index} className="list-song">
            <img
              alt={track.artistName}
              src={track.artworkUrl100}
              width={100}
              height={100}
            />
            <div style={{ flexGrow: 1 }}>
              <Box display="flex" flexDirection="column">
                <Box flexGrow={1}>
                  <p className="artist">{track.artistName}</p>
                  <p className="song">{track.trackName}</p>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  mt="30px"
                >
                  <p className="genre">{track.primaryGenreName}</p>
                  <p className="price">
                    <img
                      alt="icon dollar"
                      src="/assets/icons/currency-dollar.svg"
                    />
                    {track.trackPrice}
                  </p>
                </Box>
              </Box>
            </div>
          </div>
        ))}

        {loadMoreVisible && (
          <Box display="flex" justifyContent="center">
            <Button
              className="button-secondary"
              onClick={loadMore}
              disabled={!loadMoreVisible}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>

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
              width: "100%",
            }}
            spacing={2}
            noValidate
            autoComplete="off"
            onSubmit={handleSearchFormSubmit}
          >
            <Input
              placeholder="Artist / Album / Title"
              onChange={(e) => setSearchTerm(e?.target.value)}
            />
            <Button className="button-modal" type="submit">
              Search
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default SearchPage;
