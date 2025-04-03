import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, HelpCircle, CheckCircle } from 'lucide-react';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Support: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [formData, setFormData] = useState<ContactFormData>({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is BitSync?",
      answer: "BitSync is a platform that helps you manage and synchronize your repositories across different devices and environments."
    },
    {
      question: "How do I create a new repository?",
      answer: "To create a new repository, navigate to the Repositories page and click on the 'Create New Repository' button. Fill in the required information and click 'Create'."
    },
    {
      question: "How can I share my repository with teammates?",
      answer: "After creating a repository, go to its settings page. Under the 'Collaborators' section, you can add team members by their email address or username."
    },
    {
      question: "Is there a limit to how many repositories I can create?",
      answer: "Free accounts can create up to 5 repositories. Premium accounts have unlimited repositories. Check your account settings for your current plan details."
    },
    {
      question: "How do I sync changes between my devices?",
      answer: "BitSync automatically syncs changes when you commit them. Make sure you're signed in with the same account on all your devices to ensure seamless synchronization."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
          email: user?.primaryEmailAddress?.emailAddress || '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Support Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Get help with BitSync or contact our support team</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg flex overflow-hidden">
            <button 
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'faq' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              <HelpCircle size={18} />
              FAQs
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'contact' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              <MessageSquare size={18} />
              Contact Us
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transform ${expandedFAQ === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:gap-8 mb-8">
                <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Mail className="mt-1 text-blue-600" size={18} />
                      <div>
                        <p className="font-medium">Email</p>
                        <p>support@bitsync.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Phone className="mt-1 text-blue-600" size={18} />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p>+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Support Hours</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>Monday - Friday: 9am - 6pm EST</p>
                    <p>Saturday: 10am - 4pm EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <SignedIn>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Send us a message</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        required 
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 text-center flex items-center justify-center gap-2 w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                      <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  </div>
                )}
              </SignedIn>

              <SignedOut>
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 dark:text-blue-300 text-center">
                    Please <a href="/" className="font-medium underline">sign in</a> to contact our support team.
                  </p>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;