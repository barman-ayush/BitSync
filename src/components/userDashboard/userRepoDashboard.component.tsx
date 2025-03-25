import { useState } from 'react';
import { 
  Plus, 
  Book, 
  Star, 
  GitBranch, 
  Eye, 
  Lock, 
  Unlock, 
  Archive 
} from 'lucide-react';
import { Button } from 'flowbite-react';

// Mock data - in real app, this would come from backend
const mockRepositories = [
  {
    id: 1,
    name: 'project-management-app',
    description: 'Comprehensive project management solution with real-time collaboration',
    language: 'TypeScript',
    stars: 42,
    forks: 12,
    isPrivate: false,
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    name: 'machine-learning-toolkit',
    description: 'Advanced ML algorithms and data preprocessing tools',
    language: 'Python',
    stars: 87,
    forks: 23,
    isPrivate: true,
    lastUpdated: '1 day ago'
  },
  {
    id: 3,
    name: 'blockchain-wallet',
    description: 'Secure cryptocurrency wallet with multi-chain support',
    language: 'Rust',
    stars: 156,
    forks: 45,
    isPrivate: false,
    lastUpdated: '3 days ago'
  }
];

const UserRepoDashboard = () => {
  const [activeTab, setActiveTab] = useState('repositories');

  const renderRepositories = () => (
    <div className="space-y-4">
      {mockRepositories.map(repo => (
        <div 
          key={repo.id} 
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Book className="mr-2 text-gray-500" size={20} />
              <a 
                href={`/repo/${repo.name}`} 
                className="text-blue-600 font-semibold hover:underline"
              >
                {repo.name}
              </a>
              {repo.isPrivate ? (
                <Lock className="ml-2 text-gray-500" size={16} />
              ) : (
                <Unlock className="ml-2 text-green-500" size={16} />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {repo.language}
              </span>
              <div className="flex items-center text-gray-600">
                <Star size={16} className="mr-1" />
                {repo.stars}
              </div>
              <div className="flex items-center text-gray-600">
                <GitBranch size={16} className="mr-1" />
                {repo.forks}
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-2">{repo.description}</p>
          <div className="text-xs text-gray-500">
            Updated {repo.lastUpdated}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center mb-8">
        <img 
          src="/path/to/user-avatar.png" 
          alt="User Avatar" 
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-gray-600">Software Engineer | Open Source Contributor</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6 flex space-x-6">
        {[
          { key: 'repositories', label: 'Repositories', icon: <Book size={18} /> },
          { key: 'overview', label: 'Overview', icon: <Eye size={18} /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center pb-2 ${
              activeTab === tab.key 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500'
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
        <div className="ml-auto">
          <Button 
            gradientDuoTone="purpleToBlue" 
            size="sm"
            className="flex items-center"
          >
            <Plus className="mr-2" size={18} />
            New Repository
          </Button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'repositories' && renderRepositories()}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Archive className="mr-2 text-blue-500" />
              Featured Repositories
            </h3>
            {/* Add featured repos */}
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">
              Contributions
            </h3>
            {/* Add contribution graph */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRepoDashboard;