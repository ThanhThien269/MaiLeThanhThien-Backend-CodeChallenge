# Leaderboard API

## Overview

This API module is responsible for managing the leaderboard in a web application. It allows users to update their scores and retrieve the top 10 users with the highest scores. Security measures are implemented to prevent unauthorized score updates.

## Features

- Retrieve the top 10 users' scores.
- Update a user's score upon completing an action.
- Prevent unauthorized users from tampering with scores.
- Support real-time updates using WebSocket.

## API Endpoints

### 1. Get Leaderboard

**Endpoint:** `GET /leaderboard`

**Description:**
returns 10 usernames which is currently at the top of the leaderboard.

**Response:**

```json
{
  "leaderboard": [
    { "userId": "12345", "username": "Pikachu", "score": 20000 },
    { "userId": "456876", "username": "Dragon", "score": 18000 }
  ]
}
```

### 2. Get User Score

**Endpoint:** `GET /score/:userId`

**Description:**
returns the corresponding score for a given userId

**Response:**

```json
{
  "userId": "12345",
  "username": "Pikachu",
  "score": 20000
}
```

### 3. Update Score

**Endpoint:** `POST /score/update`

**Description:**
Updates the user's score when they complete an action. Add this action's score to the old score

**Request Body:**

```json
{
  "userId": "99999",
  "score": 100,
  "authToken": "valid_token"
}
```

**Response:**

```json
{
  "message": "Score updated successfully",
  "newScore": 1900
}
```

## 4. Get a specific top

**Endpoint:** `GET /leaderboard/:n`

**Description:**
returns top n number of usernames and their corresponding score.

## Security Measures

- **Authentication:** Requires valid tokens (e.g., JWT) to prevent unauthorized updates.
- **Rate Limiting:** Prevents excessive API calls to avoid spamming.
- **Input Validation:** Ensures only valid scores are submitted.

## Real-Time Updates

- WebSocket is used to broadcast leaderboard changes to all connected clients.
- Alternative: Polling every few seconds (if WebSocket is not available).

## Database Schema

### User Scores Table

| userId | username | score |
| ------ | -------- | ----- |
| 12345  | Pikachu  | 20000 |
| 456876 | Dragon   | 18000 |

...
| 99999 | player123 | 1800 |

## Data Storage

### 1. SQL Database (PostgreSQL/MySQL)

#### **User Table**

| userId (PK) | username | email        | password_hash | createdAt        |
| ----------- | -------- | ------------ | ------------- | ---------------- |
| 1           | player1  | p1@email.com | ****\*\*****  | 2024-01-01 10:00 |
| 2           | player2  | p2@email.com | ****\*\*****  | 2024-01-01 11:00 |

#### **Scores Table**

| userId (FK) | score | updatedAt        |
| ----------- | ----- | ---------------- |
| 12345       | 20000 | 2024-02-23 08:00 |
| 99999       | 1800  | 2024-02-23 09:00 |

To improve performance, add an index:

```sql
CREATE INDEX idx_score ON scores (score DESC);
SELECT userId, score FROM scores ORDER BY score DESC LIMIT 10;
```

### 2. Redis (For Fast Leaderboard Queries)

Redis can be used to store the leaderboard using **Sorted Sets (ZSET)**:

```bash
ZADD leaderboard 20000 "Pikachu"
ZADD leaderboard 18000 "Dragon"
ZRANGE leaderboard 0 9 WITHSCORES
```

✅ **Advantage**: Fast lookups (O(log N))
❌ **Disadvantage**: Data loss risk if not persisted

## Suggested Improvements

- Implement Redis caching for faster leaderboard retrieval.
- Use message queues (e.g., RabbitMQ) to handle high update loads efficiently.
- Add logging and monitoring to track suspicious activities.
