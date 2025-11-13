import pool from "../db.js";

// Ejercicio 2: GET todos los clientes
export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Ejercicio 5: Buscar clientes por código
export const searchCustomersByCode = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "El parámetro 'code' es requerido" });
    }

    const result = await pool.query(
      "SELECT * FROM customers WHERE code = $1",
      [code]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al buscar clientes:", error);
    res.status(500).json({ error: "Error al buscar clientes" });
  }
};