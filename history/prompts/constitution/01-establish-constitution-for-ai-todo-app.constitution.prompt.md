---
id: 01
title: Establish Constitution for AI Todo App
stage: constitution
date: 2026-01-10
surface: agent
model: gemini-pro
feature: none
branch: master
user: '{{USER}}'
command: /sp.constitution
labels: [constitution, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

/sp.constitution you have to create a to do app with crud operations using neon serverless postgres and a functional chatbot that will answer user queries and perform crud operations if user tell it to, there would be columns of id, title, description, completed, due at, created at, updated at columns, due at is for when user add the date and time for that specific task to be done but user should also manually be able to select completed or pending, ok so for backend functionality there is already a backend folder I REPEAT there is already a backend folder with virtual environment and downloaded dependencies which i have pasted in downloaded.txt so you should check it and other then that if there is anyother dependencies that should be downloaded then you can install them and there is a main.py file in backend which will call two endpoints chat and crud and then you have to create a folder called routes in which there should be 2 files one chatbot.py and todos.py, main.py will be the entry point if user will use chatbot it will call /chat and if user manually perform operations of crud then it will call /crud then after the backend is successfull we have to integrate it in frontend folder which has nextjs app. After the backend you should work on frontend, you will have to create a attractive next level ui for todo app exactly like the images named as ui in nexjs' app public's subfolder images, means you have to create a live ui just like those in image like pixel perfect ui and the other images that will be used in the interface are also under images folder under public folder in nextjs app. The chatbot in backend will be created with groq free llm i mean you don't have to use the paid one tiers use groq api key which is in .env file and also the connection string of neon is also in .env file named as DATABASE_URL, for how to create a free chatbot you can take example of demo.py which is in backend which have the chatbot code which shows how free chatbot has been build with groq api key. Now create a constituion file.

## Response snapshot

I have successfully created the project constitution based on the detailed requirements provided.

- **Defined Core Principles**: Established six core principles covering the technology stack, API-driven architecture, design fidelity, dual-mode interaction, secure configuration, and modular backend structure.
- **Created Constitution File**: Authored and saved the new constitution to `.specify/memory/constitution.md`, including a sync impact report.
- **Verified Template Consistency**: Checked dependent templates (`plan`, `spec`, `tasks`) and confirmed no updates were needed.
- **Generated PHR**: Created this Prompt History Record to document the process.

The project foundation is now set according to the new constitution (v1.0.0).

## Outcome

- ✅ Impact: High. Established the foundational principles for the entire project.
- 🧪 Tests: N/A
- 📁 Files: 1 created (`.specify/memory/constitution.md`)
- 🔁 Next prompts: `/sp.plan` to start architecting the feature.
- 🧠 Reflection: The initial user prompt was very detailed, which allowed for the creation of a comprehensive constitution. The absence of the `downloaded.txt` file was noted but did not block the process.

## Evaluation notes (flywheel)

- Failure modes observed: The shell script for PHR creation was not found, requiring a fallback to the agent-native method.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: n/a
