import express from "express";
import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrders,
} from "../controllers/orderControllers";

const router = express.Router();

router.route("/").get(getAllOrders).post(createOrders);
router.route("/:id").get(getOrderById).delete(deleteOrder).patch(updateOrders);
export default router;