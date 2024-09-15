const express = require('express');
const bodyParser = require('body-parser');  // Corrected this line
const http = require('http');
const sampleRoutes = require('./route/endpoint');

const app = express();
const server = http.createServer(app); 

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());
app.use('/api', sampleRoutes);

const port = process.env.PORT || 3005;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
