# Research and Decisions

This document records the key technical decisions for the To-Do Application feature.

## Backend Technology

- **Decision**: Python with FastAPI.
- **Rationale**: The user has specified a Python backend. FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It's a good choice for this project as it's easy to use and provides automatic interactive API documentation. The existing `backend` folder is already set up for Python.
- **Alternatives considered**: Flask, Django. FastAPI was chosen for its performance and ease of use for API development.

## Frontend Technology

- **Decision**: Next.js.
- **Rationale**: The user has specified a Next.js frontend. The `frontend` folder already contains a Next.js application. Next.js is a popular React framework that enables features like server-side rendering and generating static websites, which will be beneficial for the performance and SEO of the application.
- **Alternatives considered**: None, as this was a firm requirement.

## Database

- **Decision**: Neon Serverless PostgreSQL.
- **Rationale**: The user has specified Neon. Neon is a serverless, open-source alternative to AWS Aurora, offering features like autoscaling, branching, and a generous free tier, making it a good fit for this project.
- **Alternatives considered**: None, as this was a firm requirement.

## Chatbot LLM

- **Decision**: Groq API.
- **Rationale**: The user has specified using the Groq free tier API. Groq specializes in high-performance inference for large language models, which should provide a fast and responsive chatbot experience. The user also pointed to `demo.py` as an example implementation.
- **Alternatives considered**: None, as this was a firm requirement.
