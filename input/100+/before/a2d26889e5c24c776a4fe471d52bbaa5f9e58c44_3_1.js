function(data) {
              if(data.errors != null){
                $(".alert-error").html(data.errors.join("<br/>")+" "+Utils.contactUs );
                $(".alert-error").show();
              }else if ( data.user != null ){
                /*
                 * Create a new user, and put them into the authView, create a corpus, session and datalist for them then
                 * dismiss modal
                 */ 
                var u = new User(data.user);
                var a = new App();
                a.set("corpus", new Corpus({
                  "title" : data.user.username+"'s Corpus",
                  "titleAsUrl" : data.user.username+"Corpus",
                  "description" : "This is an untitled corpus, created by default.",
                  "dataLists": new DataLists(),
                  "sessions": new Sessions()
                }));
                a.get("corpus").save()
                u.get("corpuses").push(a.get("corpus").id);
                var s = new Session(
                    {
                      "sessionFields" : new DatumFields(
                          [
                           {
                             label : "user",
                             value : u.id //TODO turn this into an array of users
                           },
                           {
                             label : "consultants",
                             value : "AA" //TODO turn this into an array of consultants
                           },
                           {
                             label : "language",
                             value : "Unknown language"
                           },
                           {
                             label : "dialect",
                             value : "Unknown dialect"
                           },
                           {
                             label : "dateElicited",
                             value : new Date()
                           },
                           {
                             label : "dateSEntered",
                             value : new Date()
                           },
                           {
                             label : "goal",
                             value : "To explore the app and try entering/importing data"
                           } ])
                    });
                a.get("corpus").get("sessions").add(s);
                var dl = new DataList(
                    {
                      "title" : data.user.username+"'s untitled data list",
                      "dateCreated" : "May 29, 2012",
                      "description" : "You can use datalists to create handouts or to prepare for sessions with consultants, export to LaTeX or to share with collaborators. ",
                    });
                a.get("corpus").get("dataLists").add(dl);
                a.set("currentSession", s);
                a.set("currentDataList",dl);
                a.get("authentication").set("user",u);
                
                window.loadApp(a, function(){
                  //TODOD remove sensitive items from the user returned before turning it into a couch entry
                  console.log("Loadded app from json.");
                });
                $('#user-welcome-modal').modal("hide");
              }
            }