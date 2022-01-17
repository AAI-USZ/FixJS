function() {
          if(typeof self.get("corpus") != "function"){
            u.relativizePouchToACorpus(self.get("corpus"));
            u.fetch();
          }
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
//              s.relativizePouchToACorpus(self.get("corpus"));
//              s.restructure(function(){
//                appView.render();//TODO see if need this
//              });
//              s.set(
//                  "sessionFields" , self.get("corpus").get("sessionFields").clone()
//              );
            }
          });
        }