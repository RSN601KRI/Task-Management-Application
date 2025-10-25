# 🧩 TaskFlow — Task Management App with Mocked API

A **frontend-only Task Management Application** built using **React**, **TypeScript**, and **Tailwind CSS**.  
This project simulates a real-world task management workflow with **mocked authentication** and **CRUD operations**, using **Mock Service Worker (MSW)** for API simulation.  

Deployed Live 👉 [**TaskFlow Live App**](https://your-deployment-url.vercel.app)

## 📋 Table of Contents
- [🎯 Objective](#-objective)
- [⚙️ Features](#️-features)
- [🧠 Project Architecture](#-project-architecture)
- [🧩 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🧪 Mock API Endpoints](#-mock-api-endpoints)
- [💾 State Management](#-state-management)
- [🎨 UI and Styling](#-ui-and-styling)
- [🔐 Authentication Flow](#-authentication-flow)
- [💡 Bonus Enhancements](#-bonus-enhancements)
- [📘 Documentation](#-documentation)
- [📄 License](#-license)

## 🎯 Objective

The goal of **TaskFlow** is to simulate a full-stack task management application **entirely on the frontend**, using **mock APIs** for:
- User authentication
- Task creation, reading, updating, and deletion

The app mimics real-world backend interactions without any actual server — perfect for rapid prototyping, testing, and UI/UX demonstrations.

## ⚙️ Features

✅ **Authentication Flow**
- Mock login using static credentials (`username: test`, `password: test123`)
- Fake JWT token generation and session persistence

✅ **Task Dashboard**
- View all tasks
- Create, edit, and delete tasks
- Filter and update task statuses

✅ **Mock Backend**
- Simulated REST API endpoints via **Mock Service Worker (MSW)**
- Persists data using `localStorage`

✅ **UI/UX Enhancements**
- Responsive, minimal, and mobile-friendly design
- Empty and error states for better UX
- Logout & route protection

## 🧠 Project Architecture

```

React (Vite)
│
├── Mock Layer (MSW)
│   ├── Auth Mock → POST /login (returns fake JWT)
│   ├── Task Mock → CRUD endpoints for tasks
│
├── State Management
│   ├── Auth Slice (Redux Toolkit)
│   ├── Task Slice (Redux Toolkit)
│
├── Components & Pages
│   ├── Login Page
│   ├── Dashboard (Tasks)
│   ├── TaskForm (Create/Edit)
│   ├── ProtectedRoute
│
└── Storage
├── localStorage (JWT, tasks persistence)

```

## 🧩 Tech Stack

| Area | Technology |
|------|-------------|
| **Frontend Framework** | React (Vite) |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit / Zustand / Context API |
| **Styling** | Tailwind CSS / Ant Design |
| **Mock API** | Mock Service Worker (MSW) |
| **HTTP Client** | Axios |
| **Deployment** | Vercel / Netlify |

## 📂 Project Structure

```

TaskFlow/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── TaskForm.tsx
│   ├── mocks/
│   │   ├── handlers.ts
│   │   └── browser.ts
│   ├── store/
│   │   ├── authSlice.ts
│   │   └── taskSlice.ts
│   ├── types/
│   │   └── index.ts
│   ├── lib/
│   │   └── axiosInstance.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── README.md
└── tsconfig.json

````

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the Mock Service Worker

```bash
npm run prepare
```

*(This will initialize MSW before running the app.)*

### 4️⃣ Start the development server

```bash
npm run dev
```

### 5️⃣ Open in browser

Visit 👉 `http://localhost:5173`

## 🧪 Mock API Endpoints

| Method   | Endpoint     | Description                                  |
| -------- | ------------ | -------------------------------------------- |
| `POST`   | `/login`     | Simulates login and returns a fake JWT token |
| `GET`    | `/tasks`     | Fetches list of tasks                        |
| `POST`   | `/tasks`     | Adds a new task                              |
| `PUT`    | `/tasks/:id` | Updates an existing task                     |
| `DELETE` | `/tasks/:id` | Deletes a specific task                      |

### 🧰 Example:

```json
POST /login
{
  "username": "test",
  "password": "test123"
}
→
{
  "token": "fake-jwt-token",
  "user": { "id": 1, "name": "Test User" }
}
```

## 💾 State Management

* **Auth State**: Stores `user` and `token` in Redux/Context.
* **Task State**: Stores all task objects (`id`, `title`, `description`, `status`).
* **Persistence**: `localStorage` ensures tasks and auth state persist across reloads.

## 🎨 UI and Styling

* **Tailwind CSS** for responsive and utility-first design
* **Ant Design** components for form and modal elements
* **Mobile-first** layout with flexible grid structure

## 🔐 Authentication Flow

1. User logs in via `/login` with mocked credentials.
2. A fake JWT is stored in `localStorage`.
3. Dashboard and task routes are **protected** via `<ProtectedRoute />`.
4. Logout clears all auth data and redirects to login.

## 💡 Bonus Enhancements (Optional)

✨ **Dark Mode Toggle** (Tailwind dark variant)
🧾 **Formik + Yup** for form validation
🧠 **Unit Tests** using Jest + React Testing Library
🚀 **Deployed on Vercel** with live preview
🐳 **Docker Support** (optional containerization)

## 📘 Documentation

### 🧩 How the Mocking Works

The app uses **Mock Service Worker (MSW)** to intercept network requests made via Axios.
Instead of calling a real backend, MSW intercepts and returns predefined mock responses defined in `/src/mocks/handlers.ts`.

MSW runs as a **Service Worker**, simulating realistic REST API calls (including network delays).

## 📄 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute with attribution.

**Built with ❤️ using React + TypeScript + MSW + Tailwind CSS**
