import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'Password#2026',
  name: 'Foundation Administrator',
  role: 'Super Admin'
};

const STORAGE_KEYS = {
  SESSION: 'pmf_admin_session',
  CREDENTIALS: 'pmf_admin_credentials'
};

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved credentials or initialize defaults
  const getStoredCredentials = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.password === 'admin123') {
          parsed.password = 'Password#2026';
          localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed reading credentials from storage:', e);
    }
    return DEFAULT_ADMIN;
  };

  // Check active session on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed && parsed.username) {
          setAdminUser(parsed);
        }
      }
    } catch (e) {
      console.error('Failed reading session from storage:', e);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password, rememberMe = true) => {
    // Small artificial delay for realistic UX feedback
    await new Promise(res => setTimeout(res, 350));

    const creds = getStoredCredentials();
    const cleanUsername = username.trim().toLowerCase();
    const cleanExpected = creds.username.trim().toLowerCase();

    if (cleanUsername === cleanExpected && password === creds.password) {
      const sessionData = {
        username: creds.username,
        name: creds.name || 'Foundation Administrator',
        role: creds.role || 'Super Admin',
        loggedInAt: new Date().toISOString()
      };

      setAdminUser(sessionData);

      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
      } else {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
      }

      return { success: true };
    } else {
      return { 
        success: false, 
        message: 'Invalid username or password' 
      };
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  };

  const updateCredentials = ({ username, password, name }) => {
    const current = getStoredCredentials();
    const updated = {
      ...current,
      username: username?.trim() || current.username,
      password: password || current.password,
      name: name?.trim() || current.name
    };

    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(updated));

    if (adminUser) {
      const updatedUser = {
        ...adminUser,
        username: updated.username,
        name: updated.name
      };
      setAdminUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updatedUser));
    }

    return { success: true, message: 'Admin profile updated successfully.' };
  };

  const value = {
    adminUser,
    isAuthenticated: !!adminUser,
    isLoading,
    login,
    logout,
    updateCredentials,
    defaultCredentials: DEFAULT_ADMIN
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
