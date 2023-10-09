
## Endpoints for Authentication

### Sign Up

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Request Body**:
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.

#### Example Request

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}


### Sign In

- **URL**: `/auth/signin`
- **Method**: `POST`

#### Example Request

POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}


### token

POST /auth/token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsIn..."
}

```