// Khởi tạo server
const express = require("express");
const server = express();

// Require các packages cần thiết
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// SD các packages
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

// import routes
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");
const orderDetail = require("./routes/orderDetail.routes");

// Set up routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/products", productRoutes);
server.use("/api/v1/categories", categoryRoutes);
server.use("/api/v1/order-details", orderDetail);
server.use("/api/v1/orders", orderRoutes);

server.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
