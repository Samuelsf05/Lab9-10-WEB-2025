import React, { useEffect, useState } from "react";
import API from "../utils/api";

const SalesReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await API.get("/api/sales/report");
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar reporte");
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Reporte de Ventas por Cliente</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${parseFloat(item.total_sales).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;