# Journey Backend (TypeScript)

Welcome to the backend repository for the Journey project! This repository contains the server-side code written in TypeScript to power the Journey application.

## Overview

**Journey** is a modern web application designed to help users document and share their travel experiences. This backend repository handles the server logic, API endpoints, and database interactions, providing a robust foundation for the Journey application.

## Features

- **Express Server**: Built on the Express.js framework to handle HTTP requests and route management efficiently.
- **TypeScript**: Utilizes TypeScript for enhanced code readability, maintainability, and type safety.
- **Database Integration**: Connects seamlessly with a database (e.g., PostgreSQL) to store and retrieve user and travel data.
- **Authentication**: Implements secure user authentication and authorization mechanisms.
- **RESTful Endpoints**: Provides RESTful API endpoints for various functionalities.
- **Scalable Architecture**: Designed with scalability in mind to accommodate growth and increased user activity.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:scmt-dev/journey-backend-ts.git

   ```

2. **Install Dependencies**:

   ```bash

    cd journey-backend-ts
    npm install

    ```

3. **Set Up Environment Variables**:

    ```bash
    
     cp .env.example .env
    
     ```
    
    Then, fill in the environment variables in the `.env` file.

4. **Start the Server**:

    ```bash
    
     npm run dev
    
     ```


5. **Docker Setup**:

    ```bash
    
     docker-compose up -d
    
     ```


