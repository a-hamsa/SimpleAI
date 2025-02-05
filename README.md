# Chatbot Application

## Project Overview
This is a chatbot application built with the following stack:
- **Backend**: ASP.NET (REST API)
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Database**: SQL Server
- **AI Integration**: Azure OpenAI

The project is designed to provide a chatbot interface with user authentication features. It is in its early stages of development.

---

## Current Features
- **API Endpoints**:
  - `api/Auth/login` (POST): User login.
  - `api/Auth/register` (POST): User registration.
  - `api/Auth/logout` (POST): User logout.
  - `api/OpenAi/complete` (POST): AI chatbot response generation.
  - `api/History` (GET): Retrieve chat history.
  - `api/History` (DELETE): Delete a chat history entry.

---

## Technologies Used
### Backend
- **ASP.NET**: Manages API endpoints and server-side logic.
- **Azure OpenAI**: Powers the chatbot's conversational capabilities.

### Frontend
- **React.js**: Provides the user interface for the chatbot and login functionality.
- **Tailwind CSS**: Ensures responsive and modern styling.

### Database
- **SQL Server**: Stores user authentication and chat history data.

---

## Database Schema
### Tables

#### Users Table
| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| Id          | int       | Primary Key, Auto-increment |
| Username    | string    | Unique, Not Null |
| Password    | string    | Not Null |
| IsAdmin     | boolean   | Default: false |
| Email       | string    | Unique, Not Null |

#### History Table
| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| Id          | int       | Primary Key, Auto-increment |
| UserId      | int       | Foreign Key (Users.Id) |
| Message     | string    | Not Null |
| Timestamp   | DateTime  | Default: CURRENT_TIMESTAMP |

---

## API Endpoints

### **Authentication**
#### `api/Auth/login` (POST)
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "token"
  }
  ```

#### `api/Auth/register` (POST)
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "The Message"
  }
  ```

#### `api/Auth/logout` (POST)
- **Request Body:** None
- **Response:**
  ```json
  {
    "message": "The message"
  }
  ```

### **Chatbot Interaction**
#### `api/OpenAi/complete` (POST)
- **Request Body:**
  ```json
  {
    "prompt": "string"
  }
  ```
- **Response:**
  ```json
  {
    "completion": "The Completion text"
  }
  ```

### **Chat History**
#### `api/History` (GET)
- **Request Body:** None
- **Response Example:**
  ```json
  [
    {
      "message": "Sample message text",
      "timestamp": "2025-02-02T16:32:52.6533493"
    },
    {
      "message": "Another sample message",
      "timestamp": "2025-02-05T15:45:11.6019929"
    }
  ]
  ```

#### `api/History` (DELETE)
- **Request Body:**
  ```json
  {
    "id": "int"
  }
  ```
- **Response:** None

---

## Installation and Setup
### Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js and npm](https://nodejs.org/)
- SQL Server instance

### Steps to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Backend Setup**:
   - Navigate to the backend project directory.
   - Restore dependencies:
     ```bash
     dotnet restore
     ```
   - Create a `.env` file in the backend directory and add:
     ```env
     AZURE_OPENAI_API_KEY=your_api_key_here
     AZURE_OPENAI_ENDPOINT=your_endpoint_here
     ```
   - Run the project:
     ```bash
     dotnet run
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Database Setup**:
   - Ensure a SQL Server instance is running.
   - Configure the connection string in the backend project's `appsettings.json` file.

5. **Azure OpenAI Configuration**:
   - Obtain your Azure OpenAI API key.
   - Add the key to the backend project in the appropriate configuration file or environment variables.

---

## Planned Features
- **Login Functionality**: Secure authentication and user management.
- **Enhanced Chatbot Features**: Support for advanced queries and personalized interactions.
- **Deployment**: Host the application on a cloud platform.

---

## Contributing
Contributions are welcome! Please create a fork of the repository and submit a pull request with your changes.

---

## Contact
For any inquiries or support, please contact: Ahmad Hamsa Pattuneri