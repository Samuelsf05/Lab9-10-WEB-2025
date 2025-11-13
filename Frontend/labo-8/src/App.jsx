import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import CustomerList from "./components/CustomerList";
import SaleForm from "./components/SaleForm";
import SalesList from "./components/SalesList";
import CustomerSearch from "./components/CustomerSearch";
import SalesReport from "./components/SalesReport";

const App = () => (
  <Router>
    <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px", borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>
        <Link to="/customers" style={{ marginRight: "15px" }}>Clientes</Link>
        <Link to="/sales/new" style={{ marginRight: "15px" }}>Nueva Venta</Link>
        <Link to="/sales" style={{ marginRight: "15px" }}>Ver Ventas</Link>
        <Link to="/customers/search" style={{ marginRight: "15px" }}>Buscar Cliente</Link>
        <Link to="/sales/report" style={{ marginRight: "15px" }}>Reporte</Link>
        <Link to="/auth/signin" style={{ marginRight: "15px" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/sales/new" element={<SaleForm />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/customers/search" element={<CustomerSearch />} />
        <Route path="/sales/report" element={<SalesReport />} />
        <Route path="/auth/signin" element={<Login />} />
      </Routes>
    </div>
  </Router>
);

export default App;