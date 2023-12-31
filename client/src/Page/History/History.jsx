import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { NavLink } from "react-router-dom";
import "./History.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatCurrency } from "../../helpers";

function History() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user[0].users_id;

  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState([]);

  const fetchCategories = async () => {
    await axios
      .get(`http://localhost:3000/api/v1/categories/${userId}`)
      .then((res) => {
        setCategories(res.data.rows);
      })
      .catch((err) => console.log(err));
  };
  //   console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleView = async (e) => {
    await axios
      .get(`http://localhost:3000/api/v1/order-details/${e}`)
      .then((res) => {
        setOrder(res.data.rows);
      })
      .catch((err) => console.log(err));
  };
  const quantityByProductId = {};

  order.forEach((product) => {
    const productId = product.product_id;
    const quantity = product.quantity;

    if (quantityByProductId[productId]) {
      quantityByProductId[productId] += quantity;
    } else {
      quantityByProductId[productId] = quantity;
    }
  });

  const aggregatedOrder = Object.keys(quantityByProductId).map((productId) => {
    const matchingProduct = order.find(
      (item) => item.product_id === parseInt(productId)
    );
    return {
      product_id: parseInt(productId),
      name: matchingProduct.name,
      price: matchingProduct.price,
      sale: matchingProduct.sale,
      img: matchingProduct.img,
      quantity: quantityByProductId[productId],
    };
  });

  console.log(categories);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="titles">Lịch sử mua hàng</h1>
        <div className="cart-tongg">
          <div className="carttt">
            {categories.length > 0 ? (
              categories.map((e, i) => (
                <div className="cart1" key={i}>
                  <div className="cart-combo">
                    <table className="table">
                      <thead>
                        <tr className="table-light">
                          <th scope="col">Order ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Address</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{e.order_id}</td>
                          <td>{e.order_name}</td>
                          <td>
                            {e.status == "pending" ? (
                              <button className="btn btn-primary">
                                {e.status}
                              </button>
                            ) : (
                              <button className="btn btn-success">
                                {e.status}
                              </button>
                            )}
                          </td>
                          <td>{e.address}</td>
                          <td onClick={() => handleView(e.order_id)}>
                            <button
                              className="btn-detail"
                              variant="primary"
                              onClick={handleShow}
                            >
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <p className="  ">Chưa có sản phẩm trong giỏ hàng</p>
            )}
          </div>
          {/* <!-- Modal --> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="cart1">
                <div className="cart-combo">
                  <table className="table">
                    <thead>
                      <tr className="table-light">
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aggregatedOrder.map((product, i) => (
                        <tr key={i}>
                          <td>{product.name}</td>
                          <td>
                            {formatCurrency(product.price * (1 - product.sale))}
                          </td>
                          <td>{product.quantity}</td>
                          <td>
                            <img
                              style={{ with: "70px", height: "70px" }}
                              src={product.img}
                              alt=""
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total</td>
                        <td>
                          {formatCurrency(
                            aggregatedOrder.reduce(
                              (total, product) =>
                                total +
                                product.price *
                                  (1 - product.sale) *
                                  product.quantity,
                              0
                            )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <div className="cart2">
            <img
              src="https://static.kfcvietnam.com.vn/images/web/profile-circle.png?v=5.0"
              alt=""
            />
            <h4>Xin chào</h4>
            <div className="logoutt">
              <NavLink>
                <button>
                  <u onClick={handleLogout}>Đăng xuất</u>
                </button>
              </NavLink>
            </div>
            <ul className="list">
              <li>Đơn hàng đã đặt</li>
              <li>Đơn hàng yêu thích</li>
              <li>Địa chỉ của bạn</li>
              <li>Chi tiết tài khoản</li>
              <li>Đặt lại mật khẩu</li>
              <li>Xóa tài khoản</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default History;
