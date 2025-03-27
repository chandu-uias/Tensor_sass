@echo off
setlocal

:: Create root project directories
mkdir client
mkdir public
mkdir server

:: -------------------------------
:: Setup Client (Frontend)
:: -------------------------------
mkdir client\src\assets
mkdir client\src\components
mkdir client\src\context
mkdir client\src\pages
mkdir client\src\services

:: Create component files
type nul > client\src\components\Navbar.js
type nul > client\src\components\Footer.js
type nul > client\src\components\PlanCard.js
type nul > client\src\components\CheckoutForm.js
type nul > client\src\components\ProtectedRoute.js
type nul > client\src\components\UserTable.js

:: Create context files
type nul > client\src\context\AuthContext.js
type nul > client\src\context\PlanContext.js

:: Create service API files
type nul > client\src\services\authService.js
type nul > client\src\services\planService.js
type nul > client\src\services\paymentService.js

:: Create main pages
type nul > client\src\pages\Home.js
type nul > client\src\pages\Login.js
type nul > client\src\pages\Register.js
type nul > client\src\pages\Plans.js
type nul > client\src\pages\Checkout.js
type nul > client\src\pages\Dashboard.js
type nul > client\src\pages\AdminDashboard.js
type nul > client\src\pages\SuperAdminDashboard.js
type nul > client\src\pages\OrderHistory.js

:: Create main app files
type nul > client\src\App.js
type nul > client\src\index.js

:: Create config & env files
type nul > client\tailwind.config.js
type nul > client\package.json
type nul > client\.env


:: -------------------------------
:: Setup Server (Backend)
:: -------------------------------
mkdir server\src\config
mkdir server\src\controllers
mkdir server\src\models
mkdir server\src\middleware
mkdir server\src\routes
mkdir server\src\utils

:: Create config files
type nul > server\src\config\db.js
type nul > server\src\config\stripe.js

:: Create controller files
type nul > server\src\controllers\authController.js
type nul > server\src\controllers\planController.js
type nul > server\src\controllers\paymentController.js
type nul > server\src\controllers\userController.js

:: Create model files
type nul > server\src\models\User.js
type nul > server\src\models\Plan.js
type nul > server\src\models\Payment.js

:: Create middleware files
type nul > server\src\middleware\authMiddleware.js
type nul > server\src\middleware\roleMiddleware.js

:: Create route files
type nul > server\src\routes\authRoutes.js
type nul > server\src\routes\planRoutes.js
type nul > server\src\routes\paymentRoutes.js
type nul > server\src\routes\userRoutes.js

:: Create utility files
type nul > server\src\utils\jwtUtils.js

:: Create main server files
type nul > server\src\app.js
type nul > server\src\server.js

:: Create config & env files
type nul > server\.env
type nul > server\package.json
type nul > server\README.md

echo ✅ Project structure created successfully!
endlocal
