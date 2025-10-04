import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/Register'
import LoginPage from "./pages/login";
import ItemsPage from "./pages/Items";
import CreateItem from "./pages/CreateItem";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/create-item" element={<CreateItem />} />
    </Routes>
  )
}

export default App