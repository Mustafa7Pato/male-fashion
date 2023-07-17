import { Button } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <Col md="8" className="flex flex-col items-center justify-center">
      <img
        src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
        alt="empty"
        className="md:mt-[-9rem]"
      />
      <Link to="/shop">
        <Button variant="contained" color="success" className="text-white mb-4">
          shop now <BsCart4 className="ml-1" />
        </Button>
      </Link>
    </Col>
  );
};

export default EmptyCart;
