import React, { useState, useEffect } from 'react';

const UserTable = () => {
  
  return (
    <div className="user-table-container">
      <h1>User Table</h1>
        <table className="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
  );
};

export default UserTable;
