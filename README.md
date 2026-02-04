# Bateau Blanc - Dashboard Application - by KBillion

A modern, full-featured dashboard application built with React, Material-UI, and Supabase.

## Features

- **Authentication System**: Secure login and registration with Supabase Auth
- **Dashboard**: Real-time metrics with beautiful charts and visualizations
- **Orders Management**: Create and track orders
- **Messages**: Internal messaging system
- **Invoices**: Invoice management with status tracking
- **Activity Tracking**: Recent activities log
- **Multiple Pages**: All menu items are functional and navigate to their respective pages

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI)
- **Charts**: Recharts
- **Backend**: Supabase (Database + Auth)
- **Build Tool**: Vite
- **Styling**: Emotion (MUI's styling solution)

## Getting Started

### 1. Sign Up

When you first access the application, you'll see a login screen. Click on the "Inscription" tab to create a new account:

- Fill in your full name
- Enter an employee ID (matricule)
- Provide your email
- Create a password

### 2. Sign In

After registration, switch to the "Connexion" tab and log in with your credentials.

### 3. Explore the Dashboard

Once logged in, you'll have access to:

- **Dashboard**: View sales metrics, charts, and recent activities
- **Commandes**: Manage orders
- **Messages**: Send and receive internal messages
- **Factures**: Track invoices
- **And more**: All sidebar menu items are functional

## Navigation

The application features a comprehensive sidebar with the following sections:

### Main Menu
- Tableau de bord (Dashboard)
- Commandes (Orders)
- Message (Messages)
- Factures (Invoices)
- Contestations (Disputes)

### Secondary Menu
- Menu & Produits (Menu & Products)
- Rapports & Statistiques (Reports & Statistics)
- Personnel (Staff)
- Stock & Inventaire (Stock & Inventory)

### Settings
- Historique (History)
- Paramètres généraux (General Settings)
- Confidentialité & service (Privacy & Service)
- Déconnexion (Logout)

## Database Schema

The application uses the following Supabase tables:

- **profiles**: User profiles with roles and employee information
- **orders**: Order management
- **messages**: Internal messaging system
- **invoices**: Invoice tracking
- **contestations**: Dispute management
- **activities**: Activity logging
- **daily_metrics**: Dashboard metrics and analytics

All tables have Row Level Security (RLS) enabled for data protection.

## Development

The application is built with best practices:

- TypeScript for type safety
- Material-UI components for consistent design
- Supabase for secure backend operations
- Responsive design that works on all devices

## Security

- All database tables have Row Level Security enabled
- Authentication is handled by Supabase Auth
- User passwords are securely hashed
- API keys are managed through environment variables
