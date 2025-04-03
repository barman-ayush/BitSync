import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
import LandingPage from "./components/landingPage/LandingPage.component";
import Repositories from "./components/profile/Repositories";
import Profile from "./components/profile/Profile";
import UserRepoDashboard from "./components/userDashboard/userRepoDashboard.component";
import Support from "./components/support/Support";
import { Notifications } from "./components/profile/Notifications";
import AccountSecurity from "./components/profile/AccountSecurity";
import PersonalInformation from "./components/profile/PersonalInformation";
import CreateRepository from "./components/repos/CreateRepository";
import Search from "./components/repos/Search";
import RecentActivity from "./components/repos/RecentActivity";
import ExploreRepositories from "./components/repos/ExploreRepositories";

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
            <Route path="/repositories" element={<Repositories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<UserRepoDashboard />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile/notifications" element={<Notifications />} />
            <Route path="/profile/security" element={<AccountSecurity />} />
            <Route path="/profile/edit" element={<PersonalInformation />} />
            <Route path="/create-repo" element={<CreateRepository />} />
            <Route path="/search" element={<Search />} />
            <Route path="/activity" element={<RecentActivity />} />
            <Route path="/explore" element={<ExploreRepositories />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </header>
    </div>
  );
}