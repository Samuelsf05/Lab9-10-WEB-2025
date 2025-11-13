import express from "express";
import * as salesController from "../controllers/salesController.js";

const router = express.Router();

// GET: reporte de ventas por cliente (DEBE IR ANTES de "/")
router.get("/report", salesController.getSalesReport);

// GET: todas las ventas con datos del cliente
router.get("/", salesController.getSalesWithCustomer);

// POST: crear nueva venta
router.post("/", salesController.createSale);

export default router;