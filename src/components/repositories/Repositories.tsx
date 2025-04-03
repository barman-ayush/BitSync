import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, ArrowUpDown, Folder, Star, GitFork } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  updatedAt: string;
  isPublic: boolean;
}

const Repositories: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('updatedAt');
  const [filterBy, setFilterBy] = useState<string>('all');

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockRepositories = [
        {
          id: '1',
          name: 'project-alpha',
          description: 'Main development repository for Alpha project',
          stars: 5,
          forks: 2,
          updatedAt: '2025-03-22T10:30:00Z',
          isPublic: true
        },
        {
          id: '2',
          name: 'documentation',
          description: 'Technical documentation for all projects',
          stars: 3,
          forks: 0,
          updatedAt: '2025-03-20T14:45:00Z',
          isPublic: true
        },
        {
          id: '3',
          name: 'private-config',
          description: 'Configuration files for deployment',
          stars: 0,
          forks: 0,
          updatedAt: '2025-04-01T09:15:00Z',
          isPublic: false
        }
      ];
      setRepositories(mockRepositories);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort repositories
  const filteredRepositories = repositories
    .filter(repo => {
      // Filter by visibility
      if (filterBy === 'public' && !repo.isPublic) return false;
      if (filterBy === 'private' && repo.isPublic) return false;
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return repo.name.toLowerCase().includes(query) || 
               repo.description.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criterion
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stars':
          return b.stars - a.stars;
        case 'updatedAt':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Repositories</h1>
        <Link 
          to="/create-repo" 
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="mr-2" size={18} />
          New Repository
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-500 dark:text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Find a repository..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                <Filter size={16} />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="updatedAt">Last updated</option>
                <option value="name">Name</option>
                <option value="stars">Stars</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                <ArrowUpDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repository List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredRepositories.length > 0 ? (
        <div className="space-y-4">
          {filteredRepositories.map((repo) => (
            <div key={repo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <Folder className="text-blue-500 mr-2" size={20} />
                    <Link to={`/repositories/${repo.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                      {repo.name}
                    </Link>
                    <span className="ml-3 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {repo.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{repo.description}</p>
                  
                  <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mr-4">
                      <Star className="mr-1" size={16} />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <GitFork className="mr-1" size={16} />
                      <span>{repo.forks}</span>
                    </div>
                    <div>Updated on {formatDate(repo.updatedAt)}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/repositories/${repo.id}/edit`}
                    className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <Folder className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No repositories found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchQuery ? 'Try adjusting your search or filter criteria.' : 'Create your first repository to get started.'}
          </p>
          {!searchQuery && (
            <Link
              to="/create-repo"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="mr-2" size={18} />
              Create Repository
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Repositories;