import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Eye,
  Calendar,
  Shield
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  signupDate: string;
  lastLogin: string;
  loginMethod: 'email' | 'google';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    signupDate: '2024-02-20',
    lastLogin: '2 hours ago',
    loginMethod: 'google'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    signupDate: '2024-03-10',
    lastLogin: '1 day ago',
    loginMethod: 'email'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    status: 'inactive',
    signupDate: '2024-01-15',
    lastLogin: '1 week ago',
    loginMethod: 'email'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'user',
    status: 'suspended',
    signupDate: '2024-02-05',
    lastLogin: '2 weeks ago',
    loginMethod: 'google'
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@sangrakshak.com',
    role: 'admin',
    status: 'active',
    signupDate: '2024-01-01',
    lastLogin: '30 minutes ago',
    loginMethod: 'email'
  }
];

export const UserManagementTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'inactive': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' as 'active' | 'suspended' }
        : user
    ));
  };

  return (
    <Card className="bg-black/60 border-cyan-400/30 backdrop-blur-lg">
      <CardHeader className="border-b border-cyan-400/20">
        <CardTitle className="flex items-center space-x-2 text-white">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span>User Management</span>
          <Badge className="ml-auto bg-cyan-500/20 text-cyan-300">
            {filteredUsers.length} users
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white text-sm focus:border-cyan-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white text-sm focus:border-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-gray-700/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700/50 hover:bg-gray-800/30">
                <TableHead className="text-cyan-300 font-semibold">User</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Role</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Status</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Signup Date</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Last Login</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="border-b border-gray-700/30 hover:bg-gray-800/20 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{user.signupDate}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-gray-300 text-sm">{user.lastLogin}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`h-8 w-8 p-0 ${
                          user.status === 'active' 
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' 
                            : 'text-green-400 hover:text-green-300 hover:bg-green-500/10'
                        }`}
                      >
                        {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-500/10"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No users found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};