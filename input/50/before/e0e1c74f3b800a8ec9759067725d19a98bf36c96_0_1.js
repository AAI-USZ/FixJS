function(stanza) {
          console.log(stanza.toString());
          pubsub.handleStanza(stanza);

      }