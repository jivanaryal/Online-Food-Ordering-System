import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from "../controllers/customerControllers";

const router = express.Router();

router.route("/").get(getAllCustomers);
router.route("/").post(createCustomer);
router.route("/:id").delete(deleteCustomer);
router.route("/:id").patch(updateCustomer);

export default router;
