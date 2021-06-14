const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080/gaurav");

var count = 10;

ws.on("open", function open() {
  // setInterval(() => {
  //   var payload = {
  //     topic: "hi",
  //     msg: count + " Hi whats up!!",
  //   };
  //   var msg = JSON.stringify(payload);
  //   ws.send(msg);
  //   count++;
  // }, 2000);
});

ws.on("message", function incoming(data) {
  console.log(data);
});
