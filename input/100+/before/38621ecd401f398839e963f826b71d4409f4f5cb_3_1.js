function(err, sess) {
              //need to send something back to the client if there's errors so it doesn't just not respond
              if (err) {
                logger.error('Error retrieving session: ' + err);
              } else if (!sess) {
                socket.fire("noSessionFound", {
                  client: client,
                  message: message,
                  result: {
                    type: "event",
                    eventName: "noSessionFound",
                    eventArgs: null,
                    busName: message.data.busName
                  }
                });
              } else {
                logger.trace({message:"Got session from store.  it is: " + util.inspect(sess), category:"feather.ssock"});
                message.request = {session: sess, sessionId: message.sid};
                client.session = sess;
                handleMessage(client, message, function() {
                  if (message.request && message.request.session) {
                    // Re-store the session in case they modified it.
                    httpServer.sessionStore.set(message.sid, message.request.session);
                  }
                }); 
              }       
            }