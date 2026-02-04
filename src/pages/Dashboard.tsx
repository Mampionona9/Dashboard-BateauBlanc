import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import { TrendingUp, Copy, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase, DailyMetric, Activity } from '../lib/supabase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MetricCardProps {
  title: string;
  value: string;
  growth: number;
  color: string;
}

function MetricCard({ title, value, growth, color }: MetricCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Copy size={16} />
          </IconButton>
        </Box>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            backgroundColor: color,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          <TrendingUp size={14} color="white" />
          <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
            {growth > 0 ? '+' : ''}
            {growth}% taux généré
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DailyMetric | null>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [periodTab, setPeriodTab] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: metricsData } = await supabase
      .from('daily_metrics')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (metricsData) {
      setMetrics(metricsData);
    }

    const { data: monthlyMetrics } = await supabase
      .from('daily_metrics')
      .select('*')
      .order('date', { ascending: true })
      .limit(12);

    if (monthlyMetrics) {
      const chartData = monthlyMetrics.map((m) => ({
        month: format(new Date(m.date), 'MMM', { locale: fr }),
        value: m.profit,
      }));
      setMonthlyData(chartData);
    }

    const { data: activitiesData } = await supabase
      .from('activities')
      .select(`
        *,
        profiles (*)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (activitiesData) {
      setActivities(activitiesData as any);
    }
  };

  const pieData = [
    { name: 'Vente', value: 27.2, color: '#2196F3' },
    { name: 'Approvisionnement', value: 42, color: '#4CAF50' },
    { name: 'Contestation', value: 14.1, color: '#F44336' },
    { name: 'Satisfaction', value: 77, color: '#9E9E9E' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Rapport journalière
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(), "EEEE, d MMM yyyy", { locale: fr })}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total des ventes"
            value={`${(metrics?.total_sales || 0).toLocaleString()} Ariary`}
            growth={metrics?.sales_growth || 0}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total des commandes"
            value={(metrics?.total_orders || 0).toString()}
            growth={metrics?.orders_growth || 0}
            color="#00c853"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Approvisionnement"
            value={`${(metrics?.supply_cost || 0).toLocaleString()} Ariary`}
            growth={metrics?.supply_growth || 0}
            color="#00e676"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Bénéfice"
            value={`${(metrics?.profit || 0).toLocaleString()} Ariary`}
            growth={metrics?.profit_growth || 0}
            color="#00c853"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Bénéfice Mensuelle
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {(metrics?.profit || 0).toLocaleString()} Ar
                </Typography>
              </Box>
              <Tabs value={periodTab} onChange={(_, v) => setPeriodTab(v)} sx={{ mb: 2 }}>
                <Tab label="Hebdomadaire" sx={{ minHeight: 36, py: 1 }} />
                <Tab label="Mensuel" sx={{ minHeight: 36, py: 1 }} />
                <Tab label="Annuel" sx={{ minHeight: 36, py: 1 }} />
              </Tabs>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#9e9e9e" />
                  <YAxis stroke="#9e9e9e" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4CAF50" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Performance opérationnelle
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {pieData.map((item) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                    <Typography variant="caption">{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Activités récentes
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Recherche"
                size="small"
                sx={{
                  width: 250,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton>
                <Filter size={20} />
              </IconButton>
            </Box>
          </Box>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#000' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Nom & prénom</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Poste</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Matricule</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Heure</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Observation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <TableRow key={activity.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#00c853' }}>
                            {activity.profiles?.full_name?.charAt(0) || 'U'}
                          </Avatar>
                          <Typography variant="body2">{activity.profiles?.full_name || 'Unknown'}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{activity.profiles?.role || 'N/A'}</TableCell>
                      <TableCell>{activity.profiles?.matricule || 'N/A'}</TableCell>
                      <TableCell>{format(new Date(activity.created_at), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{format(new Date(activity.created_at), 'HH:mm')}</TableCell>
                      <TableCell>{activity.observation}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body2" color="text.secondary">
                        Aucune activité récente
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
