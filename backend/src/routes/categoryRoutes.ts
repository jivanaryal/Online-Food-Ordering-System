import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryControllers";

const router = express.Router();

router.route("/").get(getAllCategory);
router.route("/").post(createCategory);
router.route("/:id").get(getCategoryById);
router.route("/:id").delete(deleteCategory);
router.route("/:id").patch(updateCategory);

export default router;