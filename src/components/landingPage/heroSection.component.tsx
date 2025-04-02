import { Button } from 'flowbite-react'
import { HiOutlineCloudUpload, HiPlus } from 'react-icons/hi'
import { Archive } from 'lucide-react'

// Define the props interface
interface HeroSectionProps {
  onOpenUploadModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenUploadModal }) => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <div className="flex items-center mb-4">
                        <Archive size={40} className="text-blue-600 mr-3" />
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            BitSync
                        </h1>
                    </div>
                    <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Manage and Collaborate on Your Files
                    </h2>
                    <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        Effortlessly create repositories, manage versions, resolve conflicts, and collaborate seamlessly with your team. 
                        BitSync empowers you to take control of your file management workflow.
                    </p>
                    <div className="flex space-x-4">
                        <Button 
                            gradientDuoTone="purpleToBlue" 
                            outline
                            href="/create-repo"
                            className="flex items-center"
                        >
                            <HiPlus className="mr-2 h-5 w-5" />
                            Create Repository
                        </Button>
                        <Button 
                            gradientDuoTone="greenToBlue" 
                            outline
                            onClick={onOpenUploadModal}
                            className="flex items-center"
                        >
                            <HiOutlineCloudUpload className="mr-2 h-5 w-5" />
                            Upload Files
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center items-center">
                    <img 
                        src="/images/file-management-hero.png" 
                        alt="BitSync File Management Dashboard" 
                        className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
                    />
                </div>                
            </div>
        </section>
    )
}

export default HeroSection