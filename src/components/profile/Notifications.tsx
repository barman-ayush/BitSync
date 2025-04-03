import React, { useState, useEffect } from 'react';
import { Bell, Mail, Globe, Settings, Save, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  email: boolean;
  push: boolean;
  site: boolean;
}

interface NotificationType {
  id: string;
  category: string;
  settings: NotificationSetting[];
}

export const Notifications: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockNotificationTypes: NotificationType[] = [
        {
          id: '1',
          category: 'Repository',
          settings: [
            {
              id: '101',
              type: 'New commit',
              description: 'When someone pushes a commit to your repository',
              email: true,
              push: true,
              site: true
            },
            {
              id: '102',
              type: 'Pull request',
              description: 'When someone opens, comments on, or updates a pull request',
              email: true,
              push: false,
              site: true
            },
            {
              id: '103',
              type: 'Issues',
              description: 'When an issue is opened, commented on, or resolved',
              email: false,
              push: true,
              site: true
            }
          ]
        },
        {
          id: '2',
          category: 'Account',
          settings: [
            {
              id: '201',
              type: 'Security alerts',
              description: 'Important notices about your account security',
              email: true,
              push: true,
              site: true
            },
            {
              id: '202',
              type: 'Account changes',
              description: 'When your account details are updated',
              email: true,
              push: false,
              site: true
            }
          ]
        },
        {
          id: '3',
          category: 'Social',
          settings: [
            {
              id: '301',
              type: 'New follower',
              description: 'When someone follows your account',
              email: false,
              push: true,
              site: true
            },
            {
              id: '302',
              type: 'Stars',
              description: 'When someone stars your repository',
              email: false,
              push: false,
              site: true
            },
            {
              id: '303',
              type: 'Mentions',
              description: 'When you are mentioned in a comment or issue',
              email: true,
              push: true,
              site: true
            }
          ]
        }
      ];

      setNotificationTypes(mockNotificationTypes);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleToggle = (categoryId: string, settingId: string, channel: 'email' | 'push' | 'site', value: boolean) => {
    setNotificationTypes(prevTypes => {
      return prevTypes.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            settings: category.settings.map(setting => {
              if (setting.id === settingId) {
                return {
                  ...setting,
                  [channel]: value
                };
              }
              return setting;
            })
          };
        }
        return category;
      });
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call to save notification settings
    setTimeout(() => {
      // Here you would typically make an API request to save the settings
      console.log('Saving notification settings:', notificationTypes);
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(null);
      }, 3000);
    }, 1500);
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
      <div className="mb-6">
        <Link to="/profile" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Profile
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <Bell className="text-blue-500 mr-3" size={24} />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notification Settings</h1>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure how and when you receive notifications. You can choose to receive notifications via email, push notifications, or on the site.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-2">
              <Mail className="text-blue-500 mr-2" size={16} />
              <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications to your registered email address
            </p>
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-2">
              <Bell className="text-blue-500 mr-2" size={16} />
              <h3 className="font-semibold text-gray-800 dark:text-white">Push</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive push notifications on your devices
            </p>
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-2">
              <Globe className="text-blue-500 mr-2" size={16} />
              <h3 className="font-semibold text-gray-800 dark:text-white">Site</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              See notifications in the application
            </p>
          </div>
        </div>

        {notificationTypes.map(category => (
          <div key={category.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
              {category.category} Notifications
            </h2>
            
            <div className="space-y-4">
              {category.settings.map(setting => (
                <div key={setting.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">{setting.type}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={setting.email}
                          onChange={e => handleToggle(category.id, setting.id, 'email', e.target.checked)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={setting.push}
                          onChange={e => handleToggle(category.id, setting.id, 'push', e.target.checked)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Push</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={setting.site}
                          onChange={e => handleToggle(category.id, setting.id, 'site', e.target.checked)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Site</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          {saveSuccess === true && (
            <div className="mr-4 text-green-600 dark:text-green-400 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Settings saved successfully!
            </div>
          )}
          
          <button 
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition-colors mr-3"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="inline mr-1" size={16} />
            Reset
          </button>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2" size={16} />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Settings className="text-blue-500 mr-2" size={20} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Advanced Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Digest Emails</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive a single daily or weekly email instead of individual notifications</p>
              </div>
              <select 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="none">None</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Do Not Disturb</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily pause all notifications</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Notification Sound</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Play a sound when you receive a notification</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;