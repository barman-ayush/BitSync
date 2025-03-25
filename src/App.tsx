import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
import LandingPage from "./components/landingPage/LandingPage.component";
import UserRepoDashboard from "./components/userDashboard/userRepoDashboard.component";

export default function App() {
  return (
    <div
      className="app bg-white dark:bg-gray-900"
      style={{ minHeight: "100vh" }}
    >
      <header>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/dashboard" element={<UserRepoDashboard/>} />
          </Routes>
        </main>
      </header>
    </div>
  );
}
