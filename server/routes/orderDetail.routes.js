const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

router.post("/add-to-cart", async (req, res) => {
  const { product_id, number } = req.body;
  let data = await db.execute(
    "INSERT INTO order_detail (product_id, number ) VALUES(?, ?)",
    [product_id, number]
  );
  console.log(data);
  res.json({ mesage: "Success add to cart" });
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    let data = await db.execute(
      `
  SELECT od.order_detail_id, od.product_id, od.order_id, od.number as quantity, o.status, p.*
  FROM order_detail AS od
  INNER JOIN product AS p ON od.product_id = p.product_id
  INNER JOIN \`order\` AS o ON od.order_id = o.order_id 
  WHERE o.order_id = ?`,
      [id]
    );
    let rows = data[0];
    console.log(rows);
    res.json({
      mesage: "Get one success",
      rows,
    });
  } catch (error) {
    res.json({
      mesage: error,
    });
  }
});

module.exports = router;
