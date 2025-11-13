import pool from "../db.js";

// Ejercicio 3: POST crear nueva venta
export const createSale = async (req, res) => {
  try {
    const { amount, id_customer } = req.body;

    // Validaciones
    if (!amount || !id_customer) {
      return res.status(400).json({ 
        error: "amount y id_customer son requeridos" 
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ 
        error: "El monto debe ser mayor a 0" 
      });
    }

    // Verificar que el cliente existe
    const customerCheck = await pool.query(
      "SELECT id FROM customers WHERE id = $1",
      [id_customer]
    );

    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ 
        error: "El cliente no existe" 
      });
    }

    // Insertar venta
    const result = await pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, CURRENT_TIMESTAMP, $2) RETURNING *",
      [amount, id_customer]
    );

    res.status(201).json({
      message: "Venta registrada exitosamente",
      sale: result.rows[0]
    });
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ error: "Error al crear venta" });
  }
};

// Ejercicio 4: GET ventas con datos del cliente
export const getSalesWithCustomer = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.amount, s.created_at, c.name
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

// Ejercicio 6: Reporte de ventas por cliente
export const getSalesReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.name, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN customers c ON s.id_customer = c.id
      GROUP BY c.name
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener reporte:", error);
    res.status(500).json({ error: "Error al obtener reporte" });
  }
};