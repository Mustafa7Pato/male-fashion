import React from "react";
import "../Style/home.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import banner1 from "../images/banner/banner-1.jpg";
import banner2 from "../images/banner/banner-2.jpg";
import banner3 from "../images/banner/banner-3.jpg";
import { Col, Row } from "react-bootstrap";
import "../Style/header.css";
import HomeCards from "../UI/HomeCards";
const Home = () => {
  return (
    <main>
      <Box className="home-landing">
        <Grid
          container
          spacing={6}
          alignItems="center"
          className="h-full justify-center "
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ mx: { xs: "1rem" } }}
            className="landing-txt"
          >
            <p className="uppercase text-[#db3c3c] font-bold mb-2">
              Summer Collection
            </p>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "400",
                fontSize: { xs: "2.75rem", sm: "3.75" },
              }}
            >
              Fall - Winter Collections 2023
            </Typography>
            <p className="text-gray-500 my-3">
              A specialist label creating luxury essentials, Ethically crafted
              with an unwavering commitment to exceptional quality.
            </p>
            <Link to="shop">
              {" "}
              <Button
                variant="contained"
                color="error"
                sx={{
                  bgcolor: "#db3c3c",
                  fontSize: { sm: "1.3rem", xs: "1rem" },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                Shop Now
                <span
                  className="mx-2"
                  style={{
                    animation: "moveRight 1s infinite",
                  }}
                >
                  <BsArrowRight size={30} />
                </span>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Box>
      <Row className="my-10 ml-1">
        <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center relative sm:top-0 md:top-[50px] lg:top-[100px] p-[2rem]">
          <div className="img1 relative flex justify-center md:justify-start">
            <img src={banner2} alt="banner2" className="rounded shadow" />
            <div className="absolute md:bottom-[-20%] sm:bottom-0 sm:text-center  md:text-start md:left-0">
              <Typography
                variant="h4"
                sx={{
                  letterSpacing: "2px",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2.125rem" },
                }}
              >
                Accessoires
              </Typography>
              <Link to="/shop">
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ textDecoration: "underline" }}
                >
                  SHOP NOW
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col className="col-12 col-md-6 d-flex flex-col">
          <div className="img2 relative mb-[1.7rem] flex justify-center md:justify-start">
            <img
              src={banner1}
              alt="banner1"
              width="70%"
              className=" mb-5 rounded shadow "
            />
            <div className="absolute md:top-[30%] md:left-[-40%] md:w-[50%] top-[90%] sm:text-center  md:text-start">
              <Typography
                variant="h4"
                sx={{
                  letterSpacing: "2px",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2.125rem" },
                  mt: "10px",
                }}
              >
                Clothing Collections {currentDate}
              </Typography>
              <Link to="/shop">
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ textDecoration: "underline" }}
                >
                  SHOP NOW
                </Button>
              </Link>
            </div>
          </div>
          <div className="img3 relative  flex justify-center md:justify-start ">
            <img
              src={banner3}
              alt="banner3"
              width="70%"
              className="rounded shadow"
            />
            <div className="absolute md:top-[28%] top-[80%] md:left-[-17%] md:w-[40%] sm:text-center  md:text-start">
              <Typography
                variant="h4"
                sx={{
                  letterSpacing: "2px",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2.125rem" },
                  mt: "10px",
                }}
              >
                Shoes Spring {currentDate}
              </Typography>
              <Link to="/shop">
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ textDecoration: "underline" }}
                >
                  SHOP NOW
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <div className="ads">
        <Typography variant="h4">
          Free Shipping,30-days return or refund guarantee.
        </Typography>
      </div>
      <HomeCards />
    </main>
  );
};

export default Home;

const currentDate = new Date().getFullYear();
