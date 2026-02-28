# SimpleRawNodeServer

A lightweight HTTP server built with **pure Node.js** — no Express, no frameworks. Demonstrates how Node's built-in `http` module handles routing, asynchronous file I/O, POST body parsing, and persistent JSON storage from scratch.

## 🚀 Features

- **GET /** — Home page with a form to add new users
- **GET /users** — Lists all users read from `users.json`
- **POST /create-user** — Parses form body, persists new user to `users.json`, then redirects to `/users`
- **404 handler** — Catch-all for unknown routes
- Zero external runtime dependencies

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (built-in `http` module) |
| Storage | JSON flat file (`users.json`) |
| Dev tooling | nodemon (auto-reload) |

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/joshivignesh/SimpleRawNodeServer.git
cd SimpleRawNodeServer

# Install dev dependencies
npm install

# Start with auto-reload (development)
npm start

# Start without nodemon (production)
npm run start-server
```

Server runs at **http://localhost:3000** by default.  
Override with: `PORT=8080 npm start`

## 📁 Project Structure

```
SimpleRawNodeServer/
├── app.js          # HTTP server — routing, I/O, POST parsing
├── users.json      # Flat-file data store
├── package.json
└── .gitignore
```

## 🐳 Docker (DevOps)

Run the server in a container without installing Node locally:

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

```bash
# Build and run
docker build -t simple-node-server .
docker run -p 3000:3000 simple-node-server
```

## 💡 Key Concepts Demonstrated

- Raw Node.js `http.createServer` without any framework
- Async file reading with `fs.readFile` and proper callback chaining
- Manual POST body parsing via `req.on('data')` chunks
- JSON persistence with `fs.writeFile`
- HTTP redirects (`302 Location`) after form submission
- Environment-based port configuration (`process.env.PORT`)

## 🔗 Author

**Vignesh Joshi** — [github.com/joshivignesh](https://github.com/joshivignesh)
