import express from 'express'
import {
  getUsers,
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
  register,
} from '../controllers/users.js'

const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUserInfo);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);


router.post("/register", register);

export default router;
