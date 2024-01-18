// Vendors
import type { ReactElement } from "react";
import Head from "next/head";

// Layouts
import Container from "@/layouts/main/Container";
import { NextPageWithLayout } from "@/pages/_app";

// Home
import Search from "@/page/Search";

const SearchPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Search result</title>
      </Head>
      <Search />
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Container>{page}</Container>;
};

export default SearchPage;
