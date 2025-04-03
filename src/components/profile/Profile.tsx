import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Calendar, Edit, Activity, Folder, Star, Settings, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  location: string;
  bio: string;
  avatarUrl: string;
  joinedDate: string;
  repositories: number;
  stars: number;
  contributions: number;
}

interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete' | 'star';
  entityName: string;
  entityType: 'repository' | 'file';
  timestamp: string;
}

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'repositories' | 'settings'>('overview');

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockProfile: UserProfile = {
        id: '1',
        name: 'Alex Johnson',
        username: 'alexjohnson',
        email: 'alex@example.com',
        location: 'San Francisco, CA',
        bio: 'Software engineer passionate about web development and open source projects.',
        avatarUrl: '/api/placeholder/150/150',
        joinedDate: '2024-12-15T00:00:00Z',
        repositories: 12,
        stars: 48,
        contributions: 237
      };

      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'create',
          entityName: 'project-alpha',
          entityType: 'repository',
          timestamp: '2025-03-28T14:32:00Z'
        },
        {
          id: '2',
          type: 'update',
          entityName: 'documentation',
          entityType: 'repository',
          timestamp: '2025-03-26T10:15:00Z'
        },
        {
          id: '3',
          type: 'create',
          entityName: 'config.json',
          entityType: 'file',
          timestamp: '2025-03-25T16:45:00Z'
        },
        {
          id: '4',
          type: 'star',
          entityName: 'open-source-project',
          entityType: 'repository',
          timestamp: '2025-03-22T09:30:00Z'
        }
      ];

      setProfile(mockProfile);
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'create':
        return <Plus className="text-green-500" size={16} />;
      case 'update':
        return <Edit className="text-blue-500" size={16} />;
      case 'delete':
        return <Trash className="text-red-500" size={16} />;
      case 'star':
        return <Star className="text-yellow-500" size={16} />;
      default:
        return <Activity className="text-gray-500" size={16} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      {profile && (
        <>
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{profile.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">@{profile.username}</p>
                  </div>
                  <Link 
                    to="/profile/edit" 
                    className="mt-4 md:mt-0 flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit className="mr-2" size={16} />
                    Edit Profile
                  </Link>
                </div>
                
                <p className="mt-4 text-gray-700 dark:text-gray-300">{profile.bio}</p>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Mail size={16} className="mr-1" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>Joined {formatDate(profile.joinedDate)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Folder className="text-blue-500 mr-2" size={20} />
                <div>
                  <div className="font-semibold text-lg text-gray-800 dark:text-white">{profile.repositories}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Repositories</div>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-500 mr-2" size={20} />
                <div>
                  <div className="font-semibold text-lg text-gray-800 dark:text-white">{profile.stars}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Stars</div>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="text-green-500 mr-2" size={20} />
                <div>
                  <div className="font-semibold text-lg text-gray-800 dark:text-white">{profile.contributions}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Contributions</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm leading-5 ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm leading-5 ${
                  activeTab === 'repositories'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('repositories')}
              >
                Repositories
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm leading-5 ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {activities.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {activities.map(activity => (
                      <li key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="font-medium">
                                {activity.type === 'create' && 'Created'}
                                {activity.type === 'update' && 'Updated'}
                                {activity.type === 'delete' && 'Deleted'}
                                {activity.type === 'star' && 'Starred'}
                              </span> {' '}
                              {activity.entityType === 'repository' ? 'repository' : 'file'} {' '}
                              <Link to={`/repositories/${activity.entityName}`} className="text-blue-600 hover:underline">
                                {activity.entityName}
                              </Link>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(activity.timestamp)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-gray-500 dark:text-gray-400">No recent activity</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'repositories' && (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Repositories</h2>
              <p className="text-gray-500 dark:text-gray-400">
                This tab would display all repositories owned by {profile.name}
              </p>
              <Link 
                to="/repositories" 
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View All Repositories
              </Link>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                <Settings className="mr-2" size={20} />
                Profile Settings
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Manage your account settings and preferences
              </p>
              
              <div className="space-y-4">
                <Link 
                  to="/profile/edit" 
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium text-gray-800 dark:text-white">Personal Information</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your name, bio, and contact information</p>
                </Link>
                
                <Link 
                  to="/profile/security" 
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium text-gray-800 dark:text-white">Account Security</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your password and security settings</p>
                </Link>
                
                <Link 
                  to="/profile/notifications" 
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Configure how you receive notifications</p>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;