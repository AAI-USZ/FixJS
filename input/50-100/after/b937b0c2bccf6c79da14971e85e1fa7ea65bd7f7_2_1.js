function(){
            //try one more time 5 seconds later
            $.ajax({
              type : 'POST',
              url : couchurl ,
              data : corpusloginparams,
              success : function(data) {
                alert("I logged you into your corpus server automatically.");
                if (typeof callback == "function") {
                  callback(data);
                }
              },
              error : function(data){
                alert("I couldn't log you into your corpus.");
                Utils.debug(data);
                window.app.get("authentication").set("staleAuthentication", true);
              }
            });
          }