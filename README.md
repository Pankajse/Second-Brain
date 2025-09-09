# 🧠 Second Brain

<p align="center">
  <strong>Your personal hub for digital knowledge.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

A full-stack productivity app built with the **MERN stack + TypeScript**, designed to help users save and organize YouTube videos, tweets, images, and links in one central place. Second Brain combines a scalable backend, an optimized frontend, and a clean, responsive UI to improve digital knowledge management.

🌐 **Live Website:** **[https://second-brain-five-sigma.vercel.app/](https://second-brain-five-sigma.vercel.app/)**

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Variables](#-environment-variables)
- [Author](#-author)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

-   📂 **Save & Organize**: Effortlessly save and categorize YouTube videos, tweets, images, and links.
-   ⚡ **Optimized Performance**: 30% faster data fetching with TanStack React Query, reducing redundant API calls and improving user experience.
-   🌓 **Dark/Light Mode**: A sleek, user-toggleable theme for enhanced accessibility and personalized viewing.
-   📱 **Fully Responsive UI**: Built with Tailwind CSS for a seamless experience on any device, from mobile phones to desktops.
-   🗄️ **Scalable Backend**: Powered by Node.js, Express.js, and MongoDB to handle high traffic and ensure data integrity.
-   🔐 **Secure Authentication**: Robust user login and registration system using JWT for secure sessions and bcrypt for password hashing.
-   🧩 **Modular Architecture**: Built with TypeScript for enhanced maintainability, scalability, and robust type safety.

---

## 🚀 Tech Stack

Here's a list of the major technologies used to build Second Brain:

| Category         | Technology                                                                          |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Frontend** | React (Vite), TypeScript, TanStack React Query, TailwindCSS, Axios                  |
| **Backend** | Node.js, Express.js                                                                 |
| **Database** | MongoDB                                                                             |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt                                                       |
| **Deployment** | [Vercel](https://vercel.com/)                                                       |

---

## 📂 Project Structure

The repository is organized into two main folders for a clean separation of concerns.
```
Second-Brain/
│
├── Backend/        # Express.js API Server
│   ├── models/
│   ├── util.js
│   └── app.js   # Entry point
│
└── frontend/       # React (Vite) Client Application
└── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│    ├── App.tsx
└── main.tsx  # Entry point
```
---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn)
- A [MongoDB](https://www.mongodb.com/) account to get a connection string.

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Pankajse/Second-Brain.git](https://github.com/Pankajse/Second-Brain.git)
    cd Second-Brain
    ```

2.  **Backend Setup**
    ```bash
    # Navigate to the backend directory
    cd Backend

    # Install dependencies
    npm install

    # Create a .env file (see Environment Variables section below)
    touch .env

    # Start the backend server
    npm run dev
    ```
    The backend will be running on `http://localhost:5000`.

3.  **Frontend Setup**
    ```bash
    # Navigate to the frontend directory from the root
    cd frontend

    # Install dependencies
    npm install

    # Create a .env file (see Environment Variables section below)
    touch .env

    # Start the frontend development server
    npm run dev
    ```
    The frontend will be available on the local port shown in your terminal (e.g., `http://localhost:5173`).

---

## 🔑 Environment Variables

You will need to create a `.env` file in both the `Backend` and `frontend` directories.

#### Backend (`/Backend/.env`)

```.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_secret_key_for_jwt
PORT=5000
```
# Frontend (/frontend/.env)
```.env
VITE_BASE_URL=http://localhost:5000
```
## 👨‍💻 Author
Pankaj Singh

LinkedIn: https://www.linkedin.com/in/pankaj-singh-tech/

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to fork this repository, make your changes, and submit a pull request.

📄 License
This project is licensed under the MIT License.



