import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Filter, AlertCircle, HelpCircle, Sparkles } from 'lucide-react';
import { Submission } from '../types';

interface ViewSubmissionsProps {
  submissions: Submission[];
  onBack: () => void;
}

export const ViewSubmissions: React.FC<ViewSubmissionsProps> = ({ submissions, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'complaint' | 'query' | 'cleaning'>('all');

  const filteredSubmissions = submissions.filter(submission => {
    const statusMatch = filter === 'all' || submission.status === filter;
    const typeMatch = typeFilter === 'all' || submission.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'in-progress':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'complaint':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'query':
        return <HelpCircle className="w-5 h-5 text-blue-500" />;
      case 'cleaning':
        return <Sparkles className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'complaint':
        return 'bg-red-100 text-red-800';
      case 'query':
        return 'bg-blue-100 text-blue-800';
      case 'cleaning':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Submissions</h1>
          <p className="text-gray-600">Track all your complaints, queries, and cleaning requests</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="complaint">Complaints</option>
                <option value="query">Queries</option>
                <option value="cleaning">Cleaning Requests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600">
                {submissions.length === 0 
                  ? "You haven't submitted any complaints, queries, or cleaning requests yet."
                  : "No submissions match your current filters. Try adjusting the filter criteria."
                }
              </p>
            </div>
          ) : (
            filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(submission.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
                      <p className="text-sm text-gray-600">
                        Submitted on {formatDate(submission.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(submission.type)}`}>
                      {submission.type.charAt(0).toUpperCase() + submission.type.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">{submission.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {submission.category && (
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <span className="ml-2 text-gray-900">{submission.category}</span>
                    </div>
                  )}
                  {submission.priority && (
                    <div>
                      <span className="text-gray-600">Priority:</span>
                      <span className={`ml-2 font-medium ${
                        submission.priority === 'high' ? 'text-red-600' :
                        submission.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)}
                      </span>
                    </div>
                  )}
                  {submission.preferredDate && (
                    <div>
                      <span className="text-gray-600">Preferred Date:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(submission.preferredDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(submission.status)}
                    <span className="text-sm text-gray-600">
                      {submission.status === 'pending' && 'Waiting for review'}
                      {submission.status === 'in-progress' && 'Being processed'}
                      {submission.status === 'resolved' && 'Completed'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {submission.id}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};