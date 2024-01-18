// Vendors
import Head from "next/head";

// Layouts
import { NextPageWithLayout } from "./_app";

// Home
import Home from "@/page/Home";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Welcome ngmusic</title>
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
