import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Eye, CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import FloatingIcons from '../components/FloatingIcons';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Eye,
      title: 'Smart OCR',
      description: 'Advanced text extraction from handwritten and printed answer sheets using Tesseract.js',
      color: 'blue',
      bgColor: 'blue-50',
    },
    {
      icon: Sparkles,
      title: 'Gemini AI Powered',
      description: 'Intelligent evaluation using Google\'s Gemini AI with detailed feedback and scoring',
      color: 'blue',
      bgColor: 'blue-50',
    },
    {
      icon: CheckCircle,
      title: 'Custom Rubrics',
      description: 'Create flexible evaluation criteria tailored to your specific assessment needs',
      color: 'blue',
      bgColor: 'blue-50',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Quick OCR and evaluation results in seconds, not hours',
      color: 'blue',
      bgColor: 'blue-50',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is processed securely with no permanent storage',
      color: 'blue',
      bgColor: 'blue-50',
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate paper correction and reduce evaluation time by 80%',
      color: 'blue',
      bgColor: 'blue-50',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingIcons />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Logo */}
          <div className="inline-block p-6 bg-blue-600 rounded-3xl mb-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            <FileText className="h-20 w-20 text-white relative z-10" />
          </div>

          {/* Title */}
          <h1 className="text-7xl font-bold text-blue-700 mb-4 tracking-tight leading-tight pb-2">
            MargaDarshi
          </h1>
          <p className="text-2xl font-semibold text-blue-700 mb-6">
            AI-Powered Paper Correction System
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform your evaluation process with intelligent OCR and Gemini AI. 
            Automatically extract text from answer sheets and get detailed AI-powered evaluations in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-5 bg-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg hover:bg-blue-700"
            >
              Get Started
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border-2 border-blue-400 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Everything you need for efficient and accurate paper correction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden bg-blue-50 border-2 border-gray-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className="relative">
                  <div className={`inline-block p-4 bg-blue-600 rounded-xl mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 text-blue-700`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Simple 4-step process to evaluate answer sheets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="inline-block p-6 bg-blue-600 rounded-2xl mb-4 shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-2">
              Step 1
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload</h3>
            <p className="text-sm text-gray-600">Upload answer sheet images or PDFs</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="inline-block p-6 bg-blue-600 rounded-2xl mb-4 shadow-xl">
              <Eye className="w-12 h-12 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-2">
              Step 2
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">OCR</h3>
            <p className="text-sm text-gray-600">Automatic text extraction with preview</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="inline-block p-6 bg-blue-600 rounded-2xl mb-4 shadow-xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-2">
              Step 3
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Evaluate</h3>
            <p className="text-sm text-gray-600">Configure rubric and run AI evaluation</p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="inline-block p-6 bg-blue-600 rounded-2xl mb-4 shadow-xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-2">
              Step 4
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Results</h3>
            <p className="text-sm text-gray-600">View detailed scores and feedback</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="glass-effect rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join educators who are saving time and improving evaluation accuracy with MargaDarshi
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-12 py-5 bg-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xl hover:bg-blue-700"
          >
            Start Evaluating Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-white/30 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-2 bg-blue-600 rounded-lg mr-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-700">
                MargaDarshi
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              AI-Powered Paper Correction System
            </p>
            <p className="text-xs font-semibold text-blue-600">
              Powered by Gemini AI • Tesseract OCR
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

