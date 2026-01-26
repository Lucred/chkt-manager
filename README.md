# Checkout Manager

A full-stack e-commerce application built with **React**, **Node.js**, **Express**, **Prisma**, and **SQLite**.

## 🚀 Tech Stack

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **ORM**: Prisma
-   **Database**: SQLite (Local file-based DB)

### Frontend
-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS
-   **Language**: TypeScript
-   **HTTP Client**: Axios

## ✨ Features

### 👤 User Features
-   **Role Switching**: Simulated login as **User** or **Admin**.
-   **Shop View**: Browse available products.
    -   **View Toggle**: Switch between **Grid** (Card) and **List** views.
-   **Shopping Cart**: Add items, remove items, and view cart summary.
-   **Checkout**: Seamless checkout process that converts carts to orders.
-   **Order History**: View past completed orders.

### 🛡️ Admin Features
-   **Dashboard**: Overview of system activity.
-   **Order Management**: View all user completed checkouts.
-   **Active Carts**: Monitor active user shopping carts.
-   **Product Management**:
    -   Create new products.
    -   **Creator Filter**: Admins see a specific list of products *they* created.

## 🛠️ Installation & Setup

### Prerequisites
-   Node.js (v18+ recommended)
-   npm

### Configuration

**Backend Environment**:
Create a `.env` file in the `backend/` directory (copy from `.env.example`):
```bash
cp backend/.env.example backend/.env
```
Ensure it contains:
```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

**Frontend Environment**:
Create a `.env` file in the `frontend/` directory (copy from `.env.example`):
```bash
cp frontend/.env.example frontend/.env
```
Ensure it contains:
```env
VITE_API_URL=http://localhost:3000/api
```

### 1. Backend Setup

Navigate to the backend directory, install dependencies, and set up the database.

```bash
cd backend
npm install
```

**Database Setup**:
Run migrations to create the SQLite database tables and seed initial data.

```bash
# Run migrations
npx prisma migrate dev

# Seed the database (Default Users: Alice, Admin; Default Products)
npx prisma db seed
```

**Start the Server**:
The backend runs on `http://localhost:3000`.

```bash
npm start
```

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend will typically run on `http://localhost:5173`.

## 📖 Usage Guide

1.  **Open the App**: Go to `http://localhost:5173`.
2.  **Login**:
    -   Click **"Login as User"** to shop, manage cart, and checkout.
    -   Click **"Login as Admin"** to view dashboard and manage products.
3.  **User Flow**:
    -   Add products to cart.
    -   Go to "Cart" tab to review.
    -   Click "Checkout" to complete purchase.
    -   Check "My Orders" for history.
4.  **Admin Flow**:
    -   See "Completed Checkouts" and "Active Carts".
    -   Go to "Manage Products" to add new items (e.g., "Coffee", $5.00).
    -   Verify your created products appear in the "My Created Products" section.

## 📂 Project Structure

```
checkout-manager/
├── backend/                # Express + Prisma Server
│   ├── prisma/             # Database Schema & Seeds
│   ├── src/
│   │   ├── controllers/    # Request Handlers
│   │   ├── routes/         # API Routes
│   │   ├── services/       # Business Logic
│   │   └── index.ts        # Entry Point
│   └── ...
├── frontend/               # Vite + React Client
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # View Pages (UserView, AdminView)
│   │   ├── services/       # API Integration
│   │   └── App.tsx         # Main Component
│   └── ...
└── README.md               # Project Documentation
```
