function () {
      // this error means that socket.io.js was retrieved from NPS in < script > tag,
      // but failed to connect using available transports
      log.error("[RT] = Connection to NPS failed");
    }