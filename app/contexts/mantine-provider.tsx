import * as React from "react";
import { MantineProvider as MantineCoreProvider } from "@mantine/core";
const MantineProvider = ({ children }: { children: React.ReactNode }) => {
  return <MantineCoreProvider>{children}</MantineCoreProvider>;
};

export default MantineProvider;
