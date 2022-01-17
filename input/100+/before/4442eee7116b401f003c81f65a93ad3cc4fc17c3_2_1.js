function(socket) {
  /* ask client for rpcs with namespace */
  socket.on("expose", function(o) {
    var client = Agent(DObject.validate(o));
    var user = User();

    client.on("bubble", function(cmd) {
      socket.emit("cmd", cmd);
    });

    user.on("out", function(log) {
      client.chat.log(log);
    });

    user.on("did updated", function(key, value) {
      client.username(value);
    });

    socket.on("disconnect", function() {
      thRee.self.say(user.name + " has logged out.");
      thRee.leave(socket.id);
    });

    socket.on("cmd", function(cmd) {
      user.in(cmd);
    });

    /* set name and send it to the client */
    user.name = socket.handshake.name || new Buffer(socket.id).toString("base64").substring(0, 8);

    com.logs(15).forEach(function(log) {
      client.chat.log(log);
    });
  
    thRee.join(socket.id, user);

    if (!welcome) {
      fs.readFile("./msg/welcome.markdown", "utf-8", function(err, data) {
        welcome = data;
        thRee.self.
          msg(user, welcome).
          say(user.name + " has logged in.");
      });
    } else {
      thRee.self.
        msg(user, welcome).
        say(user.name + " has logged in.");
    }
  });

  socket.emit("expose", DObject.expose(thRee.exts));
}