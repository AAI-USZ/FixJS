function() {
      if (turntable.socketVerbose) {
        LOG(util.nowStr() + " Sending message " + c.msgid + " to " + turntable.socket.host);
      }
      if (turntable.socket.transport.type == "websocket") {
        turntable.socketLog(turntable.socket.transport.sockets[0].id + ":<" + c.msgid);
      }
      turntable.socket.send(d);
      turntable.socketKeepAlive(true);
      turntable.pendingCalls.push({
        msgid: c.msgid,
        handler: a,
        deferred: b,
        time: util.now()
      });
    }