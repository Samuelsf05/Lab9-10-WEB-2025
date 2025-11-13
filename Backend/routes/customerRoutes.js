import express from "express";
import * as customerController from "../controllers/customerController.js";

const router = express.Router();

// GET: buscar clientes por código (DEBE IR ANTES de "/")
router.get("/search", customerController.searchCustomersByCode);

// GET: todos los clientes
router.get("/", customerController.getCustomers);

export default router;