import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/categoryControllers";

const router = express.Router();

router.route("/").get(getAllCategory);
router.route("/").post(createCategory);
// router.route("/:id").get();
// router.route("/:id").delete();
// router.route("/:id").patch();

export default router;
