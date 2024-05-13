import { Router } from "express";
const router = Router();

import {
  deleteUser,
  getUser,
  getUsers,
  postUsers,
  updateUser,
} from "../controllers/users.controllers.js";

router.get("/users", getUser);

router.get("/users/:id", getUsers);

router.post("/users", postUsers);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

export default router;
