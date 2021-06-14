// ======================== Module section ===========================================
// ===================================================================================

// Mosca is js implementation of mqtt Server
const mosca = require("mosca");
const mqtt = require("mqtt");
const WebSocket = require("ws");
const url = require("url");

// Following is the setting for mosca to start service
var moscaSettings = {
  port: 1883,
};

// Following is the setting for websocket to start service
var websocketSettings = {
  port: 8080,
};

// Starting mosca have following syntax
var mqttServer = new mosca.Server(moscaSettings);
// fired when the mqtt mqttServer/broker is ready and running...
mqttServer.on("ready", () => console.log("Mosca mqttServer is up and running"));

// Starting websocket Server on port 8080
var wss = new WebSocket.Server(websocketSettings);
console.log("Webserver started on port 8080");
// console.log(wss);

// ========================  Varaible declaration  ========================================
// ========================================================================================

//{ token:mqttID }
const mqttUsers = {
  inTopic: "/tokenid/inTopic",
  outTopic: "/tokenid/outTopic",
  token: "tokenid",
  user: "userID",
};

var wsClientWell = {};

// ======================== Implemention section ====================================
// ===================================================================================

// handle new websocket connection
wss.on("connection", (ws, req) => {
  ws.send("You are connected to WebSocketsss..");

  console.log("New connection have etablished..");
  // console.log("Websocket details : ", ws);
  console.log("Websocket key : ", req.headers["sec-websocket-key"]);
  // console.log(wss.getUniqueID);
  // let token = req.url.substr(1);
  // console.log(req.url.substr(1));
  // console.log("client details : ", wss.clients);

  // Setting up mqtt client
  var mqttClient = mqtt.connect({
    host: "localhost",
    port: "1883",
    username: "gaurav",
    password: "92244@Great",
  });

  // Subscribing to the out topic for responses
  mqttClient.on("connect", function () {
    mqttClient.subscribe(`${req.url}/outTopic`, function (err) {
      if (!err) {
        return console.log("No error in new mqtt client connection!!");
      }
      console.log("Connection error..!!");
    });
    mqttClient.on("message", (topic, message, packet) => {
      console.log("Received message for pub :", message.toString());
      ws.send(message.toString());
    });
  });

  // wsClientWell[token] = ws;

  ws.on("message", (message) => {
    // console.log(wss);

    try {
      // console.log("Message form WEBSOCKET : ", message);

      let msg = JSON.parse(message);
      // let topic = mqttUsers.abc;
      let myMsg = JSON.stringify(msg.msg);
      var toSend = {
        topic: "/tokenid/outTopic",
        payload: myMsg, // or a Buffer
        qos: 1, // 0, 1, or 2
        retain: false, // or true
      };

      mqttServer.publish(toSend, function () {
        // console.log("Send msg form ws to mqtt...");
      });

      // console.log("received : ", msg);
    } catch (e) {
      console.log("Not JSON format this time..");
    }

    ws.on("close", function close() {
      console.log("Websocket connection closed..");
      mqttClient.unsubscribe("/tokenid/outTopic", () =>
        console.log("Client unsubscribed..")
      );
      mqttClient.end(true, () => console.log("Connecton closed.."));
    });
  });
});

// fired when a message is received by publisher or subscriber on joining event
mqttServer.on("published", function (packet, client) {
  console.log("Publisher details : \n", packet);
  // if (packet.payload !== undefined || packet.payload !== null) {
  //   ws.send("hi");
  // }
});

// When a new client connects to the mqttServer
mqttServer.on("clientConnected", function (client) {
  console.log("client connected", client.id);
});

// fired when a client disconnects
mqttServer.on("clientDisconnected", function (client) {
  console.log("Client Disconnected:", client.id);
});

// following setting is to authenticate publisher with username and password to
// forward the message to the subscriber..
mqttServer.authenticate = function (client, username, password, callback) {
  callback(
    null,
    username === "gaurav" && password.toString("ascii") === "92244@Great"
  );

  console.log(
    "\n  New client is :" +
      client.id +
      "\n  Password is : " +
      password +
      "\n  Username is : " +
      username +
      "\n"
  );
  //   JSON.stringify(client)
};

// ================================== the end ======================================
// ===================================================================================
