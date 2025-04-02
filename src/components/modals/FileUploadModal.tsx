import { useState, useRef } from 'react';
import { X, Upload, Folder } from 'lucide-react';

// Define interfaces for our data
interface Repository {
  id: number;
  name: string;
  description: string;
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample repository data - in a real app, you would fetch this from your API
const SAMPLE_REPOSITORIES: Repository[] = [
  { id: 1, name: 'project-alpha', description: 'Main project repository' },
  { id: 2, name: 'docs', description: 'Documentation files' },
  { id: 3, name: 'frontend-code', description: 'UI components and assets' }
];

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose }) => {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStep, setUploadStep] = useState<number>(1); // 1: Select repo, 2: Upload files
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRepoSelect = (repo: Repository) => {
    setSelectedRepo(repo);
    setUploadStep(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    // In a real application, you would implement the actual file upload logic here
    console.log('Uploading files to repository:', selectedRepo?.name);
    console.log('Files:', selectedFiles);
    
    // Mock successful upload
    setTimeout(() => {
      onClose();
      // You could show a success notification here
    }, 1500);
  };

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 w-full max-w-md">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <Upload className="mr-2" /> Upload Files
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Modal body */}
        <div className="p-6">
          {uploadStep === 1 ? (
            <>
              <p className="mb-4 text-gray-600 dark:text-gray-300">Select a repository to upload files to:</p>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {SAMPLE_REPOSITORIES.map(repo => (
                  <div 
                    key={repo.id}
                    onClick={() => handleRepoSelect(repo)}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Folder className="mr-2 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{repo.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{repo.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Uploading to repository: <span className="font-semibold">{selectedRepo?.name}</span>
                </p>
              </div>
              
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={36} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, GIF, or PDF (MAX. 10MB)
                </p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium mb-2">{selectedFiles.length} file(s) selected:</p>
                  <ul className="text-sm max-h-20 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300">
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Modal footer */}
        <div className="flex justify-end p-4 border-t dark:border-gray-700">
          {uploadStep === 1 ? (
            <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
          ) : (
            <>
              <button 
                onClick={() => setUploadStep(1)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2"
              >
                Back
              </button>
              <button 
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${
                  selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                Upload
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploadModal;