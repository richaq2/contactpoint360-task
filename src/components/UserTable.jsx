import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../fetchUsers';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = users.filter(user => 
      user.id.toString().includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const aValue = key === 'id' ? a[key] : a[key].toLowerCase();
      const bValue = key === 'id' ? b[key] : b[key].toLowerCase();

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <i class="fa fa-arrows-v" aria-hidden="true"></i>;
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-table-container">
      <h1>User Dashboard</h1>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th 
              onClick={() => handleSort('id')}
              className="sortable"
            >
              ID {getSortIcon('id')}
            </th>
            <th 
              onClick={() => handleSort('name')}
              className="sortable"
            >
              NAME {getSortIcon('name')}
            </th>
            <th>ADDRESS</th>
            <th>COMPANY NAME</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                {user.address.city}, {user.address.zipcode}
              </td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && searchTerm && (
        <div className="no-results">No users found matching your search.</div>
      )}
    </div>
  );
};

export default UserTable;
