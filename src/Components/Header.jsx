import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo.png";

import "../Style/header.css";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CgLogOut } from "react-icons/cg";
import { useSelector } from "react-redux";
import { AdminAuth } from "../context/AuthContext";
import axios from "axios";
import { UserId } from "../context/UserInfo";
import Swal from "sweetalert2";
const Header = ({ mode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const { auth, setAuth } = AdminAuth();
  const { user, setUser } = UserId();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/users/${user}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("admin");
    sessionStorage.removeItem("userId");
    setAuth(localStorage.admin);
    setUser(sessionStorage.userId);
    Swal.fire({
      position: "center",
      title: "Sign-Out...",
      showConfirmButton: false,
      timer: 1500,
      background: "linear-gradient(to right, #9af3ff, #8705a7)",
      color: "#ffff",
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div>
      <Navbar expand="lg" className="nav fixed-top bg-slate-200">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto text-lg font-bold nav-lnk">
              <NavLink to="/" end className=" text-gray-600">
                Home
              </NavLink>
              <NavLink to="/shop" className="md:mx-3 text-gray-600">
                Shop
              </NavLink>
              <NavLink to="/about" className="text-gray-600">
                About Us
              </NavLink>
            </Nav>

            <Nav className="flex-basis-1">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Link className="cart flex relative" to="/cart">
                  <HiOutlineShoppingBag size={35} className="mr-4" />
                  <span
                    className={`cart-counter absolute top-[-6px] right-[10px] ${
                      cart.length < 1 ? "bg-red-500" : "bg-green-500"
                    } text-white text-xs rounded-full px-2 py-1`}
                  >
                    {cart.length}
                  </span>
                </Link>
                {auth ? (
                  <Box>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={userInfo.username} src={userInfo.image} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      bgcolor={mode}
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {auth == "admin" && (
                        <Link to="/dashboard">
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Control</Typography>
                          </MenuItem>
                        </Link>
                      )}
                      <Link to={`/profile/${user}`}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                      </Link>

                      <Divider color="white" />
                      <Link onClick={handleLogout}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Log-Out</Typography>
                        </MenuItem>
                      </Link>
                    </Menu>
                  </Box>
                ) : (
                  <Box className="logout">
                    <Link to="signin">
                      <CgLogOut
                        size={40}
                        className="rotate-180 text-indigo-700"
                      />
                    </Link>
                  </Box>
                )}
              </Box>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
