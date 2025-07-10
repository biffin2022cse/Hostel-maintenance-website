export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  roomNumber: string;
  phone: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface Submission {
  id: string;
  type: 'complaint' | 'query' | 'cleaning';
  title: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  preferredDate?: string;
  preferredTime?: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved';
  studentId: string;
  roomNumber: string;
}