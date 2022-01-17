function(appids){
      var self = this;
      var c = this.get("corpus");
      c.id = appids.corpusid;
      this.set("corpus", c);
      
      var s = this.get("currentSession");
      s.id = appids.sessionid;
      this.set("currentSession", s);
      
      c.fetch({
        success : function() {
          var dl = self.get("currentDataList");
          dl.relativizePouchToACorpus(self.get("corpus"));
          dl.id = appids.datalistid;
          dl.fetch();
          /*
           * if corpus fetch worked, fetch session because it might need the fields form corpus
           */
          s.fetch({
            success : function() {
              s.relativizePouchToACorpus(self.get("corpus"));
              s.restructure(function(){
                appView.render();//TODO see if need this
              });
            },
            error : function(e) {
              Utils.debug("It thinks there was an error fetching the session. But chances are there wasnt...."+JSON.stringify(e));
              var se= new Session(e);
              se.restructure;
              s.set(se.toJSON());
            }
          });
        },
        error : function(e) {
          Utils.debug("It thinks there was an error fetching corpus. But it came back with an object..."+JSON.stringify(e));
          cor = new Corpus(e);
          cor.restructure();
          c.set(cor.toJSON());
          var dl = self.get("currentDataList");
          dl.relativizePouchToACorpus(self.get("corpus"));
          dl.id = appids.datalistid;
          dl.fetch();
          /*
           * if corpus fetch worked, fetch session because it might need the fields form corpus
           */
          s.fetch({
            success : function() {
              s.relativizePouchToACorpus(self.get("corpus"));
              s.restructure(function(){
                appView.render();//TODO see if need this
              });
            },
            error : function(e) {
              Utils.debug("There was an error restructuring the session. Restructuring..."+JSON.stringify(e));
              var se= new Session(e);
              se.restructure;
              s.set(se.toJSON());
//              s.set(
//                  sessionFields , self.get("corpus").get("sessionFields").clone()
//              );
            }
          });
        }
      });
      
     
      
    }