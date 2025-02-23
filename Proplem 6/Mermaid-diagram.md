## Sequence Diagram

The following sequence diagram illustrates how the leaderboard update process works:

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API Gateway
    participant Auth Service
    participant Score Service
    participant Database
    participant WebSocket

    User->>+Frontend: Completes an action
    Frontend->>+API Gateway: POST /score/update (authToken, score)
    API Gateway->>+Auth Service: Validate JWT
    Auth Service-->>-API Gateway: Valid / Invalid Token
    API Gateway-->>+Score Service: Forward request if valid
    Score Service->>+Database: Update score
    Score Service-->>-API Gateway: Response (new score)
    API Gateway-->>-Frontend: Send updated score response
    Score Service-->>WebSocket: Notify all clients
    WebSocket-->>Frontend: Update leaderboard

```
