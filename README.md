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
- **API Endpoint**:
  - `api/OpenAi/complete`: An endpoint for interacting with the Azure OpenAI service to generate AI responses.

---

## Technologies Used
### Backend
- **ASP.NET**: Manages API endpoints and server-side logic.
- **Azure OpenAI**: Powers the chatbot's conversational capabilities.

### Frontend
- **React.js**: Provides the user interface for the chatbot and login functionality.
- **Tailwind CSS**: Ensures responsive and modern styling.

### Database
- **SQL Server**: Stores user authentication and other necessary data.

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
- **Chat History**: Save and retrieve past conversations.
- **Deployment**: Host the application on a cloud platform.

---

## Contributing
Contributions are welcome! Please create a fork of the repository and submit a pull request with your changes.


---

## Contact
For any inquiries or support, please contact: Ahmad Hamsa Pattuneri