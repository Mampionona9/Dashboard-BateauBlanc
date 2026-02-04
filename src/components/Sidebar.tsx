import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Badge, Divider } from '@mui/material';
import {
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  FileText,
  AlertCircle,
  Menu as MenuIcon,
  BarChart3,
  Users,
  Package,
  Clock,
  Settings,
  Shield,
  LogOut,
  Anchor,
  LayoutDashboardIcon,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, badge: 0 },
  { id: 'commandes', label: 'Commandes', icon: ShoppingCart, badge: 4 },
  //{ id: 'messages', label: 'Message', icon: MessageSquare, badge: 3 },
  { id: 'factures', label: 'Factures', icon: FileText, badge: 2 },
  { id: 'contestations', label: 'Contestations', icon: AlertCircle, badge: 1 },
];

const secondaryItems = [
  { id: 'menu-produits', label: 'Menu & Produits', icon: MenuIcon },
  { id: 'rapports', label: 'Rapports & Statistiques', icon: BarChart3 },
  { id: 'personnel', label: 'Personnel', icon: Users },
  { id: 'stock', label: 'Stock & Inventaire', icon: Package },
];

const bottomItems = [
  { id: 'historique', label: 'Historique', icon: Clock },
  { id: 'parametres', label: 'Paramètres généraux', icon: Settings },
  { id: 'confidentialite', label: 'Confidentialité & service', icon: Shield },
];

export default function Sidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
        },
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Anchor color="Black" size={24} />
        </Box>
        <Typography variant="h6" fontWeight="bold">
          Bateau Blanc
        </Typography>
      </Box>

      <List sx={{ px: 1.5 }}>
        <Typography variant="caption" sx={{ px: 2, py: 1, color: 'text.secondary', fontWeight: 600 }}>
          Menu
        </Typography>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={currentPage === item.id}
              onClick={() => onPageChange(item.id)}
              sx={{
                borderRadius: 1.5,
                '&.Mui-selected': {
                  backgroundColor: '#00c853',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#00b04a',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
              {item.badge > 0 && (
                <Badge
                  badgeContent={item.badge}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: currentPage === item.id ? 'white' : '#00c853',
                      color: currentPage === item.id ? '#00c853' : 'white',
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List sx={{ px: 1.5 }}>
        {secondaryItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={currentPage === item.id}
              onClick={() => onPageChange(item.id)}
              sx={{
                borderRadius: 1.5,
                '&.Mui-selected': {
                  backgroundColor: '#00c853',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#00b04a',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List sx={{ px: 1.5, pb: 2 }}>
        {bottomItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={currentPage === item.id}
              onClick={() => onPageChange(item.id)}
              sx={{
                borderRadius: 1.5,
                '&.Mui-selected': {
                  backgroundColor: '#00c853',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#00b04a',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={onLogout}
            sx={{
              borderRadius: 1.5,
              '&:hover': {
                backgroundColor: '#ffebee',
                color: '#c62828',
                '& .MuiListItemIcon-root': {
                  color: '#c62828',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" primaryTypographyProps={{ fontSize: 14 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
