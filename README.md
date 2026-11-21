# Peerly – Inclusive Student Peer-Assistance & Skill Exchange Platform



**Originally developed as TimeBank | National Hackathon, Graphic Era University | November 2025**



Peerly is an inclusive, student-driven peer-assistance and skill exchange platform designed to make academic collaboration more accessible, supportive, and rewarding.



Originally introduced as **TimeBank**, the project was developed with a special focus on supporting students with disabilities who may need additional academic assistance. Its vision extends to the entire student community, allowing every student to request help, share knowledge, exchange skills, and support one another.



The platform follows a credit-based reward model where students earn PeerPoints by helping others and can use their points to access rewards.



**Our vision: A campus where every student can ask for help, offer help, and grow together.**



---



## Why Peerly?



Students have different abilities, strengths, learning styles, and academic challenges. Sometimes, a student needs help understanding a subject, completing an academic task, accessing learning resources, or developing a particular skill.



Peerly creates a collaborative environment where students can support each other without making financial ability a barrier to receiving help.



It is designed to:



- Support students with disabilities through peer-to-peer academic assistance.

- Make collaborative learning accessible to the wider student community.

- Encourage students to share their knowledge, time, and skills.

- Build a culture of mutual support and student participation.

- Recognize contributions through a credit-based reward system.



## Key Features



### 1. Secure Authentication & User Management

- Student registration and login.

- JWT-based authentication.

- Password hashing using bcryptjs.

- Protected routes and authenticated user access.



### 2. Peer Assistance & Request Management

- Create requests for academic or skill-related assistance.

- Explore requests posted by other students.

- Accept tasks and manage assigned work.

- Track personal requests and accepted tasks.

- View individual request details and progress.



### 3. Collaborative Workspace

- Dedicated workspace for accepted tasks.

- Real-time communication between students.

- Document and image sharing.

- Collaborative task coordination.



### 4. Real-Time Messaging & Notifications

- Instant messaging using Socket.IO.

- Real-time notification updates.

- Activity and request-related notifications.

- Live connection status.



### 5. PeerPoints – Credit-Based Reward System

- Earn points by helping other students.

- Maintain a record of point transactions.

- Encourage active participation and knowledge sharing.

- Reward students for their contributions.



### 6. Rewards & Student Engagement

- Rewards interface.

- PeerPoints-based engagement.

- Leaderboard interface to encourage participation.



### 7. Inclusive Student Community

- Designed with a focus on students who need additional academic assistance.

- Open to all students, regardless of their skill level or learning background.

- Encourages peer learning, cooperation, and equal participation.



---



## How Peerly Works



1\. **Sign Up:** Students create their accounts and join the community.

2\. **Request Help:** A student posts an academic or skill-related request.

3\. **Connect:** Another student accepts the request and offers assistance.

4\. **Collaborate:** Both students coordinate through the workspace, messaging, and file sharing.

5\. **Complete Tasks:** The requested assistance is completed.

6\. **Earn PeerPoints:** Contributions are recognized through the platform's credit-based reward system.

7\. **Grow Together:** Students can use their experience and skills to help more members of the community.



---




## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| Vite | Development server and production build |
| Tailwind CSS v4 | Responsive UI styling |
| Framer Motion | UI animations and transitions |
| React Router DOM | Client-side navigation and routing |
| Lucide React | Interface icons |
| Socket.IO Client | Real-time communication |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Server-side JavaScript runtime |
| Express.js | REST API and backend routing |
| MongoDB | NoSQL database |
| Mongoose | Database models and operations |
| JWT | Authentication and authorization |
| bcryptjs | Secure password hashing |
| Multer | File upload handling |
| Socket.IO | Real-time messaging and notifications |

### Development Tools

- Git and GitHub
- npm
- Visual Studio Code
- MongoDB Atlas

---

## System Architecture

Peerly follows a client-server architecture.

- **Frontend:** React-based application that provides the user interface and interacts with backend APIs.
- **Backend:** Node.js and Express.js handle authentication, requests, messages, notifications, and transactions.
- **Database:** MongoDB stores user accounts, requests, messages, notifications, and transaction records.
- **Real-Time Layer:** Socket.IO supports live communication and notification events.
- **File Handling:** Multer manages uploaded documents and images.

---

## Project Structure

```text
Peerly/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── socket.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/GeetikaChaudhary09/Peerly.git
cd Peerly
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory using `.env.example` as a reference.

Configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend development server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local development URL provided by Vite, usually:

```text
http://localhost:5173
```

---

## Environment Variables

| Variable | Description |
|---|---|
| PORT | Port on which the backend server runs |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key used for JWT authentication |

**Security Note:** Never upload your actual `.env` file, database credentials, or secret keys to GitHub.





---



## Hackathon Background



**Original Project Name:** TimeBank Platform

**Event:** National Hackathon, Graphic Era University

**Date:** November 2025

**Project Focus:** Peer assistance for students with disabilities through a credit-reward system for academic support.



The original hackathon project focused on enabling students to exchange academic assistance through a peer-support model. The project facilitated 150+ academic exchanges.



The project was subsequently expanded and rebranded as **Peerly**, retaining its original inclusive vision while developing a broader student skill-exchange and collaboration experience.



---



## Future Scope



- Enhanced accessibility features and assistive technology support.

- AI-assisted matching between students seeking help and students offering relevant skills.

- Voice-based interaction and improved communication accessibility.

- More personalized student profiles and skill recommendations.

- Expanded reward and recognition mechanisms.

- Cloud deployment and production scalability.



---



## Project Vision



Peerly is built around one simple belief:



**Every student has something to learn, and every student has something to teach.**



By combining peer assistance, skill exchange, accessibility, and a reward-based participation model, Peerly aims to create a more inclusive and collaborative academic community.



**Peerly – Learn Together. Help Together. Grow Together.**
