# # BrieflyAI

BrieflyAI is a real-time team collaboration and communication web
application where users can create projects, manage channels, and
communicate with other team members in one place.

The main goal of the project is to make project communication simpler by
keeping project-related conversations organized inside separate
channels.

## Features

-   User registration and login
-   JWT-based authentication
-   Create and manage projects
-   Add members to projects
-   Create and manage project channels
-   Real-time messaging
-   View messages for a selected channel
-   User profiles with name, email, and avatar
-   Protected routes and API access
-   Backend API using Node.js and Express
-   MongoDB database integration
-   Socket.IO for real-time communication
-   React-based frontend
-   Axios for API requests
-   Zustand for frontend state management
-   AI integration can be added using Ollama

## Tech Stack

### Frontend

-   React.js
-   Vite
-   JavaScript
-   Axios
-   Zustand
-   Socket.IO Client
-   Tailwind CSS

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Socket.IO
-   JWT
-   bcrypt

### Development Tools

-   Git
-   GitHub
-   Postman
-   VS Code

## Project Structure

``` text
ChatVibe/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## How It Works

A user first creates an account and logs in. After authentication, the
user can create or join a project.

Each project can contain multiple channels. Channels are used to
separate conversations based on different topics or tasks.

For example:

``` text
Project
│
├── General
├── Development
├── Design
└── Announcements
```

When a user selects a channel, the frontend requests the channel
messages from the backend. New messages can be delivered in real time
using Socket.IO.

## Installation

### 1. Clone the repository

``` bash
git clone https://github.com/souvik283/Cummunication_Summary
```

### 2. Install frontend dependencies

``` bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

``` bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file inside the `server` folder.

Example:

``` env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Add any other environment variables required by your implementation,
such as Cloudinary, Ollama, or other external services.

Do not upload your `.env` file to GitHub.

## Running the Project

### Start the backend

Inside the `backend` folder:

``` bash
npm run dev
```

### Start the frontend

Inside the `frontend` folder:

``` bash
npm run dev
```

The Vite development server will normally run at:

``` text
http://localhost:5173
```

The backend will normally run at:

``` text
http://localhost:3000
```

## API Overview

The backend follows a REST API structure.

Typical modules include:

### Authentication

``` text
POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/logout
```

### Projects

``` text
POST /api/project/create
GET  /api/project/get
```

### Channels

``` text
GET  /api/channel/get/:projectName
POST /api/channel/create
```

### Messages

``` text
GET  /api/message/:channelId
POST /api/message/send
```

The exact routes may differ depending on the current implementation.

## Authentication

The application uses JWT for authentication.

After login, the authenticated user can access protected resources such
as projects, channels, and messages.

Socket connections also use authentication middleware so that only
authenticated users can establish a real-time connection.

## Real-Time Messaging

Socket.IO is used to handle real-time communication.

The basic flow is:

``` text
User sends message
       ↓
React Frontend
       ↓
Node.js / Express Server
       ↓
Socket.IO
       ↓
Other connected users
       ↓
Message appears in real time
```

This avoids requiring users to refresh the page every time a new message
is sent.

## State Management

Zustand is used to manage application state on the frontend.

Separate stores can be used for different parts of the application, such
as:

-   Authentication
-   Projects
-   Channels
-   Messages

For example, the channel store handles loading and storing the current
user's channels.

## AI Integration

The project can also use Ollama for local AI functionality.

A possible architecture is:

``` text
React
  ↓
Node.js API
  ↓
Ollama
  ↓
Local AI Model
  ↓
Node.js API
  ↓
React
```

This can be used for features such as message summarization, project
assistance, or other AI-based productivity features.

## Security

The project follows common web application security practices,
including:

-   Password hashing using bcrypt
-   JWT authentication
-   Protected backend routes
-   Authentication middleware
-   Environment variables for secrets
-   CORS configuration
-   Validation of authenticated users for protected resources

Never commit passwords, JWT secrets, database credentials, or API keys
to the repository.

## Future Improvements

Some features that can be added in the future:

-   Direct messaging between users
-   File and image sharing
-   Message reactions
-   Message editing and deletion
-   Typing indicators
-   Online/offline user status
-   Push notifications
-   Voice and video calls
-   Better AI-powered message summaries
-   AI project assistant
-   Search across messages and channels
-   Role-based project permissions
-   Improved mobile responsiveness

## Deployment

The frontend can be deployed using services such as Netlify or Vercel.

The backend can be deployed using services such as Render or Railway.

For production deployment, make sure to:

1.  Add production environment variables.
2.  Set the correct frontend URL in the backend CORS configuration.
3.  Use a production MongoDB database.
4.  Configure the production Socket.IO URL.
5.  Never expose private secrets in frontend code.

## Common Issues

### CORS Error

If the frontend cannot communicate with the backend, check the backend
CORS configuration and make sure the frontend URL matches the value of
`CLIENT_URL`.

### Socket Disconnects

For Socket.IO connection problems, check:

-   Backend URL
-   Frontend Socket.IO URL
-   CORS settings
-   Authentication cookie/JWT
-   Production proxy configuration

### MongoDB Connection Error

Check that:

-   `MONGO_URI` is correct.
-   MongoDB is running or the cloud database is available.
-   Your IP is allowed if using MongoDB Atlas.

## Contributing

If you want to contribute:

``` bash
git clone https://github.com/your-username/chatvibe.git
cd chatvibe
git checkout -b feature/your-feature
```

Make your changes, test them, and create a pull request.

## License

This project is currently for learning and development purposes.

## Author

**Souvik Ghosh**

Full Stack Web Developer\
React.js \| Node.js \| Express.js \| MongoDB \| C++ \| DSA
