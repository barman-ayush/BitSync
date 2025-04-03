import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, MapPin, Save, ArrowLeft } from 'lucide-react';

interface UserProfileData {
  id: string;
  name: string;
  username: string;
  email: string;
  location: string;
  bio: string;
  avatarUrl: string;
}

export const PersonalInformation: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfileData | null>(null);

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockProfile: UserProfileData = {
        id: '1',
        name: 'Alex Johnson',
        username: 'alexjohnson',
        email: 'alex@example.com',
        location: 'San Francisco, CA',
        bio: 'Software engineer passionate about web development and open source projects.',
        avatarUrl: '/api/placeholder/150/150'
      };

      setProfile(mockProfile);
      setFormData(mockProfile);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API save
    setTimeout(() => {
      setProfile(formData);
      setIsSaving(false);
      // You could add a success message here
    }, 1000);
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
      <div className="max-w-3xl mx-auto">
        <Link to="/profile" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Profile
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Personal Information</h1>
          
          {formData && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div>
                  <img 
                    src={formData.avatarUrl} 
                    alt={formData.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                  <button 
                    type="button" 
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Change photo
                  </button>
                </div>
                
                <div className="flex-1 w-full">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <div className="flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                        @
                      </span>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
                        disabled
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Username cannot be changed.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <User size={16} className="inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Mail size={16} className="inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <MapPin size={16} className="inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Brief description for your profile.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Link 
                    to="/profile" 
                    className="mr-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-blue-400"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;