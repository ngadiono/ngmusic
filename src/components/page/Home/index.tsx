import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <Container maxWidth="sm">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "linear-gradient(153deg, #712bda, #a45deb 100%)",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          paddingBottom: "40px",
        }}
      >
        <Box
          flexGrow={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            alt="logo"
            src="/assets/logo/logo-white.svg"
            width={72}
            height={83}
          />
        </Box>
        <Stack
          component="form"
          sx={{
            width: "25ch",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            hiddenLabel
            variant="filled"
            size="small"
            placeholder="Artist / Album / Title"
            onChange={(e) => setSearchTerm(e?.target.value)}
          />
          <Box sx={{ textAlign: "center" }}>
            <Link href={`/search?term=${searchTerm}`}>
              <Button variant="contained">Search</Button>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
