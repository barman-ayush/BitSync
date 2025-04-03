import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Filter, 
  FileCode, 
  GitBranch, 
  User, 
  Clock, 
  Star, 
  Tag,
  Code,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

// Types
interface Repository {
  id: string;
  name: string;
  description: string;
  owner: string;
  stars: number;
  lastUpdated: string;
  language: string;
  isPublic: boolean;
}

interface FileResult {
  id: string;
  name: string;
  path: string;
  repository: string;
  owner: string;
  matchingLines: Array<{
    lineNumber: number;
    content: string;
  }>;
}

interface UserResult {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  repositories: number;
}

type SearchResult = Repository | FileResult | UserResult;

type SearchCategory = 'all' | 'repositories' | 'code' | 'users';

// Mock data generator for demo purposes
const generateMockResults = (
  query: string, 
  category: SearchCategory, 
  count: number = 5
): SearchResult[] => {
  if (!query) return [];

  // Create mock repositories
  if (category === 'repositories' || category === 'all') {
    return Array(count).fill(null).map((_, index) => ({
      id: `repo-${index}`,
      name: `${query}-project-${index}`,
      description: `A sample repository that matches the query "${query}" with various features and functionalities.`,
      owner: `user-${index % 3}`,
      stars: Math.floor(Math.random() * 1000),
      lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      language: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust'][index % 5],
      isPublic: Math.random() > 0.3
    })) as Repository[];
  }

  // Create mock code/file results
  if (category === 'code') {
    return Array(count).fill(null).map((_, index) => ({
      id: `file-${index}`,
      name: `${['index', 'utils', 'helpers', 'types', 'constants'][index % 5]}.${['ts', 'tsx', 'js', 'jsx', 'py'][index % 5]}`,
      path: `src/${['components', 'utils', 'hooks', 'pages', 'services'][index % 5]}`,
      repository: `project-${index % 3}`,
      owner: `user-${index % 3}`,
      matchingLines: [
        {
          lineNumber: Math.floor(Math.random() * 100) + 1,
          content: `function ${query}() { return "This is a sample match"; }`
        },
        {
          lineNumber: Math.floor(Math.random() * 100) + 50,
          content: `const ${query}Value = "Another matching line with the query term";`
        }
      ]
    })) as FileResult[];
  }

  // Create mock user results
  if (category === 'users') {
    return Array(count).fill(null).map((_, index) => ({
      id: `user-${index}`,
      username: `${query.toLowerCase()}-user-${index}`,
      fullName: `${query} Sample User ${index}`,
      avatarUrl: `https://i.pravatar.cc/150?u=${query}-${index}`,
      repositories: Math.floor(Math.random() * 50)
    })) as UserResult[];
  }

  // Default mixed results for 'all' category
  return [
    ...(generateMockResults(query, 'repositories', 2) as Repository[]),
    ...(generateMockResults(query, 'code', 2) as FileResult[]),
    ...(generateMockResults(query, 'users', 1) as UserResult[])
  ];
};

