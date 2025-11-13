// src/components/SaleForm.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";

const SaleForm = () => {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get("/api/customers");
        setCustomers(response.data);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
      }
    };
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await API.post("/api/sales", {
        amount: parseFloat(amount),
        id_customer: parseInt(idCustomer)
      });
      setMessage(response.data.message);
      setAmount("");
      setIdCustomer("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar venta");
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Monto: </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Cliente: </label>
          <select
            value={idCustomer}
            onChange={(e) => setIdCustomer(e.target.value)}
            required
          >
            <option value="">Seleccionar cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.code})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Registrar Venta</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SaleForm;