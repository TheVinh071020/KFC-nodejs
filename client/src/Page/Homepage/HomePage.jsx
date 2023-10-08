import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import ListProduct from "../ListProduct/ListProduct";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const fetchUser = async (req, res) => {
    let userLogin = JSON.parse(localStorage.getItem("user"));
    let userId = userLogin[0].users_id;
    console.log(userId);
    await axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        if (res.data.status === 1) {
          Swal.fire("User Locked", "Tài khoản của bạn đã bị khóa", "warning");
          localStorage.removeItem("token");
          localStorage.removeItem("cart");
          localStorage.removeItem("user");
          // Navigate đến /login
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="carousel">
        <Carousel interval={2000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="	https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Homde-phase2.webp?v=gXdqeg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/DuaSoRi.webp?v=gXdqeg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/tnag.webp?v=gXdqeg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <ListProduct />
      <Footer />
    </div>
  );
}

export default HomePage;
