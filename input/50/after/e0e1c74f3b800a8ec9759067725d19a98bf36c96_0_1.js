function(stanza) {
          console.log(stanza.toString());
          try{
              pubsub.handleStanza(stanza);
          }catch(e){
              console.log("error", e);
          }

      }