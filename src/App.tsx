import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
import LandingPage from "./components/landingPage/LandingPage.component";

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
          </Routes>
        </main>
      </header>
    </div>
  );
}
