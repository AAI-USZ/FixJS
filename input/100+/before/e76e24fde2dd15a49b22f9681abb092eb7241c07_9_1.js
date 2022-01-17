function wsMessage(connection, utf8Data) {
      //schema validation
      var msg = JSON.parse(utf8Data);

      var invalidSchemaCheck = true;
      try {
        invalidSchemaCheck = session.schema.checkSchema(msg);

      } catch (err) {
        log("ERROR", "[PZP WSServer]: " + err);
      }
      if(invalidSchemaCheck) {
        // For debug purposes, we only print a message about unrecognized packet,
        // in the final version we should throw an error.
        // Currently there is no a formal list of allowed packages and throw errors
        // would prevent the PZP from working
        log("ERROR",  "[PZP WSServer]: msg schema is not valid " + JSON.stringify(msg));
      }
      else {
        // schema check is false, so validation is ok
        log("DEBUG",  "[PZP WSServer]: msg schema is valid " + JSON.stringify(msg));
      }


      // Each message is forwarded back to Message Handler to forward rpc message
      if(msg.type === "prop" ) {
        if(msg.payload.status === "disconnectPzp") {
          if( typeof pzp !== "undefined" && typeof pzp.sessionId !== "undefined") {
            if(pzp.connectedPzp.hasOwnProperty(pzp.sessionId)) {
              pzp.connectedPzp[pzp.sessionId].socket.end();
              pzp.wsServerMsg("Pzp "+pzp.sessionId+" closed");
            }
          }
        }
        else if(msg.payload.status === "registerBrowser") {
          pzp.connectedApp(connection);
        }
    } else {
      if( typeof pzp !== "undefined" && typeof pzp.sessionId !== "undefined") {
        pzp.messageHandler.onMessageReceived(msg, msg.to);
      }
    }
  }