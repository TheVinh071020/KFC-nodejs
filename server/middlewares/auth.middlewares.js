const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service");

module.exports.isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1].trim();
    console.log(token);
    let result = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(result);
    let { id } = result.data;
    let user = await usersService.findOne(id);
    console.log(user);
    if (user) {
      next();
    } else {
      res.json({
        messenge: "UnAuthorized",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};
