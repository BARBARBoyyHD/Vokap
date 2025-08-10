import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPages from "./pages/DashboardPages";
import LoginPages from "./pages/auth/LoginPages";
import RegisterPages from "./pages/auth/RegisterPages";
import Notfound from "./pages/404/Notfound";
import AssetPages from "./pages/AssetPages";
import LevelPages from "./pages/LevelPages";
import QuestionPages from "./pages/QuestionPages";
import WordShufflePages from "./pages/WordShufflePages";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<DashboardPages />} />
          <Route path="/asset/pages" element={<AssetPages />} />
          <Route path="/level/pages" element={<LevelPages />} />
          <Route path="/Question/pages" element={<QuestionPages />} />
          <Route path="/WordShuffle/pages" element={<WordShufflePages />} />
        </Route>
        <Route path="/Register/pages" element={<RegisterPages />} />
        <Route path="/auth/login" element={<LoginPages />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
