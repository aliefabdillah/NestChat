# Nest Chat App
Nest Chat App is a web application that allows users to chatting with other. The application is built using the NestJS framework for the backend and Next.js for the frontend. It implements the Websocket Gateway to handle realtime chatting.

# Technologies Used
- Backend: NestJS
- Frontend: Next.js
- Websocket: Socket.io

# How to Use
1. Clone this repository to your local machine.
2. Install dependencies for both the backend and frontend:
```
# Install backend dependencies
cd nestchat-be
npm install

# Install frontend dependencies
cd nestchat-fe
npm install
```

3. Run the application:
```
# Run the backend (NestJS)
npm run start # or npm run start:dev

# Run the frontend (Next.js)
npm run dev
```
4. Configure project setup by adjusting the `.env.template` to `.env` file in the backend folder:

# Libraries and Tools
- NestJS: A framework for the backend that provides a modular and scalable structure.
- Next.js: A React framework for server-side rendering on the frontend.
- Socket.io: An event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers.
