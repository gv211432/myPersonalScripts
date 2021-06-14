const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080/tokenid");

var count = 1;

ws.on("open", function open() {
  setInterval(() => {
    var payload = {
      topic: "/tokenid/outTopic",
      msg: {
        No: count,
        name: "Gaurav",
        Message: "Hi whats up gaurav!!",
      },
    };
    var msg = JSON.stringify(payload);
    ws.send(msg);
    count++;
  }, 2000);
});

ws.on("message", function incoming(data) {
  try {
    console.log(JSON.parse(data));
  } catch (e) {
    console.log(data);
  }
});

// setTimeout(() => ws.close(), 5000);
