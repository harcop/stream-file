const fs = require('fs');
const writableStream = fs.createWriteStream('output.txt');

writableStream.write(`The gentle hum of the refrigerator and the distant sounds of traffic blended into a soothing background melody. Emma glanced around, noticing how the soft glow of the candle made the apartment feel even cozier. She thought about the journey that had brought her here—the late nights studying, the part-time jobs, the moments of doubt and triumph. Each memory seemed to settle into the room, filling it with invisible threads of her story.

After finishing a chapter in her book, Emma stood and wandered to the kitchen. She opened a box labeled "dishes" and carefully arranged her favorite mugs on the shelf. Each one held a story: a souvenir from a trip, a gift from a friend, a reminder of a rainy afternoon spent in a café. She smiled, realizing how these small objects made the space uniquely hers.

Outside, the city lights began to twinkle, casting reflections on the windowpane. Emma watched as neighbors returned home, their laughter echoing in the hallway. She felt a quiet connection to them, knowing they too were building their own lives, one day at a time.
`);

writableStream.write('Node.js Streams!\n');

writableStream.end('End of data.');
