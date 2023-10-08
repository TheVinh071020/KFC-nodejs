import React, { useEffect, useState } from "react";
import "./ProductAdmin.css";
import axios from "axios";
import { formatCurrency } from "../helpers";
import PaginationHistory from "./PaginationHistory";

function Historypage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchOrder = async (pageIndex, pageNumber) => {
    console.log(pageIndex, pageNumber);
    await axios
      .get(`http://localhost:3000/api/v1/orders`)
      .then((res) => {
        setOrders(res.data.rows);
        setTotal(res.data.length);
      })
      .catch((err) => console.log(err));
  };
  console.log(total);
  useEffect(() => {
    fetchOrder(1, 5);
  }, []);

  const handleStatus = async (order_id) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/orders/${order_id}`, {
        status: "confirm",
      });

      const updatedOrders = orders.map((order) =>
        order.order_id === order_id ? { ...order, status: "confirm" } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
    }
  };

  return (
    <div>
      <div className="row mb-3">
        <h1>History Detail</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Order ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Name Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Price</th>
              <th scope="col" colSpan={1}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((e, i) => (
              <tr key={i}>
                <td>{e.users_id}</td>
                <td>{e.order_id}</td>
                <td>{e.order_name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.address}</td>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>{formatCurrency(e.price * (1 - e.sale))}</td>
                <td>
                  <img
                    style={{ width: "70px", height: "70px" }}
                    src={e.img}
                    alt=""
                  />
                </td>
                <td>
                  {e.status == "pending" ? (
                    <button
                      onClick={() => handleStatus(e.order_id)}
                      className="btn btn-info"
                    >
                      {e.status}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(e.order_id)}
                      className="btn btn-success"
                    >
                      {e.status}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationHistory total={total} fetchOrder={fetchOrder} />
      </div>
    </div>
  );
}

export default Historypage;
