import { supabase } from '../lib/supabase';

export async function createSampleActivities(userId: string) {
  const activities = [
    {
      user_id: userId,
      action: 'login',
      observation: 'Nouveau menu ajouté',
      created_at: new Date('2026-01-13T14:38:00').toISOString(),
    },
    {
      user_id: userId,
      action: 'order',
      observation: 'Commande prête',
      created_at: new Date('2026-01-01T07:36:00').toISOString(),
    },
    {
      user_id: userId,
      action: 'update',
      observation: 'Modification profile',
      created_at: new Date('2025-12-31T11:01:00').toISOString(),
    },
    {
      user_id: userId,
      action: 'invoice',
      observation: 'Facture validée',
      created_at: new Date('2025-12-30T08:22:00').toISOString(),
    },
  ];

  for (const activity of activities) {
    await supabase.from('activities').insert(activity);
  }
}

export async function createSampleOrders() {
  const orders = [
    {
      order_number: 'CMD-001',
      customer_name: 'Jean Dupont',
      total_amount: 150000,
      status: 'completed',
      created_at: new Date('2026-01-13T10:00:00').toISOString(),
    },
    {
      order_number: 'CMD-002',
      customer_name: 'Marie Martin',
      total_amount: 200000,
      status: 'pending',
      created_at: new Date('2026-01-13T11:30:00').toISOString(),
    },
    {
      order_number: 'CMD-003',
      customer_name: 'Pierre Bernard',
      total_amount: 175000,
      status: 'completed',
      created_at: new Date('2026-01-13T13:15:00').toISOString(),
    },
  ];

  for (const order of orders) {
    await supabase.from('orders').insert(order);
  }
}

export async function createSampleInvoices() {
  const { data: orders } = await supabase.from('orders').select('id').limit(2);

  if (orders && orders.length > 0) {
    const invoices = [
      {
        invoice_number: 'INV-001',
        order_id: orders[0].id,
        amount: 150000,
        status: 'paid',
        due_date: new Date('2026-01-20').toISOString(),
        created_at: new Date('2026-01-13T10:00:00').toISOString(),
      },
    ];

    if (orders.length > 1) {
      invoices.push({
        invoice_number: 'INV-002',
        order_id: orders[1].id,
        amount: 200000,
        status: 'pending',
        due_date: new Date('2026-01-25').toISOString(),
        created_at: new Date('2026-01-13T11:30:00').toISOString(),
      });
    }

    for (const invoice of invoices) {
      await supabase.from('invoices').insert(invoice);
    }
  }
}
