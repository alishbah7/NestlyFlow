# Actionable Tasks: To-Do Application

**Feature**: To-Do Application with CRUD and Chatbot
**Plan**: [specs\001-create-todo-app\plan.md](./plan.md)

This document breaks down the implementation of the To-Do Application into actionable tasks, organized by user story priority.

## Phase 1: Setup

- [X] T001 Some dependencies are already installed which are in `backend/dependencies.md` and if there are other dependencies which should be downloaded for backend then you can install them.
- [X] T002 Nextjs App with Typescript are already been initialized in the `frontend` directory.
- [X] T003 Configure the `.env` file in the `backend` directory with `DATABASE_URL` and `GROQ_API_KEY`.

## Phase 2: Foundational Backend

- [X] T004 [P] Define the `Todo` SQLAlchemy model in a new file `backend/models.py` based on `data-model.md`! (I have a tables.md in backend, check it because those columns are in my neondb table and also remember that neondb connection string is in env file of backend so we do not have to run any file to create column in neon console web as the columns already exist).
- [X] T005 Create the database tables from the SQLAlchemy models. This can be a startup event in `backend/main.py` (You do not have to create a table again as in task 004 i have mentioned that table already exist in neon db and the table name is todos).

## Phase 3: User Story 1 - Manual Task Management

- **Goal**: Users can create, read, update, and delete tasks through a graphical interface.
- **Independent Test**: All CRUD operations can be performed on tasks, and changes are persisted and reflected in the UI.

- [X] T006 [US1] Implement the FastAPI router for CRUD operations in `backend/routes/todos.py`.
- [X] T007 [US1] Implement the `GET /crud/todos` endpoint to fetch all tasks.
- [X] T008 [US1] Implement the `POST /crud/todos` endpoint to create a new task.
- [X] T009 [US1] Implement the `GET /crud/todos/{id}` endpoint to fetch a single task.
- [X] T010 [US1] Implement the `PUT /crud/todos/{id}` endpoint to update a task.
- [X] T011 [US1] Implement the `DELETE /crud/todos/{id}` endpoint to delete a task.
- [X] T012 [US1] Update `backend/main.py` to include the `todos` router.
- [X] T013 [P] [US1] Create the basic UI components for displaying a single task and a list of tasks in `frontend/components/todo/`.
- [X] T014 [P] [US1] Create the form component for adding and editing tasks in `frontend/components/todo/`.
- [X] T015 [US1] Implement API service functions for todos in `frontend/services/api.ts` to fetch and modify data.
- [X] T016 [US1] Assemble the main page in `frontend/app/page.tsx` to display the to-do list and provide controls for adding, editing, and deleting tasks.

## Phase 4: User Story 2 - Chatbot Task Management

- **Goal**: Users can manage their tasks by talking to a chatbot.
- **Independent Test**: Users can send messages to the chatbot to create, list, and update tasks.

- [X] T017 [US2] Implement the chatbot logic in `backend/routes/chatbot.py` to interact with the Groq API.
- [X] T018 [US2] The chatbot should be able to parse user intent for CRUD operations.
- [X] T019 [US2] Integrate the todo CRUD functions into the chatbot, so it can modify the database.
- [X] T020 [US2] Update `backend/main.py` to include the `chatbot` router.
- [X] T021 [P] [US2] Create the chatbot UI components in `frontend/components/chat/`, including the chat window, message display, and input field.
- [X] T022 [US2] Integrate the chatbot UI into the main page.

## Phase 5: User Story 3 - Visually Appealing UI

- **Goal**: The UI should be a pixel-perfect match of the provided design mockups.
- **Independent Test**: The application's visual appearance is indistinguishable from the `ui` images in `frontend/public/images`.

- [X] T023 [US3] Apply styles to all components to match the design mockups. This includes layout, colors, fonts, and spacing.
- [X] T024 [US3] Ensure all interactive elements have the correct states (hover, active, disabled) as per the design.

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T025 Add comprehensive error handling to both the backend and frontend.
- [ ] T026 Write unit and integration tests for the backend API.
- [ ] T027 Write component and integration tests for the frontend UI.
- [ ] T028 Ensure the application is responsive and works well on different screen sizes.

