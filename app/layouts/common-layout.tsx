"use client";
import { Container } from "@mantine/core";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import React from "react";
import { cssBreakPoints } from "../lib/utils/constants";
import { useMediaQuery } from "@mantine/hooks";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const isMediumScreen = useMediaQuery(
    `(max-width:${cssBreakPoints.TABLET_BREAKPOINT})`
  );

  return (
    <Container
      fluid
      className={`${
        isMediumScreen ? `!w-full` : `w-[95%]`
      } md:w-[80%] lg:w-[70%] xl:w-[60%] !m-0 !mx-auto flex flex-col h-screen !p-0 `}
    >
      <header>
        <Header />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export default CommonLayout;
