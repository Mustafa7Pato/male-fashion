import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/footer-logo.png";
import payment from "../images/payment.png";
import clint1 from "../images/clients/client-1.png";
import clint2 from "../images/clients/client-2.png";
import clint3 from "../images/clients/client-3.png";
import clint4 from "../images/clients/client-4.png";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import { Mail } from "@mui/icons-material";
import "../Style/header.css";

const Footer = () => {
  return (
    <footer className="bg-[#00112c] text-white">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-wrap items-center tracking-[1px]">
          <div className=" lg:w-1/4 md:w-1/2 w-full my-4 pr-4">
            <Link to="/" className="ml-2 font-bold">
              <img src={logo} alt="logo-footer" />
            </Link>
            <p className="tracking-[1px] pt-8 pb-4">
              The customer is at the heart of our unique Business model,which
              includes design.
            </p>
            <img src={payment} alt="payment" />
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full mb-4 text-center">
            <h4 className="font-bold text-xl mb-4">SHOPPING</h4>
            <ul className="list-none nav-lnk">
              <li className="leading-7">
                <Link
                  to="/"
                  className={`text-[#b1d4e5] font-semibold text-base hover:text-[#88aca1]`}
                >
                  Home
                </Link>
              </li>
              <li className="leading-7">
                <Link
                  to="/shop"
                  className={`text-[#b1d4e5] font-semibold text-base hover:text-[#88aca1]`}
                >
                  Shop
                </Link>
              </li>
              <li className="leading-7">
                <Link
                  to="/about"
                  className={`text-[#b1d4e5] font-semibold text-base hover:text-[#88aca1]`}
                >
                  About-Us
                </Link>
              </li>
            </ul>
          </div>
          <div className=" lg:w-1/4 md:w-1/2 w-full mb-4 text-center pr-3">
            <h4 className="font-bold mb-4 text-xl">PARTNER</h4>
            <ul className="list-none flex flex-wrap gap-2 items-center justify-center">
              <li className="leading-7">
                <img src={clint1} alt="clint1" />
              </li>
              <li className="leading-7">
                <img src={clint2} alt="clint2" />
              </li>
              <li className="leading-7">
                <img src={clint3} alt="clint3" />
              </li>
              <li className="leading-7">
                <img src={clint4} alt="clint4" />
              </li>
            </ul>
          </div>
          <div className="pl-4 lg:w-1/4 md:w-1/2 w-full mb-4">
            <h4 className="font-bold mb-4 text-xl ">NEWLETTER</h4>
            <ul className="list-none">
              <li className="leading-7">
                <p>
                  Be the first to know about new arrivals, look books, sale &
                  promos!
                </p>
              </li>
              <li className="leading-7">
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="input-with-icon-adornment"
                    sx={{ color: "#fff" }}
                  >
                    Your Email
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    sx={{ color: "#fff" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Mail sx={{ color: "#fff" }} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center pt-8 pb-4 border-t border-gray-300">
          <div className="w-full  lg:pr-4 text-center">
            <p className="text-base tracking-[2px] font-bold text-[#b1d4e5]">
              Copyright © {currentDate} & 2020
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const currentDate = new Date().getFullYear();
