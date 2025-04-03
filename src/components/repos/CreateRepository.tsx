import React, { useState } from 'react';
import { 
  Book, 
  Globe, 
  Lock, 
  Info, 
  AlertCircle, 
  FileText,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RepositoryFormData {
  name: string;
  description: string;
  isPublic: boolean;
  readme: boolean;
  gitignore: string;
  license: string;
}

interface ValidationErrors {
  name?: string;
  description?: string;
}

const CreateRepository: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RepositoryFormData>({
    name: '',
    description: '',
    isPublic: true,
    readme: true,
    gitignore: '',
    license: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const gitignoreTemplates = [
    { value: '', label: 'None' },
    { value: 'node', label: 'Node' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'csharp', label: 'C#' }
  ];
  
  const licenseOptions = [
    { value: '', label: 'None' },
    { value: 'mit', label: 'MIT License' },
    { value: 'apache', label: 'Apache License 2.0' },
    { value: 'gpl-3', label: 'GNU GPLv3' },
    { value: 'bsd-2', label: 'BSD 2-Clause' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Repository name is required';
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(formData.name)) {
      newErrors.name = 'Repository name can only contain letters, numbers, hyphens, underscores, and periods';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would make an API call to create the repository
      // For example:
      // await createRepository(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(`Repository "${formData.name}" created successfully!`);
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        navigate(`/repository/${formData.name}`);
      }, 2000);
      
    } catch (error) {
      console.error('Error creating repository:', error);
      setErrors({ 
        name: 'Failed to create repository. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <Book className="mr-2" /> Create a new repository
          </h1>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg flex items-center text-green-800 dark:text-green-200">
              <Check className="mr-2" />
              {successMessage}
            </div>
          )}
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2" htmlFor="name">
                  Repository Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., my-awesome-project"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.name}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose a unique name for your repository. This will be used in your repository's URL.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Optional description of your repository"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.description}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Info className="w-4 h-4 mr-1" /> 
                  <span>{500 - formData.description.length} characters remaining</span>
                </p>
              </div>
              
              <div className="mb-6">
                <span className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                  Visibility
                </span>
                <div className="flex flex-col space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: true })}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <Globe className="mr-2 w-5 h-5 text-green-500" />
                    <div>
                      <span className="text-gray-700 dark:text-gray-200">Public</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Anyone can see this repository. You choose who can commit.
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPublic"
                      checked={!formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: false })}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <Lock className="mr-2 w-5 h-5 text-orange-500" />
                    <div>
                      <span className="text-gray-700 dark:text-gray-200">Private</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        You choose who can see and commit to this repository.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="mb-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Initialize this repository with:</h2>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="readme"
                      checked={formData.readme}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <FileText className="mr-2 w-5 h-5 text-blue-500" />
                    <div>
                      <span className="text-gray-700 dark:text-gray-200">Add a README file</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        This is where you can write an extended description for your project.
                      </p>
                    </div>
                  </label>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2" htmlFor="gitignore">
                    Add .gitignore
                  </label>
                  <select
                    id="gitignore"
                    name="gitignore"
                    value={formData.gitignore}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {gitignoreTemplates.map(template => (
                      <option key={template.value} value={template.value}>
                        {template.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Choose which files not to track from a list of templates.
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2" htmlFor="license">
                    Add a license
                  </label>
                  <select
                    id="license"
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {licenseOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    A license tells others what they can and cannot do with your code.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all 
                            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {isSubmitting ? 'Creating Repository...' : 'Create Repository'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRepository;