const fs = require('fs');

// fs.readFile('input.txt') // loads everything into memory
const readableStream = fs.createReadStream('input.txt');

readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes.`);
});

readableStream.on('end', () => {
  console.log('Finished reading.');
});
