const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// MDN function to generate integer between min and max inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  let currentUser = 'Fido';
  // array of CSS colour strings
  let colourArray = ['#003791', '#0f8700', '#6e0087', '#87002d'];
  // get random integer for use in selecting random colour from the array
  let randomInt = getRandomIntInclusive(0, 3);
  let randomColour = colourArray[randomInt];

  wss.clients.forEach(client => {
    // updates user count when new client connects
    let userCount = { type: 'usercounter',
                      value: wss.clients.size};
    client.send(JSON.stringify(userCount));
    // sends notification when new client connects
    let userJoin = {id: uuidv4(),
                    type: 'joinNotification',
                    content: `${currentUser} has arrived.`};
    client.send(JSON.stringify(userJoin));
  });

  ws.on('message', function incoming(data) {
    let parsedData = JSON.parse(data);
    // generates random ID
    let newId = uuidv4();
    let newData;

    switch(parsedData.type) {
      case 'incomingPicMessage':
        newData = { id: newId,
                    type: parsedData.type,
                    content: parsedData.content,
                    imgURL: parsedData.imgURL,
                    username: parsedData.username,
                    color: randomColour};
        wss.clients.forEach(client => {
          client.send(JSON.stringify(newData));
        });
        break;
      case 'incomingMessage':
        newData = { id: newId,
                    type: parsedData.type,
                    content: parsedData.content,
                    username: parsedData.username,
                    color: randomColour};
        wss.clients.forEach(client => {
          client.send(JSON.stringify(newData));
        });
        break;
      case 'incomingNotification':
        newData = { id: newId,
                    type: parsedData.type,
                    content: parsedData.content,
                    currentUser: parsedData.currentUser };
        // updates current user on server side
        currentUser = parsedData.currentUser;
        wss.clients.forEach(client => {
          client.send(JSON.stringify(newData));
        });
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + parsedData.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(client => {
      // sends notification when user has disconnected
      let userLeft = { id: uuidv4(),
                        type: 'leftNotification',
                        content: `It's time for ${currentUser} to go home.`};
      client.send(JSON.stringify(userLeft));
      });
    wss.clients.forEach(client => {
      // updates user count when user has disconnected
      let userCount = { type: 'usercounter',
                        value: wss.clients.size};
      client.send(JSON.stringify(userCount));
    });
  });
});

