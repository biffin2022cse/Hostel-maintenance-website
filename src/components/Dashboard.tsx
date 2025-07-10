import React from 'react';
import { 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  LogOut, 
  User,
  Home,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { User as UserType, Submission } from '../types';

interface DashboardProps {
  user: UserType;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  submissions: Submission[];
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout, submissions }) => {
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const inProgressCount = submissions.filter(s => s.status === 'in-progress').length;
  const resolvedCount = submissions.filter(s => s.status === 'resolved').length;

  const quickActions = [
    {
      title: 'Submit Complaint',
      description: 'Report issues in your room or common areas',
      icon: AlertCircle,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      action: () => onNavigate('complaint')
    },
    {
      title: 'Ask a Question',
      description: 'Get help with hostel policies and procedures',
      icon: HelpCircle,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      action: () => onNavigate('query')
    },
    {
      title: 'Request Cleaning',
      description: 'Schedule cleaning service for your room',
      icon: Sparkles,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      action: () => onNavigate('cleaning')
    },
    {
      title: 'View Submissions',
      description: 'Track your complaints, queries, and requests',
      icon: FileText,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      action: () => onNavigate('submissions')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Hostel Portal</h1>
                <p className="text-sm text-gray-500">Campus Housing Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Room {user.roomNumber}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Manage your hostel experience from your dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-800">{submissions.length}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
              <p className="text-gray-600">Student details and contact information</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Student ID</p>
              <p className="text-gray-900">{user.studentId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Room Number</p>
              <p className="text-gray-900">{user.roomNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};