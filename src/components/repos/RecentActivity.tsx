import React, { useState, useEffect } from 'react';
import { Activity, Clock, GitBranch, FileText, Upload, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define types for our activity data
interface ActivityItem {
  id: string;
  type: 'commit' | 'push' | 'pull' | 'create' | 'fork' | 'star' | 'upload';
  repositoryName: string;
  repositoryOwner: string;
  timestamp: Date;
  details: string;
  branch?: string;
}

// Props for the component
interface RecentActivityProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  limit = 5,
  showHeader = true,
  className = ''
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  // Get icon based on activity type
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'commit':
      case 'push':
        return <GitBranch className="text-green-500" />;
      case 'pull':
        return <GitBranch className="text-blue-500" />;
      case 'create':
        return <FileText className="text-purple-500" />;
      case 'fork':
        return <GitBranch className="text-orange-500" />;
      case 'star':
        return <Star className="text-yellow-500" />;
      case 'upload':
        return <Upload className="text-indigo-500" />;
      default:
        return <Activity className="text-gray-500" />;
    }
  };

  // Get descriptive text based on activity type
  const getActivityText = (activity: ActivityItem): string => {
    const repoLink = `${activity.repositoryOwner}/${activity.repositoryName}`;
    
    switch (activity.type) {
      case 'commit':
        return `Committed to ${repoLink}${activity.branch ? ` on ${activity.branch}` : ''}`;
      case 'push':
        return `Pushed to ${repoLink}${activity.branch ? ` on ${activity.branch}` : ''}`;
      case 'pull':
        return `Pulled from ${repoLink}${activity.branch ? ` on ${activity.branch}` : ''}`;
      case 'create':
        return `Created repository ${repoLink}`;
      case 'fork':
        return `Forked repository ${repoLink}`;
      case 'star':
        return `Starred repository ${repoLink}`;
      case 'upload':
        return `Uploaded files to ${repoLink}`;
      default:
        return `Action on ${repoLink}`;
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        // For now, we'll use mock data
        const mockActivities: ActivityItem[] = [
          {
            id: '1',
            type: 'commit',
            repositoryName: 'bitsync-frontend',
            repositoryOwner: 'yourusername',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            details: 'Updated landing page component',
            branch: 'main'
          },
          {
            id: '2',
            type: 'create',
            repositoryName: 'bitsync-api',
            repositoryOwner: 'yourusername',
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            details: 'Initial commit'
          },
          {
            id: '3',
            type: 'upload',
            repositoryName: 'bitsync-docs',
            repositoryOwner: 'yourusername',
            timestamp: new Date(Date.now() - 172800000), // 2 days ago
            details: 'Added documentation files'
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setActivities(mockActivities);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load recent activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 ${className}`}>
      {showHeader && (
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
          <Activity className="text-blue-500 mr-2" />
          Recent Activity
        </h3>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400 py-4 text-center">
          {error}
        </div>
      ) : activities.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300 italic py-4 text-center">
          No recent activities. Start by creating a repository or uploading a file!
        </div>
      ) : (
        <ul className="space-y-4">
          {activities.slice(0, limit).map(activity => (
            <li 
              key={activity.id}
              className="border-b dark:border-gray-600 pb-3 last:border-0"
            >
              <div className="flex items-start">
                <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg mr-3">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white font-medium">
                    {getActivityText(activity)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {activity.details}
                  </p>
                  <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatRelativeTime(activity.timestamp)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="mt-4 text-center">
          <Link 
            to="/activity" 
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View all activity
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;