import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashCard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(users);
  const lastUser = users.length > 0 && users[users.length - 1]?.username;
  const lastProduct =
    products.length > 0 && products[products.length - 1]?.title;
  useEffect(() => {
    axios
      .get("http://localhost:9000/users")
      .then((u) => setUsers(u.data))
      .catch((error) => alert(error));
    axios
      .get("http://localhost:9000/products")
      .then((p) => setProducts(p.data))
      .catch((error) => alert(error));
  }, []);
  return (
    <Row className="flex items-center h-full">
      <Col md="6">
        <Card className="bg-slate-950 text-white p-4 rounded shadow">
          <Card.Body className="d-flex align-items-center flex-col">
            <Box className="flex items-center mb-4">
              <Typography variant="h3" className="text-sky-400">
                Users
              </Typography>
            </Box>
            <Box className="flex items-center mb-3">
              <Typography variant="h4" className="ml-2">
                Number of Users :{" "}
                <span className="text-green-500">{users.length}</span>
              </Typography>
            </Box>
            <Box className="flex items-center mb-3">
              <Typography variant="h5" className="ml-2">
                Last User Registered is :{" "}
                <span className="text-green-500">{lastUser}</span>
              </Typography>
            </Box>
            <Link to="users">
              <Button variant="contained" color="info">
                Show Users
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md="6">
        <Card className="bg-slate-950 text-white p-4 rounded shadow">
          <Card.Body className="d-flex align-items-center flex-col">
            <Box className="flex items-center mb-4">
              <Typography variant="h3" className="text-sky-400">
                Products
              </Typography>
            </Box>
            <Box className="flex items-center mb-3">
              <Typography variant="h4" className="ml-2">
                Number of Products :{" "}
                <span className="text-green-500">{products.length}</span>
              </Typography>
            </Box>
            <Box className="flex items-center mb-3">
              <Typography variant="h5" className="ml-2">
                Last Product Added is :{" "}
                <span className="text-green-500">{lastProduct}</span>
              </Typography>
            </Box>
            <Link to="products">
              {" "}
              <Button variant="contained" color="info">
                Show Products
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DashCard;
