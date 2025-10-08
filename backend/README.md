# Voting App Backend

This backend provides endpoints for user management, candidate management, elections, and voting.

Available endpoints (high level):

- POST /user/signup
- POST /user/login
- GET  /candidate
- POST /candidate (admin)
- GET  /election
- POST /election (admin)
- POST /election/:id/activate (admin)
- POST /election/:id/end (admin)
- POST /vote (authenticated voter)
- GET  /vote/results/:electionId
- GET  /vote/history/:voterId (authenticated)

Quick start (development):

1. Ensure MongoDB is running and set `MONGODB_URI` in `.env`.
2. Install dependencies:

```powershell
cd backend
npm install
```

3. Run the server (uses port 8080 by default):

```powershell
node server.js
# or (if using nodemon)
npm run dev
```

Frontend (Next.js) should use `NEXT_PUBLIC_API_BASE=http://localhost:8080` during development.

Notes:
- Admin routes require a JWT for an admin user. Use `/user/login` to obtain a token and include it as `Authorization: Bearer <token>` in requests.
- The server currently listens on port 8080 by default. If that port is in use, set `PORT` environment variable before starting.
