import { Box, Container, Typography, Button, Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getData = () => {
    axios
      .get(`http://localhost:9000/products`)
      .then((p) => setProducts(p.data))
      .catch((error) => alert(error));
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteProduct = (product) => {
    Swal.fire({
      title: `Are you sure to delete (${product.title}) ?`,
      imageUrl: product.image,
      icon: "warning",
      iconColor: "red",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: product.name,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `http://localhost:9000/products/${product.id}`,
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getData();
      }
    });
  };
  return (
    <Container>
      <Typography variant="h3" color="initial" textAlign={"center"}>
        Products
      </Typography>
      <Box>
        <Link to={`products/addproduct`}>
          <Button
            variant="contained"
            color="success"
            className="text-white my-4"
          >
            Add New Product
          </Button>
        </Link>

        <Box>
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="text-center  shadow"
          >
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody className="bg-[#212529f2] align-middle">
              {products.map((product) => {
                return (
                  <tr key={product.id} className="relative">
                    <td className="absolute top-[10%] left-[6%]">
                      <Avatar alt={product.title} src={product.image} />
                    </td>
                    <td>$ {product.price}</td>
                    <td
                      className="flex justify-around"
                      style={{ padding: "1rem" }}
                    >
                      <Link to={`products/viewproduct/${product.id}`}>
                        {" "}
                        <Button
                          variant="contained"
                          color="info"
                          sx={{ color: "#fff" }}
                        >
                          View
                        </Button>
                      </Link>
                      <Link to={`products/editproduct/${product.id}`}>
                        {" "}
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ color: "#fff" }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteProduct(product)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
