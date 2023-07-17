import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { addToCart } from "../rtk/slices/cart-slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";

const HomeCards = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`http://localhost:9000/products`)
      .then((p) => setProducts(p.data))
      .catch((error) => alert(error));
  }, []);

  return (
    <Container>
      <Row>
        {products
          .filter((_, index) => index < 4)
          .map((card) => (
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
          ))}
      </Row>
    </Container>
  );
};

export default HomeCards;
