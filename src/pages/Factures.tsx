import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Plus, Search, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
  orders?: {
    customer_name: string;
  };
}

export default function Factures() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const { data } = await supabase
      .from('invoices')
      .select(`
        *,
        orders (customer_name)
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setInvoices(data as any);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Factures
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          sx={{
            background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
            textTransform: 'none',
          }}
        >
          Nouvelle facture
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <TextField
            placeholder="Rechercher une facture..."
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Numéro</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Montant</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date d'échéance</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.orders?.customer_name || 'N/A'}</TableCell>
                    <TableCell>{invoice.amount.toLocaleString()} Ar</TableCell>
                    <TableCell>
                      <Chip label={invoice.status} color={getStatusColor(invoice.status)} size="small" />
                    </TableCell>
                    <TableCell>{format(new Date(invoice.due_date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Button size="small" startIcon={<Download size={16} />}>
                        Télécharger
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
