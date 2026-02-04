import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Commandes from './pages/Commandes';
import Messages from './pages/Messages';
import Factures from './pages/Factures';
import GenericPage from './pages/GenericPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00a7c8ff',
    },
    secondary: {
      main: '#00a7c8ff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function AppContent() {
  const { user, loading, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        Chargement...
      </Box>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'commandes':
        return <Commandes />;
      case 'messages':
        return <Messages />;
      case 'factures':
        return <Factures />;
      case 'contestations':
        return <GenericPage title="Contestations" />;
      case 'menu-produits':
        return <GenericPage title="Menu & Produits" />;
      case 'rapports':
        return <GenericPage title="Rapports & Statistiques" />;
      case 'personnel':
        return <GenericPage title="Personnel" />;
      case 'stock':
        return <GenericPage title="Stock & Inventaire" />;
      case 'historique':
        return <GenericPage title="Historique" />;
      case 'parametres':
        return <GenericPage title="Paramètres généraux" />;
      case 'confidentialite':
        return <GenericPage title="Confidentialité & service" />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Tableau de bord';
      case 'commandes':
        return 'Tableau de bord';
      case 'messages':
        return 'Tableau de bord';
      case 'factures':
        return 'Tableau de bord';
      default:
        return 'Tableau de bord';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Vue générale';
      case 'commandes':
        return 'Commandes';
      case 'messages':
        return 'Messages';
      case 'factures':
        return 'Factures';
      default:
        return undefined;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} onLogout={signOut} />
      <Box sx={{ flexGrow: 1, backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Topbar title={getPageTitle()} subtitle={getPageSubtitle()} />
        {renderPage()}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
