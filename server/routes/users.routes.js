const express = require("express");
const router = express.Router();
const db = require("../ultils/database");
const { usersService } = require("../services/users.service");

const {
  findAllUser,
  findOneUser,
  create,
  update,
  remove,
} = require("../controller/users.controller");

const { pagination } = require("../middlewares/user.middlewares");

const { isAuth } = require("../middlewares/auth.middlewares");

// GET All users
router.get("/", pagination, findAllUser);

// GET ONE user
router.get("/:id", findOneUser);

router.post("/", isAuth, create);

router.patch("/:id", update);


router.delete("/:id", remove);

module.exports = router;
