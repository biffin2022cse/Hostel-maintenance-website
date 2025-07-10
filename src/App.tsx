import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ComplaintForm } from './components/ComplaintForm';
import { QueryForm } from './components/QueryForm';
import { CleaningRequestForm } from './components/CleaningRequestForm';
import { ViewSubmissions } from './components/ViewSubmissions';
import { User, Admin, Submission } from './types';

type Page = 'home' | 'login' | 'admin-login' | 'register' | 'dashboard' | 'admin-dashboard' | 'complaint' | 'query' | 'cleaning' | 'submissions';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const handleUserLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleAdminLogin = (adminData: Admin) => {
    setAdmin(adminData);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    setCurrentPage('home');
  };

  const handleNavigateToLogin = (userType: 'user' | 'admin') => {
    if (userType === 'user') {
      setCurrentPage('login');
    } else {
      setCurrentPage('admin-login');
    }
  };

  const handleSubmission = (submission: Omit<Submission, 'id' | 'timestamp' | 'status'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setSubmissions(prev => [...prev, newSubmission]);
    setCurrentPage('dashboard');
  };

  const handleUpdateSubmissionStatus = (id: string, status: 'pending' | 'in-progress' | 'resolved') => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission.id === id ? { ...submission, status } : submission
      )
    );
  };

  // Home page
  if (currentPage === 'home') {
    return <HomePage onNavigateToLogin={handleNavigateToLogin} />;
  }

  // Authentication pages
  if (!user && !admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {currentPage === 'login' && (
          <LoginPage 
            onLogin={handleUserLogin} 
            onSwitchToRegister={() => setCurrentPage('register')} 
          />
        )}
        {currentPage === 'admin-login' && (
          <AdminLoginPage 
            onLogin={handleAdminLogin} 
            onBack={() => setCurrentPage('home')} 
          />
        )}
        {currentPage === 'register' && (
          <RegisterPage 
            onRegister={handleUserLogin} 
            onSwitchToLogin={() => setCurrentPage('login')} 
          />
        )}
      </div>
    );
  }

  // Admin dashboard
  if (admin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminDashboard 
          admin={admin} 
          submissions={submissions}
          onLogout={handleLogout}
          onUpdateSubmissionStatus={handleUpdateSubmissionStatus}
        />
      </div>
    );
  }

  // User dashboard and forms
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {currentPage === 'dashboard' && (
          <Dashboard 
            user={user} 
            onNavigate={setCurrentPage} 
            onLogout={handleLogout}
            submissions={submissions}
          />
        )}
        {currentPage === 'complaint' && (
          <ComplaintForm 
            user={user} 
            onSubmit={handleSubmission} 
            onBack={() => setCurrentPage('dashboard')} 
          />
        )}
        {currentPage === 'query' && (
          <QueryForm 
            user={user} 
            onSubmit={handleSubmission} 
            onBack={() => setCurrentPage('dashboard')} 
          />
        )}
        {currentPage === 'cleaning' && (
          <CleaningRequestForm 
            user={user} 
            onSubmit={handleSubmission} 
            onBack={() => setCurrentPage('dashboard')} 
          />
        )}
        {currentPage === 'submissions' && (
          <ViewSubmissions 
            submissions={submissions} 
            onBack={() => setCurrentPage('dashboard')} 
          />
        )}
      </div>
    );
  }

  return null;
}

export default App;