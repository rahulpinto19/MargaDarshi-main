import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import OCRPreviewPage from './pages/OCRPreviewPage';
import EvaluationPage from './pages/EvaluationPage';
import ResultsPage from './pages/ResultsPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login Route - No Layout */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/upload" replace /> : <LoginPage />} 
        />
        
        {/* Protected Routes - With Layout */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Layout>
                <UploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ocr-preview"
          element={
            <ProtectedRoute>
              <Layout>
                <OCRPreviewPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/evaluation"
          element={
            <ProtectedRoute>
              <Layout>
                <EvaluationPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Layout>
                <ResultsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

