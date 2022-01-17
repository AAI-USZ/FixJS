function(e) {
          Utils.debug("There was an error restructuring the session. Loading defaults..."+e);
          s.relativizePouchToACorpus(self.get("corpus"));
          s.set(
              sessionFields , self.get("corpus").get("sessionFields").clone()
          );
        }