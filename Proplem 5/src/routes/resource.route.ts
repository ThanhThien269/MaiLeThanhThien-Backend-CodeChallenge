import express from "express";
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller";

const router = express.Router();

router.post("/create", createResource);
router.get("/list", getResources);
//@ts-ignore
router.get("/detail/:id", getResourceById);
//@ts-ignore
router.put("/update/:id", updateResource);
//@ts-ignore
router.delete("/delete/:id", deleteResource);

export default router;
