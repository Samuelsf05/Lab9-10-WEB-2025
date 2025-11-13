import React, { useEffect, useState } from "react";
import API from "../utils/api";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await API.get("/api/sales");
        setSales(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar ventas");
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>${parseFloat(sale.amount).toFixed(2)}</td>
              <td>{new Date(sale.created_at).toLocaleString()}</td>
              <td>{sale.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;