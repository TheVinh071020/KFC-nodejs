import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  // let cart = useSelector((state) => state.cartReducer.cart);
  let cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const token = JSON.parse(localStorage.getItem("token")) || {};

  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${token}`)
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <div>
      <div className="header fixed-top">
        <div className="header1 ">
          <div className="kfc col-7">
            <NavLink to="/">
              <img
                src="https://kfcvn-static.cognizantorderserv.com/images/web/kfc-logo.svg?v=5.0"
                alt=""
              />
            </NavLink>
            <h2>
              <NavLink className="black" to="/shop">
                Thực Đơn
              </NavLink>
            </h2>
            <h2>Khuyến Mãi</h2>
            <h2>Dịch vụ</h2>
            <h2>
              <NavLink to="/history">Lịch sử mua hàng</NavLink>
            </h2>
          </div>
          <div className="login col-3">
            <NavLink to="/cart">
              <div className="a-href">
                {cart ? (
                  cart.reduce((pre, cur) => (pre += cur.clickNumber), 0)
                ) : (
                  <div>0</div>
                )}
              </div>
            </NavLink>
            <div className="username">
              {loggedIn ? (
                <div className="username1">
                  <div className="username">
                    <i className="fa-solid fa-user"></i>
                    <p>{token.name}</p>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="username2">
                  <div className="username">
                    <i class="fa-solid fa-user"></i>
                  </div>
                </Link>
              )}
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bsBH-w_rE9dIDMcIadk_7W_QMrUTO0TyZqDxKi9t24e_nosOw8MCpy_9YuXUmu7ff4I&usqp=CAU"
              alt=""
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
