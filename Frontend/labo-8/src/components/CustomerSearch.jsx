import React, { useState } from "react";
import API from "../utils/api";

const CustomerSearch = () => {
  const [code, setCode] = useState("");
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSearched(true);

    try {
      const response = await API.get(`/api/customers/search?code=${encodeURIComponent(code)}`);
      setCustomers(response.data);
    } catch (err) {
      setError("Error al buscar clientes");
    }
  };

  return (
    <div>
      <h2>Buscar Clientes por Código</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Código del cliente"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && customers.length === 0 && !error && (
        <p>No se encontraron clientes con ese código</p>
      )}

      {customers.length > 0 && (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerSearch;