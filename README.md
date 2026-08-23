# Codemark — Backend

AI-powered code review API. Built with Node.js, Express, and MongoDB. Accepts submitted code, sends it to Google Gemini for analysis, and returns a quality score with a severity-ranked list of issues and suggested fixes.

## Tech Stack

- **Runtime:** Node.js, Express
- **Database:** MongoDB Atlas (via Mongoose)
- **Auth:** JWT + bcrypt
- **AI:** Google Gemini API
- **Testing:** Jest
- **Rate Limiting:** express-rate-limit

## Features

- User authentication (signup/login) with hashed passwords and JWT tokens
- Protected routes via custom auth middleware
- AI-powered code review with structured JSON output (score, severity-tagged issues, suggested fixes)
- Hash-based caching — identical code resubmissions skip the AI call and return the cached result
- Pagination and sorting on the reviews list
- Ownership checks — users can only view/delete their own reviews
- Rate limiting (strict on auth routes, general on the rest of the API)
- Centralized error handling with environment-aware error detail
- Unit tests with mocked database and AI calls

## Project Structure

config/ → MongoDB connection
controllers/ → Request handling and business logic
middleware/ → Auth, logging, rate limiting
models/ → Mongoose schemas (User, Review)
routes/ → Route definitions
services/ → Gemini API integration
utils/ → Shared helpers (error handler)
tests/ → Jest unit tests


## Setup

```bash
npm install
```

Create a `.env` file in the root:

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development


Run in development:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create a new account |
| POST | `/api/auth/login` | Log in, returns a JWT |
| GET | `/api/auth/profile` | Protected — returns the logged-in user's ID |

### Reviews (all protected — require `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reviews` | Submit code for AI review |
| GET | `/api/reviews?page=1&limit=10` | List the current user's reviews, paginated |
| GET | `/api/reviews/:id` | Get one review by ID |
| DELETE | `/api/reviews/:id` | Delete a review |

## Deployment

Deployed on Render. Environment variables are configured directly in the Render dashboard rather than committed to the repo.