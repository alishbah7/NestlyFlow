<!--
Sync Impact Report:

- Version change: 0.0.0 → 1.0.0
- Added sections:
  - Principle I: Full-Stack Technology Stack
  - Principle II: API-Driven Communication
  - Principle III: High-Fidelity User Interface
  - Principle IV: Dual-Mode Interaction
  - Principle V: Secure and Environment-Driven Configuration
  - Principle VI: Modular Backend Architecture
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# AI-Powered Todo App Constitution

## Core Principles

### I. Full-Stack Technology Stack
The project will use a modern, decoupled architecture with a Next.js frontend and a Python (FastAPI) backend. The database will be a Neon serverless Postgres instance. This ensures a clear separation of concerns and allows for independent development and scaling.

### II. API-Driven Communication
All communication between the frontend and backend will be through a well-defined RESTful API. The backend will expose two primary endpoints: `/crud` for data manipulation and `/chat` for conversational interactions, ensuring a consistent interface.

### III. High-Fidelity User Interface
The frontend implementation must be a "pixel-perfect" representation of the designs provided in the `frontend/public/images` directory. This commitment to design ensures a high-quality, polished user experience.

### IV. Dual-Mode Interaction
The application will support two modes of interaction: a traditional graphical user interface for manual task management and a conversational interface powered by a Groq and Gemini's free LLM based chatbot. This provides users with flexibility and an innovative way to manage their tasks.

### V. Secure and Environment-Driven Configuration
All sensitive information, including database connection strings (`DATABASE_URL`) and API keys (`GROQ_API_KEY`), must be managed through an `.env` file and not be hardcoded into the application. This is a non-negotiable security requirement.

### VI. Modular Backend Architecture
The backend code will be organized into a modular structure. The main entry point will be `main.py`, with business logic for different concerns separated into a `routes` directory, specifically `todos.py` for CRUD operations and `chatbot.py` for the conversational AI.

## Governance
This Constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan. All PRs/reviews must verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2026-01-10 | **Last Amended**: 2026-01-10