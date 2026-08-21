========================================================================
                         InstaR Application
   Real-Time User & Role Management Dashboard with ASP.NET Core & SignalR
========================================================================

1. INTENT & OVERVIEW
------------------------------------------------------------------------
InstaR is a full-stack, real-time Role-Based Access Control (RBAC) and 
User Management Dashboard application.

The primary intent of InstaR is to demonstrate instantaneous, bi-directional
state synchronization between a .NET 10 Web API backend and a modern React
frontend using SignalR WebSockets and Entity Framework Core. When changes
are made to users or roles in one browser session (or via API call), all 
connected client sessions are updated instantly without requiring manual page 
refreshes.


2. CORE FEATURES
------------------------------------------------------------------------
* User Management (CRUD):
  - View list of all registered users with assigned roles and creation dates.
  - Create new users with username, email, password, and assigned role.
  - Edit existing user profiles and re-assign roles.
  - Delete users with automatic database and UI sync.

* Role Management (CRUD):
  - View all user roles and descriptions.
  - Create custom roles (e.g., Admin, Editor, Viewer).
  - Edit role names and descriptions.
  - Delete roles.

* Real-Time SignalR Broadcasts:
  - Automatic WebSocket notification broadcasts on data mutation.
  - Dynamic UI state re-fetching and visual toast alerts for connected users.
  - Live activity log tracking every event and broadcast in real time.

* Interactive Dashboard:
  - High-level metric counters for Total Users and Total Roles.
  - Live connection status monitors for both API and SignalR WebSockets hub.
  - Quick action shortcuts to trigger creation modals directly.

* API Documentation & Swagger UI:
  - Built-in Swagger OpenAPI endpoint testing available out-of-the-box.


3. TECHNICAL ARCHITECTURE & STACK
------------------------------------------------------------------------
[ Backend ]
- Platform: .NET 10 (ASP.NET Core Web API)
- Database & ORM: Entity Framework Core with SQLite (testDB.db)
- Real-Time Layer: ASP.NET Core SignalR (NotificationHub at /notificationHub)
- API Docs: Swagger / OpenAPI (available at /swagger)

[ Frontend ]
- Framework & Build Tool: React 19 + Vite
- Real-Time Client: @microsoft/signalr WebSocket client
- Styling: Custom responsive CSS with dark theme, sidebar navigation, dynamic modals, and toast alerts


4. HOW IT WORKS
------------------------------------------------------------------------
1. Persistence Layer:
   Upon startup, the .NET backend ensures the SQLite database schema 
   (Users and Roles tables) is created via EF Core AppDbContext.

2. RESTful HTTP API Requests:
   When a user performs CRUD actions in the frontend UI, standard REST API 
   requests (GET, POST, PUT, DELETE) are sent to /api/Users and /api/Roles.

3. SignalR Real-Time Event Loop:
   - When a controller endpoint modifies user or role data in SQLite, it 
     invokes IHubContext<NotificationHub>.
   - The Hub emits WebSocket events (`ReceiveUserUpdate` or `ReceiveRoleUpdate`)
     to all connected clients.
   - Frontends listening on the WebSocket connection trigger state updates, 
     display real-time toast notifications, and append entries to the 
     Activity Log.


5. HOW TO RUN THE APPLICATION
------------------------------------------------------------------------
Prerequisites:
- .NET 10 SDK
- Node.js (v18+ recommended) and npm

Running the Backend:
1. Open terminal and navigate to the backend directory:
   cd backEnd
2. Start the server:
   dotnet run
3. The API will start on http://localhost:5027 (or https://localhost:7041).
   Swagger UI is accessible at: http://localhost:5027/swagger

Running the Frontend:
1. Open a second terminal and navigate to the frontend directory:
   cd frontend
2. Install dependencies (if not done yet):
   npm install
3. Start the dev server:
   npm run dev
4. Open the displayed local URL (typically http://localhost:5173) in your browser.


========================================================================
