import React, { useEffect, useState } from "react";
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Card,
  Container,
  IconButton,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const ViewUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:9000/users/${id}`,
    })
      .then((u) => setUser(u.data))
      .catch((error) => alert(error));
  }, []);
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "1rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
        className="shadow"
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            image={user.image}
            alt={user.username}
            sx={{ width: "70%", borderRadius: "50%" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Username: {user.username}
            </Typography>
            <Typography variant="h6" color="text.primary">
              First Name: {user.firstname}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Last Name: {user.lastname}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Email: {user.email}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Gender: {user.gender}
            </Typography>
            <Typography variant="h6" color="text.primary">
              City: {user.city}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Role: {user.role}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Phone Number: {user.mobile}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Password: {user.password}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="users">
            <IconButton color="primary" aria-label="Back to Users">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ViewUser;
