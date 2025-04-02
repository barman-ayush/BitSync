import { 
  Home, 
  Plus, 
  Upload, 
  Search, 
  Activity, 
  Globe, 
  Bell, 
} from 'lucide-react';
import { useState } from 'react';
import HeroSection from '../landingPage/heroSection.component';
import FileUploadModal from '../modals/FileUploadModal';

const LandingPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const quickActions = [
    { 
      icon: <Plus className="mr-2" />, 
      text: 'Create Repository', 
      href: '/create-repo',
      className: 'btn-primary'
    },
    { 
      icon: <Upload className="mr-2" />, 
      text: 'Upload Files', 
      action: () => setIsUploadModalOpen(true),
      className: 'btn-secondary'
    },
    { 
      icon: <Search className="mr-2" />, 
      text: 'Search', 
      href: '/search',
      className: 'btn-secondary'
    }
  ];

  const sections = [
    {
      title: 'Recent Activity',
      icon: <Activity className="text-blue-500 mr-2" />,
      content: 'No recent activities. Start by creating a repository or uploading a file!',
      emptyState: true
    },
    {
      title: 'Explore Repositories',
      icon: <Globe className="text-green-500 mr-2" />,
      content: 'Discover public repositories once available.',
      emptyState: true
    },
    {
      title: 'Notifications',
      icon: <Bell className="text-orange-500 mr-2" />,
      content: 'No notifications at the moment.',
      emptyState: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Integrated Hero Section */}
      <HeroSection onOpenUploadModal={openUploadModal} />

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
            <Home className="mr-2 text-blue-500" /> Quick Actions
          </h2>
          <div className="flex space-x-4">
            {quickActions.map((action, index) => (
              action.action ? (
                <button 
                  key={index} 
                  onClick={action.action} 
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${action.className}`}
                >
                  {action.icon}
                  {action.text}
                </button>
              ) : (
                <a 
                  key={index} 
                  href={action.href} 
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${action.className}`}
                >
                  {action.icon}
                  {action.text}
                </a>
              )
            ))}
          </div>
        </section>

        {/* Dynamic Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                {section.icon}
                {section.title}
              </h3>
              <div className={`${section.emptyState ? 'text-gray-500 dark:text-gray-300 italic' : ''}`}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-6">
          <p>&copy; 2025 BitSync. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Support</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
          </div>
        </footer>
      </div>
      
      {/* File Upload Modal */}
      <FileUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;