## Phase 7: User Authentication

### Backend (FastAPI)

- [X] **T029: Database Schema Update**
    - [X] Create a new `auth.py` file in the `backend` directory.
    - [X] Define a new SQL table `users` with columns: `id` (PK), `username`, `email` (UNIQUE), `hashed_password`.
    - [X] Add a `user_id` foreign key column to the `todos` table, referencing the `users` table's `id`.
    - [X] Update database logic to create these tables on startup.

- [X] **T030: Authentication Logic**
    - [X] Implement password hashing using `passlib`.
    - [X] Create utility functions for creating and verifying session cookies.
    - [X] Implement a dependency to get the current logged-in user from the session.

- [X] **T031: Auth API Endpoints**
    - [X] Create a new router for authentication (`/auth`).
    - [X] Implement a `/auth/signup` endpoint to create a new user.
    - [X] Implement a `/auth/login` endpoint to authenticate a user and set a session cookie.
    - [X] Implement a `/auth/logout` endpoint to clear the session cookie.
    - [X] Implement a `/users/me` endpoint to get the current user's details.

- [X] **T032: User Account Management API Endpoints**
    - [X] Implement a `PATCH /users/me` endpoint to update the username.
    - [X] Implement a `POST /users/me/reset-password` endpoint.
    - [X] Implement a `DELETE /users/me` endpoint to delete a user account and their associated tasks.

- [X] **T033: Secure Todo Endpoints**
    - [X] Update the `/todos/` endpoints to require authentication.
    - [X] Modify the logic to only perform operations on todos associated with the currently logged-in user.

### Frontend (Next.js)

- [X] **T034: Create Auth Pages**
    - [X] Create a `login` page (`/login`) with a form, plus "Sign Up" and "Forgot Password" links.
    - [X] Create a `signup` page (`/signup`) with a user registration form.
    - [X] Create an `account` page (`/account`) for user profile management.

- [X] **T035: Implement Authentication State**
    - [X] Use React Context to manage the user's authentication status globally.
    - [X] Implement logic to handle login and logout, storing session information in cookies.

- [X] **T036: Create API Service for Auth**
    - [ ] Extend `services/api.ts` with functions for `login`, `signup`, `logout`, `getUser`, `updateUser`, and `deleteUser`.

- [X] **T037: Protect Routes**
    - [X] Protect the `/tasks` page, redirecting unauthenticated users to `/login`.
    - [X] Redirect users from the "Get Started" button to `/login` if not authenticated.

- [X] **T038: Update UI based on Auth State**
    - [X] Modify `Navbar.tsx` to display the username (linking to `/account`) and a "Logout" button when logged in.
    - [X] Ensure the `/tasks` page fetches and displays only the tasks for the authenticated user.

- [X] **T039: Implement Account Management UI**
    - [X] On the `/account` page, add components for:
        - Editing the username.
        - An "Update Email" button showing a popup: "Contact abc@company.com to update your email".
        - A form to reset the password (current and new password).
        - A button to delete the account (with password confirmation).
        - A "Logout" button.

- [X] **T040: Implement Forgot Password Link**
    - [X] Add a non-functional "Forgot Password?" link on the login page.

## Dependencies

- **User Story 1** is a prerequisite for **User Story 2** (the chatbot needs the CRUD functions to be in place).
- **User Story 3** can be worked on in parallel with User Stories 1 and 2, but will likely be finalized after the core functionality is in place.

## Parallel Execution

- Within each user story, backend and frontend tasks can be worked on in parallel (marked with `[P]`). For example, once the API contract is clear, the frontend can be developed against a mock API while the backend is being built.

## Implementation Strategy

The implementation will follow an MVP-first approach. The first priority is to deliver a fully functional manual CRUD interface for managing tasks (User Story 1). This will form the core of the application. Once the core is stable, the chatbot functionality will be added, followed by a final phase of UI polishing and testing.
