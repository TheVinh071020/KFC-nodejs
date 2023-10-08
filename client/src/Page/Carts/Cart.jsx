import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Cart.css";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../helpers";
import CartItem from "./CartItem";

function Cart() {
  const cart = useSelector((state) => state.cartReducer.cart);
  // console.log(cart);

  let navigate = useNavigate();
  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length > 0) {
      navigate("/checkout/step-1");
    } else {
      Swal.fire(
        "Không thành công",
        "Chưa có sản phẩm nào trong giỏ hàng",
        "warning"
      );
    }
  };
  return (
    <div>
      <Header />
      <div>
        <h1 className="titles">Giỏ hàng của tôi</h1>
        <div className="cart-tongg">
          {cart.length > 0 ? (
            <div className="carttt">
              {cart.map((e, i) => (
                <CartItem key={i} detail={e} />
              ))}
            </div>
          ) : (
            <p className="  ">Chưa có sản phẩm trong giỏ hàng</p>
          )}
          <div className="cart2">
            <h4>{cart.length} món ăn</h4>
            <hr />
            <div className="textline">
              <h3>
                <b>Bạn có Mã giảm giá?</b>
              </h3>
              <div className="input-container">
                <input
                  placeholder="Mã giảm giá"
                  className="input-field"
                  type="text"
                />
                <label htmlFor="input-field" className="input-label">
                  Mã giảm giá
                </label>
                <span className="input-highlight" />
                <button>Áp Dụng</button>
              </div>
              <hr />

              <div className="mony">
                <span>Tổng đơn hàng</span>
                <span>
                  {formatCurrency(
                    cart.reduce((pre, cur) => {
                      return (pre +=
                        cur.price * (1 - cur.sale) * cur.clickNumber);
                    }, 0)
                  )}
                </span>
              </div>

              <div className="mony1">
                <span>Tổng thanh toán</span>
                <span>
                  {formatCurrency(
                    cart.reduce((pre, cur) => {
                      return (pre +=
                        cur.price * (1 - cur.sale) * cur.clickNumber);
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <hr />
            <NavLink style={{ textDecoration: "none" }}>
              <button onClick={handleCheckout} className="mony2">
                <span>Thanh Toán</span>
                <span>
                  {formatCurrency(
                    cart.reduce((pre, cur) => {
                      return (pre +=
                        cur.price * (1 - cur.sale) * cur.clickNumber);
                    }, 0)
                  )}
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
