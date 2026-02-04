/*
  # Create Initial Dashboard Schema

  ## Overview
  Creates the complete database schema for the Bateau Blanc dashboard application.

  ## New Tables
  
  ### 1. profiles
    - `id` (uuid, primary key, references auth.users)
    - `email` (text)
    - `full_name` (text)
    - `role` (text) - Administrateur, Manager, etc.
    - `matricule` (text) - Employee ID
    - `avatar_url` (text)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ### 2. orders (commandes)
    - `id` (uuid, primary key)
    - `order_number` (text, unique)
    - `customer_name` (text)
    - `total_amount` (numeric)
    - `status` (text) - pending, completed, cancelled
    - `created_at` (timestamptz)
    - `created_by` (uuid, references profiles)

  ### 3. messages
    - `id` (uuid, primary key)
    - `sender_id` (uuid, references profiles)
    - `recipient_id` (uuid, references profiles)
    - `subject` (text)
    - `content` (text)
    - `is_read` (boolean)
    - `created_at` (timestamptz)

  ### 4. invoices (factures)
    - `id` (uuid, primary key)
    - `invoice_number` (text, unique)
    - `order_id` (uuid, references orders)
    - `amount` (numeric)
    - `status` (text) - paid, pending, overdue
    - `due_date` (date)
    - `created_at` (timestamptz)

  ### 5. contestations
    - `id` (uuid, primary key)
    - `order_id` (uuid, references orders)
    - `reason` (text)
    - `status` (text) - open, resolved, rejected
    - `created_at` (timestamptz)
    - `created_by` (uuid, references profiles)

  ### 6. activities
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `action` (text)
    - `observation` (text)
    - `created_at` (timestamptz)

  ### 7. daily_metrics
    - `id` (uuid, primary key)
    - `date` (date, unique)
    - `total_sales` (numeric)
    - `total_orders` (integer)
    - `supply_cost` (numeric)
    - `profit` (numeric)
    - `sales_growth` (numeric)
    - `orders_growth` (numeric)
    - `supply_growth` (numeric)
    - `profit_growth` (numeric)

  ## Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on roles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'Administrateur',
  matricule text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  total_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id)
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id),
  recipient_id uuid REFERENCES profiles(id),
  subject text NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  order_id uuid REFERENCES orders(id),
  amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  due_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create invoices"
  ON invoices FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update invoices"
  ON invoices FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create contestations table
CREATE TABLE IF NOT EXISTS contestations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id)
);

ALTER TABLE contestations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all contestations"
  ON contestations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create contestations"
  ON contestations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update contestations"
  ON contestations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  action text NOT NULL,
  observation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all activities"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create daily_metrics table
CREATE TABLE IF NOT EXISTS daily_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  total_sales numeric DEFAULT 0,
  total_orders integer DEFAULT 0,
  supply_cost numeric DEFAULT 0,
  profit numeric DEFAULT 0,
  sales_growth numeric DEFAULT 0,
  orders_growth numeric DEFAULT 0,
  supply_growth numeric DEFAULT 0,
  profit_growth numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all metrics"
  ON daily_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create metrics"
  ON daily_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update metrics"
  ON daily_metrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);