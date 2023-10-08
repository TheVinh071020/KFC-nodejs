import React, { useEffect, useState } from "react";
import "./Shop.css";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import Swal from "sweetalert2";
import { formatCurrency } from "../../helpers";
import { useDispatch } from "react-redux";

function Shop() {
  let [productsUudai, setProductsUudai] = useState([]);
  let [productsMonmoi, setProductsMonmoi] = useState([]);
  let [productsCombo, setProductsCombo] = useState([]);

  const renderProducts = () => {
    axios
      .get(`http://localhost:3000/api/v1/products?category=uu-dai`)
      .then((res) => setProductsUudai(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/api/v1/products?category=mon-moi`)
      .then((res) => setProductsMonmoi(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/api/v1/products?category=burger`)
      .then((res) => setProductsCombo(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    renderProducts();
  }, []);


  return (
    <div>
      <Header />
      <div>
        <h1 className="titles">
          <b>{productsUudai.length > 0 && productsUudai[0].description}</b>
        </h1>
        <div className="container ">
          {productsUudai.map((e, i) => (
            <Card className="card">
              <Link
                // to={`/detail/${e.product_id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Card.Img variant="top" src={e.img} />
                <Card.Body className="dodai">
                  <div className="text">
                    <Card.Title>{e.name} </Card.Title>
                  </div>
                  <div className="text1">
                    <Card.Title className="sale-price">
                      {" "}
                      {e.sale && formatCurrency(e.price * (1 - e.sale))}
                    </Card.Title>
                    <Card.Title
                      className={e.sale ? `full-price sale` : "full-price"}
                    >
                      {formatCurrency(e.price)}
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="title">{e.title}</div>
              </Link>

              <Link to={`/detail/${e.product_id}`} className="btnbuy">
                <Button className="btnbuy" variant="danger">
                  CHI TIẾT
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h1 className="titles">
          <b>{productsMonmoi.length > 0 && productsMonmoi[0].description}</b>
        </h1>
        <div className="container ">
          {productsMonmoi.map((e, i) => (
            <Card className="card">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Card.Img variant="top" src={e.img} />
                <Card.Body className="dodai">
                  <div className="text">
                    <Card.Title>{e.name} </Card.Title>
                  </div>
                  <div className="text1">
                    <Card.Title className="sale-price">
                      {" "}
                      {e.sale && formatCurrency(e.price * (1 - e.sale))}
                    </Card.Title>
                    <Card.Title
                      className={e.sale ? `full-price sale` : "full-price"}
                    >
                      {formatCurrency(e.price)}
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="title">{e.title}</div>
              </Link>

              <Link to={`/detail/${e.product_id}`} className="btnbuy">
                <Button className="btnbuy" variant="danger">
                  CHI TIẾT
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h1 className="titles">
          <b>{productsCombo.length > 0 && productsCombo[0].description}</b>
        </h1>
        <div className="container ">
          {productsCombo.map((e, i) => (
            <Card className="card">
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Card.Img variant="top" src={e.img} />
                <Card.Body className="dodai">
                  <div className="text">
                    <Card.Title>{e.name} </Card.Title>
                  </div>
                  <div className="text1">
                    <Card.Title className="sale-price">
                      {" "}
                      {e.sale && formatCurrency(e.price * (1 - e.sale))}
                    </Card.Title>
                    <Card.Title
                      className={e.sale ? `full-price sale` : "full-price"}
                    >
                      {formatCurrency(e.price)}
                    </Card.Title>
                  </div>
                </Card.Body>
                <div className="title">{e.title}</div>
              </Link>
              <>
                <Link to={`/detail/${e.product_id}`} className="btnbuy">
                  <Button className="btnbuy" variant="danger">
                    CHI TIẾT
                  </Button>
                </Link>
              </>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
