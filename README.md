# 🎨 Unnamed Social Media Art Project by Kade Angell

## Description

Welcome to my yet-to-be-named social media art project! This platform prompts users with colors and a theme, inviting them to draw something creative. Once the masterpiece is ready, users can upload it for the world to see. The project uses an Express backend and a SvelteKit frontend, all written in TypeScript.

## 🛠 Technologies

Backend: Express with TypeScript
Frontend: SvelteKit with TypeScript
## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- TypeScript globally installed (`npm install -g typescript`)
### Installation
1. Clone this repository
```bash
git clone https://github.com/Kade-Angell/your-project-name.git
```
2. Install backend dependencies
```bash
cd backend
npm install
```
3. Install frontend dependencies
```bash
cd ../frontend-web
npm install
```
## 🏃‍♂️ Running the Project

### Backend
Navigate to the `backend` directory and run:

```bash
npm run dev
```
This will start the Express server and build the frontend, and you'll be able to view the entire project running.

### Frontend (For Development Purposes Only)
Navigate to the frontend-web directory and run:

```bash
npm run dev
```
This is specifically for frontend development. It will start Vite, allowing you to develop and test the frontend portion in isolation.

## 👷‍♀️ Development Notes

### TypeScript
This project is built using TypeScript for both the backend and frontend. Make sure you're comfortable with TypeScript conventions.

*Backend TypeScript Configuration*

The tsconfig.json in the backend directory configures TypeScript for Node.js and Express. Ensure that you're exporting your types and interfaces properly.

*Frontend TypeScript Configuration*

The svelte.config.js and tsconfig.json in the frontend-web directory set up TypeScript for SvelteKit.

### Express
I'm using Express for routing on the backend. Check out the routes folder to add or modify API endpoints.

### SvelteKit
The frontend is built with SvelteKit. Check out src/routes to add or modify frontend pages.

This is my personal project and is not open for contributions. If you have questions or want to learn more, feel free to reach out.