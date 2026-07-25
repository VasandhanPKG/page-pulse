# 🚀 Page Pulse - Website Audit Tool

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![React](https://img.shields.io/badge/React-Vite-blue)
![Jest](https://img.shields.io/badge/Testing-Jest-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

Page Pulse is a lightweight full-stack web application that audits any publicly accessible webpage and extracts useful information about its structure and metadata. The application accepts a website URL, fetches the HTML content, analyzes it, and presents an easy-to-understand report.

This project was developed as part of the **Digital Heroes Training Task** to demonstrate backend API development, frontend integration, testing, documentation, deployment, and software design principles.

---

# 📖 Table of Contents

- Project Overview
- Problem Statement
- Objectives
- Features
- Technology Stack
- System Architecture
- Project Structure
- Installation Guide
- Environment Variables
- API Documentation
- Parsing Logic
- Error Handling
- Testing
- Design Decisions
- Challenges Faced
- Future Improvements
- Deployment
- Live Demo
- Author
- Credits

---

# 📌 Project Overview

Modern websites contain valuable metadata that can be analyzed automatically. Developers, SEO specialists, QA engineers, and website owners often need quick information about a webpage without manually inspecting the HTML.

Page Pulse automates this process by extracting important information including:

- HTTP Status Code
- Response Time
- Page Title
- Meta Description
- H1 Count
- Images Missing Alt Attributes
- Approximate Word Count

The application consists of a React frontend and an Express backend. The frontend allows users to submit a URL, while the backend performs the audit using Axios and Cheerio.

---

# 🎯 Problem Statement

Manually inspecting websites for metadata and accessibility issues is time-consuming.

Developers often have to:

- Open Developer Tools
- Inspect HTML
- Count headings
- Check image accessibility
- Measure response information

Page Pulse simplifies this process by providing all this information with a single click.

---

# 🎯 Objectives

The primary objectives of this project are:

- Build a REST API for webpage auditing.
- Develop a clean frontend interface.
- Handle invalid and unexpected inputs gracefully.
- Write automated tests.
- Follow clean software architecture.
- Deploy the application publicly.

---

# ✨ Features

### Website Analysis

✔ HTTP Status Code

✔ Response Time

✔ HTML Title Extraction

✔ Meta Description Extraction

✔ H1 Count

✔ Missing Image Alt Count

✔ Word Count Estimation

---

### User Interface

✔ Clean and responsive design

✔ Loading indicator

✔ Error messages

✔ Input validation

✔ Mobile friendly

---

### Backend

✔ REST API

✔ Modular architecture

✔ Fast HTML parsing

✔ Request timeout

✔ Error handling

---

### Quality

✔ Automated testing

✔ Clean code

✔ Documentation

✔ Deployment

---

# 🛠 Technology Stack

## Frontend

- React
- Vite
- Axios
- CSS

---

## Backend

- Node.js
- Express.js
- Axios
- Cheerio

---

## Testing

- Jest
- Supertest

---

## Deployment

Frontend

- Vercel

Backend

- Render

---

# 🏗 System Architecture

```
User
   │
   ▼
React Frontend
   │
HTTP POST
   │
   ▼
Express API
   │
Axios Request
   │
   ▼
Target Website
   │
HTML Response
   │
Cheerio Parser
   │
Extract Metadata
   │
Return JSON
   │
Frontend Display
```

---

# 📂 Project Structure

```
page-pulse/

│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

# ⚙ Installation Guide

## Clone Repository

```bash
git clone https://github.com/USERNAME/page-pulse.git
```

---

## Backend

```bash
cd server
npm install
npm start
```

Runs at

```
http://localhost:5000
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Runs at

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Backend

```
PORT=5000
```

Frontend

```
VITE_API_URL=http://localhost:5000
```

---

# 📡 API Documentation

## Endpoint

```
POST /api/audit
```

---

## Request

```json
{
    "url":"https://example.com"
}
```

---

## Success Response

```json
{
    "status":200,
    "responseTime":132,
    "title":"Example Domain",
    "metaDescription":"Example description",
    "h1Count":1,
    "missingAltImages":0,
    "wordCount":156
}
```

---

## Error Response

```json
{
    "error":"Invalid URL"
}
```

---

# 🔍 Parsing Logic

The backend performs the following steps:

### Step 1

Receive URL from frontend.

↓

### Step 2

Validate URL format.

↓

### Step 3

Fetch webpage using Axios.

↓

### Step 4

Measure response time.

↓

### Step 5

Load HTML into Cheerio.

↓

### Step 6

Extract:

- Title
- Meta Description
- H1 Count
- Images without Alt
- Word Count

↓

### Step 7

Return structured JSON.

---

# ⚠ Error Handling

The API gracefully handles multiple failure scenarios.

### Invalid URL

Returns

```
400 Bad Request
```

---

### Website Timeout

Returns

```
408 Request Timeout
```

or

```
502 Bad Gateway
```

depending on the underlying request failure.

---

### Non HTML Response

Returns

```
400
```

with an appropriate error message.

---

### Internal Errors

Returns

```
500 Internal Server Error
```

---

# 🧪 Testing

Automated tests were written using Jest and Supertest.

## Covered Scenarios

### Happy Path

- Valid URL
- Successful parsing
- Expected JSON response

---

### Failure Case 1

Invalid URL

Expected:

- Validation failure
- Proper status code

---

### Failure Case 2

Timeout / Unreachable website

Expected:

- Error response
- No application crash

---

### Failure Case 3

Non HTML response

Expected:

- Error message
- Safe handling

---

## Run Tests

```bash
cd server
npm test
```

---

# 💡 Design Decisions

## 1. Express.js

Express was selected because it is lightweight, flexible, and ideal for building REST APIs. Its middleware architecture keeps the code modular and easy to maintain.

---

## 2. Cheerio

Cheerio provides fast and efficient HTML parsing using a familiar jQuery-like syntax. It enables reliable extraction of page elements without requiring a browser environment.

---

## 3. Layered Architecture

The backend is divided into controllers, routes, services, middleware, and utilities. This separation of concerns improves readability, testing, scalability, and maintainability.

---

# 🚧 Challenges Faced

- Handling websites that return non-HTML content.
- Managing request timeouts.
- Dealing with pages that lack metadata.
- Ensuring reliable tests despite external network dependencies.
- Deploying frontend and backend on separate hosting platforms.

---

# 🚀 Future Improvements

If more development time were available, the following enhancements would be implemented:

- Lighthouse Performance Integration
- SEO Score Calculation
- Accessibility Score
- Open Graph Metadata Analysis
- PDF Report Export
- Audit History
- User Authentication
- Dashboard Analytics
- Batch URL Auditing
- Caching of Recent Audits

---

# 🌍 Deployment

## Frontend

https://YOUR-FRONTEND.vercel.app

---

## Backend

https://page-pulse-l2kq.onrender.com

---

# 👨‍💻 Author

**Vasandhan P.K.G**

Electronics and Communication Engineering

GitHub

https://github.com/VasandhanPKG

---

# 🙏 Acknowledgements

This project was built as part of the **Digital Heroes Training Task**.

---

# 📌 Footer Credit

**Built for Digital Heroes Training Task**

https://digitalheroesco.com
