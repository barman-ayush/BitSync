import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Shield, Key, Smartphone, Save, ArrowLeft, AlertTriangle } from 'lucide-react';

const AccountSecurity: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSessions, setShowSessions] = useState<boolean>(false);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // You could add a success message here
    }, 1000);
  };
  
  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };
  
  // Mock active sessions data
  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.1',
      lastActive: '2025-04-02T15:30:00Z',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iOS',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.2',
      lastActive: '2025-04-01T10:15:00Z',
      current: false
    }
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/profile" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Profile
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-6">
            <Shield size={24} className="text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Account Security</h1>
          </div>
          
          {/* Password Change Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Lock size={18} className="mr-2" />
              Change Password
            </h2>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters and include a number and special character
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-blue-400"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Two-Factor Authentication Section */}
          <div className="py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Key size={18} className="text-blue-600 mr-2" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="mr-3 text-sm text-gray-600 dark:text-gray-400">
                  {is2FAEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    is2FAEnabled ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={is2FAEnabled}
                  onClick={handleToggle2FA}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            {is2FAEnabled && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Smartphone size={18} className="text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Two-factor authentication is enabled
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                      <p>Your account is protected with an authenticator app.</p>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Reconfigure 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Active Sessions Section */}
          <div>
            <button 
              onClick={() => setShowSessions(!showSessions)}
              className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-800 dark:text-white mb-4"
            >
              <div className="flex items-center">
                <Shield size={18} className="text-blue-600 mr-2" />
                <span>Active Sessions</span>
              </div>
              <span className="text-gray-400">
                {showSessions ? '−' : '+'}
              </span>
            </button>
            
            {showSessions && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                  {activeSessions.map((session) => (
                    <li key={session.id} className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white flex items-center">
                            {session.device}
                            {session.current && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Current
                              </span>
                            )}
                          </p>
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                              {session.location} • IP: {session.ipAddress}
                            </p>
                            <p>Last active: {formatDate(session.lastActive)}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-t border-orange-100 dark:border-orange-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle size={18} className="text-orange-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        If you notice any suspicious activity, immediately change your password and contact support.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right">
                  <button
                    type="button"
                    className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Revoke All Other Sessions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;