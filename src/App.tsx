import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPages from "./pages/DashboardPages";
import LoginPages from "./pages/auth/LoginPages";
import Notfound from "./pages/404/Notfound";
import AssetPages from "./pages/AssetPages";
import LevelPages from "./pages/LevelPages";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<DashboardPages />} />
          <Route path="/asset/pages" element={<AssetPages />} />
          <Route path="/level/pages" element={<LevelPages />} />
        </Route>
        <Route path="/auth/login" element={<LoginPages />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
