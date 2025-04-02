import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
import LandingPage from "./components/landingPage/LandingPage.component";
import UserRepoDashboard from "./components/userDashboard/userRepoDashboard.component";

// Add CSS for buttons that our modals and components will use
const globalStyles = `
  .btn-primary {
    background-color: #3b82f6;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #2563eb;
  }
  
  .btn-secondary {
    background-color: #f3f4f6;
    color: #1f2937;
    border: 1px solid #e5e7eb;
  }
  
  .btn-secondary:hover {
    background-color: #e5e7eb;
  }
`;

export default function App() {
  return (
    <div
      className="app bg-white dark:bg-gray-900"
      style={{ minHeight: "100vh" }}
    >
      {/* Add global styles */}
      <style>{globalStyles}</style>
      
      <header>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<UserRepoDashboard />} />
          </Routes>
        </main>
      </header>
    </div>
  );
}