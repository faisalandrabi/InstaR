import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { UsersView } from './components/UsersView';
import { RolesView } from './components/RolesView';
import { UserModal } from './components/UserModal';
import { RoleModal } from './components/RoleModal';
import { ToastContainer } from './components/ToastContainer';
import { api } from './services/api';
import { createSignalRConnection } from './services/signalr';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [apiConnected, setApiConnected] = useState(false);
  const [signalRStatus, setSignalRStatus] = useState('connecting');
  const [activityLogs, setActivityLogs] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addLog = (text) => {
    const time = new Date().toLocaleTimeString();
    setActivityLogs((prev) => [{ text, time }, ...prev.slice(0, 19)]);
  };

  // Load Data
  const fetchData = async () => {
    try {
      const [fetchedRoles, fetchedUsers] = await Promise.all([
        api.getRoles(),
        api.getUsers()
      ]);
      setRoles(fetchedRoles);
      setUsers(fetchedUsers);
      setApiConnected(true);
    } catch (err) {
      console.error('Data fetch error:', err);
      setApiConnected(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Initialize SignalR connection
    const hubConnection = createSignalRConnection();

    hubConnection
      .start()
      .then(() => {
        setSignalRStatus('connected');
        addLog('Connected to SignalR Hub (/notificationHub)');
      })
      .catch((err) => {
        console.error('SignalR Connection Error:', err);
        setSignalRStatus('disconnected');
      });

    hubConnection.on('ReceiveRoleUpdate', (updatedRole) => {
      addLog(`[SignalR Broadcast] Role updated: ${updatedRole.name || updatedRole.Name}`);
      addToast(`Real-Time Update: Role "${updatedRole.name || updatedRole.Name}" was modified!`, 'info');
      fetchData(); // Refresh data dynamically
    });

    hubConnection.on('ReceiveUserUpdate', (updatedUser) => {
      addLog(`[SignalR Broadcast] User updated: ${updatedUser.username || updatedUser.Username}`);
      addToast(`Real-Time Update: User "${updatedUser.username || updatedUser.Username}" was modified!`, 'info');
      fetchData(); // Refresh data dynamically
    });

    return () => {
      hubConnection.stop();
    };
  }, []);

  // Handlers for Roles
  const handleSaveRole = async (roleData) => {
    try {
      if (selectedRole) {
        await api.updateRole(selectedRole.id, roleData);
        addToast(`Role "${roleData.name}" updated successfully`);
        addLog(`Updated Role #${selectedRole.id} (${roleData.name})`);
      } else {
        const created = await api.createRole(roleData);
        addToast(`Role "${created.name}" created successfully`);
        addLog(`Created new Role #${created.id} (${created.name})`);
      }
      fetchData();
    } catch (err) {
      addToast(err.message || 'Error saving role', 'error');
    }
  };

  const handleDeleteRole = async (id) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    try {
      await api.deleteRole(id);
      addToast('Role deleted successfully');
      addLog(`Deleted Role #${id}`);
      fetchData();
    } catch (err) {
      addToast('Failed to delete role', 'error');
    }
  };

  // Handlers for Users
  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        await api.updateUser(selectedUser.id, userData);
        addToast(`User "${userData.username}" updated successfully`);
        addLog(`Updated User #${selectedUser.id} (${userData.username})`);
      } else {
        const created = await api.createUser(userData);
        addToast(`User "${created.username}" created successfully`);
        addLog(`Created new User #${created.id} (${created.username})`);
      }
      fetchData();
    } catch (err) {
      addToast(err.message || 'Error saving user', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(id);
      addToast('User deleted successfully');
      addLog(`Deleted User #${id}`);
      fetchData();
    } catch (err) {
      addToast('Failed to delete user', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar signalRStatus={signalRStatus} apiConnected={apiConnected} />

      <div className="main-layout">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userCount={users.length}
          roleCount={roles.length}
        />

        <main className="content-container">
          {activeTab === 'dashboard' && (
            <DashboardView
              userCount={users.length}
              roleCount={roles.length}
              signalRStatus={signalRStatus}
              apiConnected={apiConnected}
              activityLogs={activityLogs}
              setActiveTab={setActiveTab}
              onAddUser={() => {
                setSelectedUser(null);
                setIsUserModalOpen(true);
              }}
              onAddRole={() => {
                setSelectedRole(null);
                setIsRoleModalOpen(true);
              }}
            />
          )}

          {activeTab === 'users' && (
            <UsersView
              users={users}
              roles={roles}
              onAddUser={() => {
                setSelectedUser(null);
                setIsUserModalOpen(true);
              }}
              onEditUser={(user) => {
                setSelectedUser(user);
                setIsUserModalOpen(true);
              }}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === 'roles' && (
            <RolesView
              roles={roles}
              users={users}
              onAddRole={() => {
                setSelectedRole(null);
                setIsRoleModalOpen(true);
              }}
              onEditRole={(role) => {
                setSelectedRole(role);
                setIsRoleModalOpen(true);
              }}
              onDeleteRole={handleDeleteRole}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
        roles={roles}
      />

      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSave={handleSaveRole}
        role={selectedRole}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
