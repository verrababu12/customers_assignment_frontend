import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/customers/new" element={<CustomerFormPage />} />
        <Route path="/customers/edit/:id" element={<CustomerFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
