import React, { useState, useEffect } from 'react';
import { Globe, Star, GitFork, Eye, Code, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define types for repository data
interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  languageColor: string;
  updatedAt: Date;
  isPublic: boolean;
}

// Define component props
interface ExploreRepositoriesProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
  filter?: 'trending' | 'popular' | 'newest' | 'all';
}

const ExploreRepositories: React.FC<ExploreRepositoriesProps> = ({
  limit = 3,
  showHeader = true,
  className = '',
  filter = 'trending'
}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(filter);

  // Format date to relative time
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    
    return date.toLocaleDateString();
  };

  // Get language badge color
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3572A5',
      Java: '#b07219',
      'C#': '#178600',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#A97BFF',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Shell: '#89e051'
    };
    
    return colors[language] || '#6e7681';
  };

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    fetchRepositories(newFilter);
  };

  const fetchRepositories = async (filterType: string) => {
    setLoading(true);
    try {
      // In a real app, you would fetch from an API with proper filtering
      // For now, we'll use mock data
      const mockRepositories: Repository[] = [
        {
          id: '1',
          name: 'bitsync-core',
          owner: 'bitsync',
          description: 'Core functionality for the BitSync distributed version control system',
          stars: 126,
          forks: 18,
          watchers: 42,
          language: 'TypeScript',
          languageColor: '#3178c6',
          updatedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
          isPublic: true
        },
        {
          id: '2',
          name: 'bitsync-cli',
          owner: 'bitsync',
          description: 'Command line interface for BitSync - manage your repositories with ease',
          stars: 92,
          forks: 11,
          watchers: 34,
          language: 'TypeScript',
          languageColor: '#3178c6',
          updatedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
          isPublic: true
        },
        {
          id: '3',
          name: 'react-sync-components',
          owner: 'janesmith',
          description: 'Reusable React components for version control UI',
          stars: 78,
          forks: 23,
          watchers: 15,
          language: 'JavaScript',
          languageColor: '#f7df1e',
          updatedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
          isPublic: true
        },
        {
          id: '4',
          name: 'bitsync-documentation',
          owner: 'bitsync',
          description: 'Official documentation and examples for BitSync',
          stars: 65,
          forks: 34,
          watchers: 27,
          language: 'Markdown',
          languageColor: '#083fa1',
          updatedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
          isPublic: true
        },
        {
          id: '5',
          name: 'sync-python-api',
          owner: 'johndoe',
          description: 'Python wrapper for the BitSync API',
          stars: 42,
          forks: 13,
          watchers: 9,
          language: 'Python',
          languageColor: '#3572A5',
          updatedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
          isPublic: true
        }
      ];
      
      // Apply filter logic (in a real app, this would be handled server-side)
      let filteredRepos = [...mockRepositories];
      switch (filterType) {
        case 'trending':
          filteredRepos.sort((a, b) => b.stars - a.stars);
          break;
        case 'popular':
          filteredRepos.sort((a, b) => (b.stars + b.forks) - (a.stars + a.forks));
          break;
        case 'newest':
          filteredRepos.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
          break;
        default:
          // 'all' filter - no additional sorting
          break;
      }
      
      // Simulate API delay
      setTimeout(() => {
        setRepositories(filteredRepos);
        setLoading(false);
      }, 600);
    } catch (err) {
      setError('Failed to load repositories');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories(filter);
  }, [filter]);

  const filterOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'all', label: 'All' }
  ];

  return (
    <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 ${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center text-gray-800 dark:text-white">
            <Globe className="text-green-500 mr-2" />
            Explore Repositories
          </h3>
          
          <div className="flex space-x-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeFilter === option.value
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400 py-4 text-center">
          {error}
        </div>
      ) : repositories.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300 italic py-4 text-center">
          No public repositories available yet.
        </div>
      ) : (
        <div className="space-y-4">
          {repositories.slice(0, limit).map(repo => (
            <Link 
              key={repo.id} 
              to={`/${repo.owner}/${repo.name}`}
              className="block border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 flex items-center">
                    <Code className="w-4 h-4 mr-1.5" />
                    {repo.owner}/{repo.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm line-clamp-2">
                    {repo.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {repo.language && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <span 
                      className="w-3 h-3 rounded-full mr-1" 
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    ></span>
                    {repo.language}
                  </div>
                )}
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stars}
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <GitFork className="w-4 h-4 mr-1" />
                  {repo.forks}
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4 mr-1" />
                  Updated {formatRelativeTime(repo.updatedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && repositories.length > 0 && (
        <div className="mt-6 text-center">
          <Link 
            to="/explore" 
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline font-medium"
          >
            Browse all repositories 
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExploreRepositories;