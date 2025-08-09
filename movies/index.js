// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3500;


app.get('/no-stream', (req, res) => {
  const filePath = path.join(__dirname, 'movie1.mp4');

  // Warning: loads entire file into memory
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    res.end(data);
  });
});


app.get('/stream', (req, res) => {
  const filePath = path.join(__dirname, 'movie1.mp4');
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Serve frontend HTML
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
