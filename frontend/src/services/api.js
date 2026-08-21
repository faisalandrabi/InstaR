const API_BASE_URL = 'http://localhost:5027/api';

export const api = {
  // Roles
  getRoles: async () => {
    const res = await fetch(`${API_BASE_URL}/roles`);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return res.json();
  },

  getRole: async (id) => {
    const res = await fetch(`${API_BASE_URL}/roles/${id}`);
    if (!res.ok) throw new Error('Failed to fetch role');
    return res.json();
  },

  createRole: async (roleData) => {
    const res = await fetch(`${API_BASE_URL}/roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Failed to create role');
    }
    return res.json();
  },

  updateRole: async (id, roleData) => {
    const res = await fetch(`${API_BASE_URL}/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Failed to update role');
    }
    return true;
  },

  deleteRole: async (id) => {
    const res = await fetch(`${API_BASE_URL}/roles/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete role');
    return true;
  },

  // Users
  getUsers: async () => {
    const res = await fetch(`${API_BASE_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  getUser: async (id) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  createUser: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Failed to create user');
    }
    return res.json();
  },

  updateUser: async (id, userData) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || 'Failed to update user');
    }
    return true;
  },

  deleteUser: async (id) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return true;
  }
};
