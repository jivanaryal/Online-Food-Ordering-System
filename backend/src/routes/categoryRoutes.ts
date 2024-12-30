import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryControllers";

const router = express.Router();

router.route("/").get(getAllCategory).post(createCategory);
router.route("/:id").get(getCategoryById).delete(deleteCategory).patch(updateCategory);

export default router;