// Search component
const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const category = (searchParams.get('category') as SearchCategory) || 'all';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(query);
  
  // Filters
  const [filters, setFilters] = useState({
    language: '',
    visibility: 'all', // 'all', 'public', 'private'
    dateRange: 'anytime' // 'anytime', 'today', 'this-week', 'this-month', 'this-year'
  });
  
  const categories: Array<{ id: SearchCategory; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All', icon: <SearchIcon size={16} /> },
    { id: 'repositories', label: 'Repositories', icon: <GitBranch size={16} /> },
    { id: 'code', label: 'Code', icon: <Code size={16} /> },
    { id: 'users', label: 'Users', icon: <User size={16} /> },
  ];
  
  const languages = ['All', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C#', 'PHP', 'Ruby'];
  
  const dateRanges = [
    { id: 'anytime', label: 'Anytime' },
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This week' },
    { id: 'this-month', label: 'This month' },
    { id: 'this-year', label: 'This year' }
  ];
  
  const visibilityOptions = [
    { id: 'all', label: 'All' },
    { id: 'public', label: 'Public' },
    { id: 'private', label: 'Private' }
  ];
  
  // Perform search when query or category changes
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    const fetchResults = async () => {
      setIsLoading(true);
      
      try {
        // This would be an API call in a real application
        // const response = await api.search(query, category, filters);
        // setResults(response.data);
        
        // Using mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const mockResults = generateMockResults(query, category, 10);
        setResults(mockResults);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [query, category, filters]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Don't search for empty strings
    if (!inputValue.trim()) return;
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', inputValue);
    setSearchParams(newParams);
  };
  
  const handleCategoryChange = (newCategory: SearchCategory) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', newCategory);
    setSearchParams(newParams);
  };
  
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };
  
  const clearSearch = () => {
    setInputValue('');
    navigate('/search');
  };
  
  // Helper function to determine if a result is a specific type
  const isRepository = (result: SearchResult): result is Repository => 
    'stars' in result && 'language' in result;
  
  const isFileResult = (result: SearchResult): result is FileResult => 
    'matchingLines' in result && 'path' in result;
  
  const isUserResult = (result: SearchResult): result is UserResult => 
    'username' in result && 'repositories' in result;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center mb-6">
            <SearchIcon className="mr-2" /> Search
          </h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="w-full py-3 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search repositories, code, or users..."
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm overflow-x-auto">
            <div className="flex">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-6 py-3 flex items-center whitespace-nowrap ${
                    category === cat.id 
                      ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium mb-4 flex items-center text-gray-800 dark:text-white">
                <Filter className="mr-2" size={18} /> Filters
              </h2>
              
              {/* Show language filter for repositories and code */}
              {(category === 'all' || category === 'repositories' || category === 'code') && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Language
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {languages.map(lang => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="radio"
                          name="language"
                          checked={filters.language === (lang === 'All' ? '' : lang)}
                          onChange={() => handleFilterChange('language', lang === 'All' ? '' : lang)}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {lang}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Show visibility filter for repositories */}
              {(category === 'all' || category === 'repositories') && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Visibility
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {visibilityOptions.map(option => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="radio"
                          name="visibility"
                          checked={filters.visibility === option.id}
                          onChange={() => handleFilterChange('visibility', option.id)}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Date Range Filter */}
              {(category === 'all' || category === 'repositories' || category === 'code') && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Last Updated
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {dateRanges.map(range => (
                      <label key={range.id} className="flex items-center">
                        <input
                          type="radio"
                          name="dateRange"
                          checked={filters.dateRange === range.id}
                          onChange={() => handleFilterChange('dateRange', range.id)}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-grow">
            {/* Query information */}
            {query && (
              <div className="mb-4 text-gray-600 dark:text-gray-400">
                {isLoading ? (
                  <div>Searching for "{query}"...</div>
                ) : (
                  <div>
                    {results.length} results for "{query}"
                    {category !== 'all' && ` in ${category}`}
                  </div>
                )}
              </div>
            )}
            
            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {/* No results */}
            {!isLoading && query && results.length === 0 && (
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-8 text-center">
                <SearchIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any matches for "{query}" in {category}.
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Suggestions:
                  <ul className="list-disc list-inside mt-2 text-left max-w-md mx-auto">
                    <li>Check the spelling of your search term</li>
                    <li>Try using different keywords</li>
                    <li>Try searching in a different category</li>
                    <li>Use fewer or more general keywords</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Empty state when no search has been performed */}
            {!isLoading && !query && (
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-8 text-center">
                <SearchIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  Search repositories, code, and users
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter a search term above to find what you're looking for.
                </p>
              </div>
            )}
            
            {/* Results list */}
            {!isLoading && results.length > 0 && (
              <div className="space-y-4">
                {results.map((result) => (
                  <div 
                    key={isRepository(result) ? `repo-${result.id}` : 
                         isFileResult(result) ? `file-${result.id}` : `user-${result.id}`} 
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Repository result */}
                    {isRepository(result) && (
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <GitBranch className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                            <Link 
                              to={`/repository/${result.name}`} 
                              className="text-lg font-medium text-blue-600 hover:underline"
                            >
                              {result.owner}/{result.name}
                            </Link>
                            {!result.isPublic && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full">
                                Private
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {result.stars}
                              </span>
                            </div>
                            {result.language && (
                              <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-1" style={{ 
                                  backgroundColor: {
                                    'TypeScript': '#3178c6',
                                    'JavaScript': '#f7df1e',
                                    'Python': '#3776ab',
                                    'Go': '#00add8',
                                    'Rust': '#dea584',
                                  }[result.language] || '#ccc'
                                }}></span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {result.language}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Updated {new Date(result.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* File result */}
                    {isFileResult(result) && (
                      <div>
                        <div className="flex items-center mb-2">
                          <FileCode className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <Link 
                            to={`/repository/${result.owner}/${result.repository}/blob/main/${result.path}/${result.name}`} 
                            className="text-lg font-medium text-blue-600 hover:underline flex items-center"
                          >
                            {result.owner}/{result.repository}
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {result.path}/{result.name}
                            </span>
                          </Link>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 font-mono text-sm overflow-x-auto">
                          {result.matchingLines.map((line, i) => (
                            <div key={i} className="mb-1 last:mb-0">
                              <span className="text-gray-500 dark:text-gray-400 mr-3 select-none">
                                {line.lineNumber}
                              </span>
                              <span className="text-gray-800 dark:text-gray-200">
                                {line.content}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* User result */}
                    {isUserResult(result) && (
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mr-4">
                          <img 
                            src={result.avatarUrl} 
                            alt={result.username} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/users/${result.username}`} 
                            className="text-lg font-medium text-blue-600 hover:underline block"
                          >
                            {result.fullName}
                          </Link>
                          <div className="text-gray-600 dark:text-gray-400 flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {result.username}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {result.repositories} repositories
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;