# 🍔 Online Food Ordering System

A full-stack food delivery platform built with React and Spring Boot, featuring secure payments, JWT authentication, and role-based access control.


---

## ✨ Features

### 👤 User Panel
- Browse food menus 
- Add/remove items from cart
- Razorpay-integrated checkout and payment
- Track order status in real-time

### 🛠️ Admin Panel
- Add/update restaurants and food items
- View and manage incoming orders

### 🔐 Security
- JWT-based authentication and authorization
- Role-based access (Admin & User)
- Spring Security for endpoint protection

---

## 💻 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- DaisyUI

### Backend
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)

### Tools & Services
- MongoDB (NoSQL Database)
- Razorpay (Payment Gateway)
- Docker (for containerization)

---

## 🚀 Deployment

- **User Portal:** [🔗 https://online-food-delivery-tfk5.vercel.app/login](https://online-food-delivery-tfk5.vercel.app)  
- **Admin Dashboard:** [🔗 https://online-food-delivery-henna-eight.vercel.app/login](https://online-food-delivery-henna-eight.vercel.app)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js ≥ 18.x
- JDK 17+
- MongoDB installed and running locally or on Atlas

### Run the Application

```bash
# Clone the repository
git clone https://github.com/pitabash1999/online-food-delivery.git
cd online-food-delivery

# --- Frontend Setup ---
cd frontend
npm install
npm run dev

# --- Backend Setup ---
cd ../backend
./mvnw spring-boot:run



online-food-delivery/
├── backend/            # Spring Boot App
├── frontend/           # React App with Tailwind + Vite
├── README.md



🤝 Contributions
Contributions are welcome! Please fork the repo and open a pull request for improvements or new features.
