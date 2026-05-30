# GitHub Profile Analyzer

## Overview
A Node.js + Express.js backend application that analyzes GitHub profiles using the GitHub Public API and stores insights in MySQL.

## Features

- Analyze GitHub profiles
- Store profile insights in MySQL
- Fetch all analyzed profiles
- Fetch a single profile
- Modern frontend UI
- Live deployment on Render

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub API
- HTML/CSS/JavaScript

## Installation

1. Clone the repository

```bash
git clone https://github.com/chandana-0693/github-profile-analyzer.git
```

2. Install dependencies

```bash
npm install
```

3. Configure .env

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
PORT=3000
```

4. Run application

```bash
node server.js
```

## API Endpoints

### Analyze Profile

GET

```text
/api/profiles/analyze/:username
```

### Get All Profiles

GET

```text
/api/profiles
```

### Get Single Profile

GET

```text
/api/profiles/:username
```

## Live Demo

https://github-profile-analyzer-8iy0.onrender.com