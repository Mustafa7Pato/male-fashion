import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";

export const Layout = () => {
  const [mode, setMode] = useState("dark");
  const location = useLocation();
  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <ThemeProvider theme={darkTheme}>
      {!isDashboard && ( // Only render Header if not in Dashboard
        <Header mode={mode} />
      )}
      <Outlet />

      {!isDashboard && ( // Only render Footer if not in Dashboard
        <Footer />
      )}
    </ThemeProvider>
  );
};
