import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "../controllers/customerControllers";

const router = express.Router();

router.route("/").get(getAllCustomers).post(createCustomer);
router.route("/:id").delete(deleteCustomer).patch(updateCustomer);

export default router;