import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Card, Col, Container, Row } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import { addToCart } from "../rtk/slices/cart-slice";

const Cards = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <Container>
      <Row>
        {products.map((card) => {
          return (
            <Col
              className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center align-align-items-baseline"
              key={card.id}
            >
              <Card
                style={{ width: "16rem" }}
                className="border-0 bg-transparent p-2 card"
              >
                <span
                  className={`relative top-[5%] left-[-5%] w-[40%] text-center tracking-[2px]  bg-${card.bg} text-${card.clr}`}
                >
                  {card.sale}
                </span>
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                  <Card.Title>{card.name}</Card.Title>

                  <Card.Text className="d-flex">
                    {[...Array(3)].map((_, index) => (
                      <AiFillStar
                        key={index}
                        className="text-yellow-400 mb-2"
                      />
                    ))}
                    <AiOutlineStar />
                  </Card.Text>
                  <Card.Text>${card.price}</Card.Text>
                  <Button
                    color="success"
                    onClick={() => dispatch(addToCart(card))}
                  >
                    Add to Cart{" "}
                    <BsFillCartPlusFill className="mx-2" size={25} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Cards;
