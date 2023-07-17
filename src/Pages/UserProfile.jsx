import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(` http://localhost:9000/users/${id}`)
      .then((res) => setProfile(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ borderRight: "2px solid white", pr: "10px" }}>
          <img
            src={profile.image}
            alt="profile"
            className="rounded-circle"
            style={{ width: "200px", height: "200px" }}
          />
        </Grid>
        <Grid item xs={10}>
          <Container
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <Box className="flex justify-between w-full">
              {" "}
              <Typography variant="h6" color="initial" className="mb-3">
                Username:{" "}
                <span className="text-primary">{profile.username}</span>
              </Typography>
              <Typography variant="h6" color="initial" className="mb-3">
                First Name:{" "}
                <span className="text-primary">{profile.firstname}</span>
              </Typography>
            </Box>
            <Box className="flex justify-between w-full">
              {" "}
              <Typography variant="h6" color="initial" className="mb-3">
                Last Name:{" "}
                <span className="text-primary">{profile.lastname}</span>
              </Typography>
              <Typography variant="h6" color="initial" className="mb-3">
                Email: <span className="text-primary">{profile.email}</span>
              </Typography>
            </Box>
            <Box className="flex justify-between w-full">
              {" "}
              <Typography variant="h6" color="initial" className="mb-3">
                Password:{" "}
                <span className="text-primary">{profile.password}</span>
              </Typography>
              <Typography variant="h6" color="initial" className="mb-3">
                Gender: <span className="text-primary">{profile.gender}</span>
              </Typography>
            </Box>
            <Box className="flex justify-between w-full">
              {" "}
              <Typography variant="h6" color="initial" className="mb-3">
                City: <span className="text-primary">{profile.city}</span>
              </Typography>
              <Typography variant="h6" color="initial" className="mb-3">
                PhoneNumber:{" "}
                <span className="text-primary">{profile.mobile}</span>
              </Typography>
            </Box>
            <Box className="flex flex-col items-center w-full">
              <Typography variant="h6" color="initial" className="mb-3">
                Role: <span className="text-primary">{profile.role}</span>
              </Typography>
              <Link to={`/editProfile/${profile.id}`}>
                <Button variant="contained" color="success">
                  Edit
                </Button>
              </Link>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default UserProfile;

const StyledContainer = styled(Container)(({ theme }) => ({
  background: "linear-gradient(135deg, #FCE47E 0%, #F38181 100%)",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  margin: "5rem",
}));
