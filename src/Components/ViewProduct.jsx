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

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:9000/products/${id}`,
    })
      .then((p) => setProduct(p.data))
      .catch((error) => alert(error));
  }, [id]);
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
            image={product.image}
            alt={product.title}
            sx={{ width: "70%", borderRadius: "5%" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Name: {product.name}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Category: {product.title}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Other Color: {product.clr}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Price: ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="products">
            <IconButton color="primary" aria-label="Back to Products">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ViewProduct;
