const fs = require('fs');

const readableStream = fs.createReadStream('input.txt', {
  encoding: 'utf8',
  highWaterMark: 20 // read 20 characters per chunk
});

const delayPerChunk = 200; // 1 second per chunk

let chunks = ''
readableStream.on('data', (chunk) => {
  readableStream.pause(); // stop reading temporarily
  chunks += chunk
  console.log(chunks);

  setTimeout(() => {
    readableStream.resume(); // continue after delay
  }, delayPerChunk);
});

readableStream.on('end', () => {
  console.log('Finished reading.');
});
