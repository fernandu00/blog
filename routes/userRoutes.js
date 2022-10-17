const userRouter = require("express").Router();
const {
  register,
  login,
  updateUser,
  getSingleUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.put("/:id", updateUser);

userRouter.get("/:id", getSingleUser);

userRouter.get("/", getAllUsers);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
