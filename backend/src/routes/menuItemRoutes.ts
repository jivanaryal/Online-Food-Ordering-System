import express from "express";
import {
  createMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
} from "../controllers/menuItemControllers";

const router = express.Router();

router.route("/").get(getAllMenuItems).post(createMenuItem);
router
  .route("/:id")
  .get(getMenuItemById)
  .delete(deleteMenuItem)
  .patch(updateMenuItem);
export default router;