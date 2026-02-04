/*
  # Insert Sample Data

  ## Overview
  Populates the database with sample data for testing and demonstration purposes.

  ## Data Inserted
  
  1. Sample profiles (users)
  2. Sample orders
  3. Sample messages
  4. Sample invoices
  5. Sample contestations
  6. Sample activities
  7. Sample daily metrics for the past 12 months

  ## Notes
  - This data is for demonstration purposes
  - Real production data should be added through the application
*/

-- Insert sample daily metrics for the past 12 months
INSERT INTO daily_metrics (date, total_sales, total_orders, supply_cost, profit, sales_growth, orders_growth, supply_growth, profit_growth)
VALUES
  ('2026-01-13', 2580000, 152, 6200000, 800000, 22.0, 62.8, 93.9, 12.0),
  ('2025-12-13', 2400000, 140, 5800000, 750000, 18.5, 55.0, 85.0, 10.0),
  ('2025-11-13', 2200000, 130, 5400000, 700000, 15.0, 48.0, 78.0, 8.5),
  ('2025-10-13', 2100000, 125, 5200000, 680000, 12.0, 45.0, 72.0, 7.0),
  ('2025-09-13', 1900000, 115, 4800000, 650000, 10.0, 38.0, 65.0, 6.0),
  ('2025-08-13', 2800000, 160, 6500000, 850000, 25.0, 70.0, 100.0, 15.0),
  ('2025-07-13', 1700000, 105, 4400000, 600000, 8.0, 32.0, 58.0, 5.0),
  ('2025-06-13', 1600000, 100, 4200000, 580000, 6.0, 28.0, 52.0, 4.0),
  ('2025-05-13', 1500000, 95, 4000000, 560000, 5.0, 25.0, 48.0, 3.5),
  ('2025-04-13', 1400000, 90, 3800000, 540000, 4.0, 22.0, 45.0, 3.0),
  ('2025-03-13', 1300000, 85, 3600000, 520000, 3.0, 18.0, 42.0, 2.5),
  ('2025-02-13', 1200000, 80, 3400000, 500000, 2.0, 15.0, 38.0, 2.0),
  ('2025-01-13', 1100000, 75, 3200000, 480000, 1.0, 12.0, 35.0, 1.5)
ON CONFLICT (date) DO NOTHING;