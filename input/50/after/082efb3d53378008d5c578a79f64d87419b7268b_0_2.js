function(e) {
              Utils.debug("There was an error restructuring the session. Loading defaults..."+JSON.stringify(e));
              se= new Session(e);
              se.restructure;
              s.set(se.toJSON());
//              s.set(
//                  sessionFields , self.get("corpus").get("sessionFields").clone()
//              );
            }