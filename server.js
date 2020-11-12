const http = require('http');
const app = require('./src/app');

const port = process.env.PORT || 3020;

const server = http.createServer(app);
server.listen(port, ()=> console.log(`listing on port: ${port}`))