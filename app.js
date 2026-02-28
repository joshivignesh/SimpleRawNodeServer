const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  // GET / — home page with user creation form
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <body>
        <h1>Hello, World!</h1>
        <form action="/create-user" method="POST">
          <input type="text" name="username" placeholder="Enter username" required />
          <button type="submit">Add User</button>
        </form>
      </body>
    `);
  }

  // GET /users — list all users from users.json
  if (url === '/users' && method === 'GET') {
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'Failed to read users file' }));
      }

      const users = JSON.parse(data);
      const userListItems = Object.entries(users)
        .map(([key, val]) => `<li>${key}: ${val}</li>`)
        .join('');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      return res.end(`
        <h1>All Users</h1>
        <ul>${userListItems}</ul>
        <a href="/">Back</a>
      `);
    });
    return; // prevent fall-through while async read is in progress
  }

  // POST /create-user — parse body and persist new user to users.json
  if (url === '/create-user' && method === 'POST') {
    let body = '';

    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      // Parse "username=John" style form body
      const params = new URLSearchParams(body);
      const username = params.get('username');

      if (!username || username.trim() === '') {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/html');
        return res.end('<h2>Error: username is required.</h2><a href="/">Back</a>');
      }

      fs.readFile('users.json', 'utf8', (readErr, data) => {
        if (readErr) {
          res.statusCode = 500;
          return res.end('Server error reading users.');
        }

        const users = JSON.parse(data);
        const newKey = `User${Object.keys(users).length + 1}`;
        users[newKey] = username.trim();

        fs.writeFile('users.json', JSON.stringify(users, null, 4), writeErr => {
          if (writeErr) {
            res.statusCode = 500;
            return res.end('Server error saving user.');
          }
          res.statusCode = 302;
          res.setHeader('Location', '/users');
          return res.end();
        });
      });
    });
    return;
  }

  // 404 — catch-all
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>404 — Page Not Found</h1><a href="/">Home</a>');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
