function(e) {
          Utils.debug("Session fetched successfully" + e);
          s.relativizePouchToACorpus(self.get("corpus"));
          s.set(
              sessionFields , self.get("corpus").get("sessionFields").clone()
          );
        }