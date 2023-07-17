import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  Dashboard as DashboardIcon,
  Person,
  ShoppingBasket,
} from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";
import logo from "../images/logo.png";
import DashCard from "../Components/DashCard";
import Users from "./Users";
import Products from "../Components/Products";
import NewProduct from "../Components/NewProduct";
import ViewProduct from "../Components/ViewProduct";
import EditProduct from "./EditProduct";
import NewUser from "./NewUser";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";

const drawerWidth = 240;

function DashboardControl(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isUsers = location.pathname === "/dashboard/users";
  const isProducts = location.pathname === "/dashboard/products";
  const addProduct = location.pathname === "/dashboard/products/addproduct";
  const viewProduct = location.pathname.startsWith(
    "/dashboard/products/viewproduct/"
  );
  const editProduct = location.pathname.startsWith(
    "/dashboard/products/editproduct/"
  );
  const addUser = location.pathname === "/dashboard/users/adduser";
  const viewUser = location.pathname.startsWith("/dashboard/users/viewuser/");
  const editUser = location.pathname.startsWith("/dashboard/users/edituser/");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="bg-teal-800 h-full">
      <Toolbar />
      <List className="flex h-[70%] flex-col justify-evenly">
        {[
          { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
          { text: "Users", icon: <Person />, link: "users" },
          {
            text: "Products",
            icon: <ShoppingBasket />,
            link: "products",
          },
        ].map(({ text, icon, link }) => (
          <ListItem key={text} disablePadding>
            <Link to={link}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-slate-300">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            className="flex  w-full pr-5 items-center"
            sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
          >
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Typography
              variant="h4"
              className="text-slate-950"
              sx={{ display: { xs: "none", md: "flex" }, mr: { md: "2em" } }}
            >
              Dashboard
            </Typography>
            <Link to="/">
              <Button
                variant="contained"
                color="inherit"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Home <Home className="ml-2" />
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* content only need change */}
        {isDashboard && <DashCard />}
        {isUsers && <Users />}
        {isProducts && <Products />}
        {addProduct && <NewProduct />}
        {viewProduct && <ViewProduct />}
        {editProduct && <EditProduct />}
        {addUser && <NewUser />}
        {viewUser && <ViewUser />}
        {editUser && <EditUser />}
      </Box>
    </Box>
  );
}

DashboardControl.propTypes = {
  window: PropTypes.func,
};

export default DashboardControl;
