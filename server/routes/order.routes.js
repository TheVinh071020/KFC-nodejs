const express = require("express");
const router = express.Router();
const db = require("../ultils/database");
const { getDate } = require("../helpers/index.");
const mysql = require("mysql2");
const { pagination } = require("../middlewares/order.middlewares");

router.get("/", pagination, async (req, res) => {
  try {
    let data = await db.execute(
      `
    SELECT u.users_id, o.order_id, o.order_name, o.status, o.email, o.phone, o.address, p.product_id, od.number as quantity, p.name, p.price, p.sale, p.img
    FROM users as u
    INNER JOIN \`order\` as o ON u.users_id = o.user_id
    INNER JOIN order_detail as od ON od.order_id = o.order_id
    INNER JOIN product as p ON p.product_id = od.product_id
    `
    );
    let rows = data[0];
    res.json({
      messenge: "GET ALL",
      rows,
    });
  } catch (error) {
    res.json({
      mesage: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let sql = `SELECT od.order_id, od.email, od.order_name, od.phone, od.address, od.province, od.district, od.ward, o.number, p.product_id, p.number, p.name, p.price, p.sale as stock, p.price, p.sale 
            FROM ?? as o 
            INNER JOIN ?? as od 
            ON o.order_id = od.order_id 
            INNER JOIN ?? as p 
            ON o.product_id = p.product_id
            WHERE o.order_id = ? `;
    let inserted = ["order_detail", "order", "product", id];
    sql = mysql.format(sql, inserted);
    // console.log(sql);
    let result = await db.execute(sql);
    let rowOrders = result[0];
    console.log(rowOrders);
    res.json({
      rowOrders,
      messenge: "GET ALL ORDERS",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let {
      user_id,
      name,
      email,
      phone,
      address,
      province,
      district,
      ward,
      cart,
    } = req.body;
    let sql = mysql.format(
      `INSERT INTO ?? (order_name, user_id, created_at, status, email, phone, address, province, district, ward) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "order",
        name,
        user_id,
        getDate(),
        "pending",
        email,
        phone,
        address,
        province,
        district,
        ward,
      ]
    );
    let result = await db.execute(sql);
    console.log(result);
    let orderDetailSql = `INSERT INTO order_detail (product_id, order_id, number) VALUES `;
    let inserted = [];

    cart.forEach((e) => {
      orderDetailSql += `(?, ?, ?) ,`;
      inserted.push(e.product_id);
      inserted.push(result[0].insertId);
      inserted.push(e.clickNumber);
    });
    let sqlQuery = orderDetailSql.slice(0, -1);
    sqlQuery = mysql.format(sqlQuery, inserted);
    let result2 = await db.execute(sqlQuery);
    console.log(result2[0]);
    res.json({
      messenge: "Đặt hàng thành công",
      orderId: result[0].insertId,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  try {
    let updateOrder = await db.execute(
      `UPDATE \`order\` SET status = ? WHERE order_id = ?`,
      [status || rowOrder[0].status, id]
    );
    res.json({
      message: "Update product success",
    });
  } catch (error) {
    res.json({
      messenge: "Update not success",
    });
  }
});

module.exports = router;
