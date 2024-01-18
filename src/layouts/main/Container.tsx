// Vendors
import React from "react";

// Components
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Container;
