const http = require('http');

const port = process.env.port || 3000
//Using Express for creating weebserver
const express = require('express');
const app = express();

//Middleware used in Express

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use((req, res, next) => {
    console.log('In the middleware')
    next();
})

app.use((req, res, next) => {
    console.log('In the second middleware')
    res.send('<h1>Hello from express</h1>')
})

const server = http.createServer();

// Commenting out Raw NodeJS code

// // const server = http.createServer((req, res) => {
// //     const url = req.url;
// //     const fs = require('fs')
// //     if (url === '/') {
// //         res.statusCode = 200;
// //         res.setHeader('content-type', 'text/html')
// //         res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>')
// //         res.end('<h1>Hello, world!</h1>')
// //     }
// //     if (url === '/users') {
// //         res.statusCode = 200;
// //         res.setHeader('content-type', 'text/html')
// //         res.write('<h1>List of all Users!</h1>')
// //         fs.readFile('users.json', (err, data) => {
// //             if (err) {
// //                 console.log('File read error', err);
// //                 return;
// //             }
// //             const userData = JSON.parse(data);
// //             console.log("File Data", userData);

// //         })
// //         res.end('<ul><li>List of all Users!</li></ul>')
// //     }

// //     if (url === '/create-user') {
// //         res.statusCode = 200;
// //         console.log('username from parent route', req.params);
// //         return;
// //     }

// //     // console.log(req);
// // });



app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

// console.log('msg');
// server.listen(3000);