# TensorGo SaaS Plan with Stripe Integration

## 🚀 About the Project
This is a **SaaS Plan Management System** built for **TensorGo Technologies**, enabling users to browse, purchase, and manage SaaS plans using **Stripe payment gateway**. The platform allows Super Admins to manage plans, Organizations (Admins) to create and manage users, and Users to access the services based on their subscribed plan.

---

## 🔥 Features
### **Frontend (React + Tailwind CSS)**
- **Browse SaaS Plans**: View available subscription plans with details.
- **Cart Management**: Add, remove, and manage plans before checkout.
- **User Authentication**: Secure login and registration.
- **Checkout Process**: Seamless checkout and payment integration with Stripe.
- **Super Admin Dashboard**: Manage plans and monitor organizations.
- **Admin Dashboard**: Create and manage users according to the plan limitations.
- **User Dashboard**: Access plan details after login.

### **Backend (Node.js + Express + MongoDB)**
- **SaaS Plan Management**: Create, edit, delete plans (Super Admin access only).
- **User Management**:
  - Super Admin: Manages plans.
  - Admin: Manages users under their organization.
  - Users: Access the purchased plan.
- **Stripe Integration**:
  - Secure payment processing.
  - Handle webhooks to confirm successful transactions.
- **Role-Based Access Control (RBAC)** for better security and feature control.

---

## 📁 Project Structure
```
Tensor_SaaS/
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── assets/     # Images, Icons, Styles
│   │   ├── components/ # Reusable UI Components
│   │   ├── context/    # Context API for state management
│   │   ├── pages/      # Pages (Home, Plans, Checkout, Dashboard, etc.)
│   │   ├── services/   # API calls (Auth, Plan, Payment Services)
│   │   ├── App.js      # Main App Component
│   │   ├── index.js    # Entry Point
│   ├── package.json    # Frontend Dependencies
│   ├── tailwind.config.js # Tailwind CSS Configuration
│
├── server/             # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/     # Database & Stripe Configurations
│   │   ├── controllers/ # Business Logic
│   │   ├── models/     # MongoDB Schemas
│   │   ├── middleware/ # Authentication & Error Handling
│   │   ├── routes/     # API Routes
│   │   ├── utils/      # Utility Functions
│   │   ├── app.js      # Express App Setup
│   │   ├── server.js   # Server Entry Point
│   ├── package.json    # Backend Dependencies
│   ├── .env.example    # Environment Variables Example
│
├── README.md           # Project Documentation
├── .gitignore          # Ignore unnecessary files
```

---

## 💻 Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/chandu-uias/Tensor_sass.git
cd Tensor_sass
```

### **2️⃣ Backend Setup**
```bash
cd server
npm install  # Install dependencies
cp .env.example .env  # Create .env file and configure environment variables
npm start  # Start the backend server
```

### **3️⃣ Frontend Setup**
```bash
cd client
npm install  # Install dependencies
npm start  # Run the frontend
```

### **4️⃣ Setup Stripe for Payment Processing**
1. Sign up at [Stripe](https://stripe.com/)
2. Get your **Publishable Key** and **Secret Key**
3. Add them to `.env` file in the **server**
   ```env
   STRIPE_SECRET_KEY=your_secret_key
   STRIPE_PUBLISHABLE_KEY=your_publishable_key
   ```

---

## 🔥 API Endpoints
### **Authentication**
| Method | Endpoint       | Description            |
|--------|--------------|------------------------|
| POST   | `/api/auth/register` | User Registration |
| POST   | `/api/auth/login` | User Login |

### **Plans Management**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/plans` | Get all plans |
| POST | `/api/plans` | Create a new plan (Super Admin) |
| PUT | `/api/plans/:id` | Update a plan (Super Admin) |
| DELETE | `/api/plans/:id` | Delete a plan (Super Admin) |

### **Stripe Integration**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/checkout` | Create a Stripe session |
| POST | `/api/webhook` | Handle Stripe webhooks |

---

## ⚡ Tech Stack
### **Frontend:**
- React
- Tailwind CSS
- React Router
- Context API

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Stripe API
- JWT Authentication



## 🔥 Demo & Testing
- Use **Stripe Test Cards** to simulate payments.
- Example Test Card: `4242 4242 4242 4242` (Expiry: Any future date, CVV: Any 3 digits)

---


