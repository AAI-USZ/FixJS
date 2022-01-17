function(e) {
            Utils.debug("There was an error fetching the session. Loading defaults..."+e);
            s.set(
                sessionFields , self.get("corpus").get("sessionFields").clone()
            );
          }