import React from "react";
import { Button } from "@mui/material";
import { Col, Card, Row } from "react-bootstrap";
import { MdPayment } from "react-icons/md";
import { AiOutlineDollar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaCreditCard, FaTrash } from "react-icons/fa";
import { Box, Typography, IconButton } from "@mui/material";
import EmptyCart from "../Components/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItem,
  deleteFromCart,
  increaseItem,
} from "../rtk/slices/cart-slice";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const handleDecrease = (product) => {
    dispatch(decreaseItem(product));
  };

  const handleIncrease = (product) => {
    dispatch(increaseItem(product));
  };

  const handleDelete = (product) => {
    dispatch(deleteFromCart(product));
  };

  return (
    <Row className="w-full flex flex-wrap items-center mb-5 mt-[5rem] p-4">
      <Col md="8" className="">
        {cart.length > 0 ? (
          cart.map((product) => {
            return (
              <div
                key={product.id}
                className="item flex items-center w-full justify-around mb-4 font-bold pb-2"
                style={{ borderBottom: "3px solid #e5e5e5" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width="10%"
                  className="rounded-full"
                />
                <div className="title-price">
                  <Typography variant="h6" fontWeight="600">
                    {product.title}
                  </Typography>
                  <p className="text-gray-600">{product.price}$</p>
                </div>
                <div className="counter flex items-center space-x-2">
                  <IconButton
                    sx={{ color: "#003666" }}
                    onClick={() => handleDecrease(product)}
                  >
                    <AiOutlineMinus />
                  </IconButton>
                  <span className="text-gray-600 m-4">{product.quantity}</span>
                  <IconButton
                    sx={{ color: "#003666" }}
                    onClick={() => handleIncrease(product)}
                  >
                    <AiOutlinePlus />
                  </IconButton>
                </div>
                <Typography variant="h5" color="inherit">
                  {product.price * product.quantity}$
                </Typography>
                <IconButton
                  sx={{ color: "#003666" }}
                  onClick={() => handleDelete(product)}
                >
                  <FaTrash />
                </IconButton>
              </div>
            );
          })
        ) : (
          <EmptyCart />
        )}
      </Col>
      {/* payment side */}
      <Col md="4" className="flex justify-center">
        <Card className="bg-gray-100 p-4 rounded shadow">
          <Card.Body>
            <Box className="flex items-center mb-4">
              <MdPayment size={30} className="text-gray-600" />
              <Typography
                variant="h6"
                className="ml-2 font-bold "
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Total Visa Card
              </Typography>
            </Box>
            <Box className="flex items-center mb-3">
              <AiOutlineDollar size={24} className="text-green-500" />
              <Typography variant="h4" className="ml-2 text-green-500">
                ${totalPrice}
              </Typography>
            </Box>
            <Box className="flex items-center mb-3">
              <FaCreditCard size={24} className="text-blue-500" />
              <Typography variant="h6" className="ml-2 text-blue-500">
                Credit Card
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="info"
              className="w-full text-slate-400"
            >
              Pay Now
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
