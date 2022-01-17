function() {
        Utils.debug("Attempting to register a new user: " + this.el);
        /*
         * Set defaults for new user registration here,
         * WARNING: mongoose auth wont keep any attributes that are empty {} or [] 
         */
        var dataToPost = {};
        dataToPost.login = $(".username").val();
        dataToPost.email = $(".email").val();
        dataToPost.username = $(".username").val();
        dataToPost.password = $(".password").val();
        //Send a corpusname to create
        var corpusConnection = Utils.defaultCouchConnection();
        corpusConnection.corpusname = "firstcorpus";
        dataToPost.corpuses = [corpusConnection];
        dataToPost.gravatar = "./../user/user_gravatar.png";
        dataToPost.researchInterest = "";
        dataToPost.affiliation = "";
        dataToPost.description = "";
        dataToPost.subtitle = "";
        dataToPost.dataLists = ["1"];
        dataToPost.prefs = {
            "skin" : "",
            "numVisibleDatum" : 1
          };
        dataToPost.mostRecentIds = {corpusid:null};
        dataToPost.firstname = "";
        dataToPost.lastname = "";
        dataToPost.teams = ["1"];
        dataToPost.sessionHistory = ["1"];
        dataToPost.activityHistory = ["1"];
        dataToPost.permissions = {empty:"permission"};
        dataToPost.hotkeys = {empty: "hotkey"};
       
        if (dataToPost.username != ""
          && (dataToPost.password == $(".to-confirm-password").val())
          && dataToPost.email != "") {
          Utils.debug("User has entered an email and the passwords match. ");
          var a = new App();
          a.createAppBackboneObjects($(".username").val()+"-firstcorpus");//this is the convention the server is currently using to create first corpora
          
          /*
           * Contact the server and register the new user
           */
          $.ajax({
            type : 'POST',
            url : Utils.authUrl + "/register",
            data : dataToPost,
            success : function(data) {
              if (data.errors != null) {
                $(".alert-error").html(data.errors.join("<br/>")+" "+Utils.contactUs );
                $(".alert-error").show();
              } else if (data.user) {
                /*
                 * Create a new user, and put them into the authView, create a corpus, session and datalist for them then
                 * dismiss modal
                 */ 
                
//                a.createAppBackboneObjects(data.user.couchConnection.corpusname, function(){
                  // Faking a login behavior, copy pasted from authentication auth function
                  var auth  = a.get("authentication");
                  auth.set("state", "loggedIn");
                  auth.staleAuthentication = false;

                  var u = auth.get("userPrivate");
                  u.set("id",data.user._id); //set the backbone id to be the same as the mongodb id
                  u.set(data.user);//TODO maybe id conflicts are popping up here
                  
                  // Over write the public copy with any (new) username/gravatar info set the backbone id of the userPublic to be the same as the mongodb id of the userPrivate
                  auth.get("userPublic").set("id", auth.get("userPrivate").get("id"));
                  if (data.user.publicSelf == null) {
                    // If the user hasnt already specified their public auth, then put in a username and gravatar,however they can add more details like their affiliation, name, research interests etc.
                    data.user.publicSelf = {};
                    data.user.publicSelf.username = auth.get("userPrivate").get("username");
                    data.user.publicSelf.gravatar = auth.get("userPrivate").get("gravatar");
                  }
                  auth.get("userPublic").set(data.user.publicSelf);
                  auth.get("userPublic").changeCorpus(data.user.corpuses[0].corpusname);
//                  auth.get("userPublic").save();
                  
                  var c = a.get("corpus");
                  c.set({
                    "title" : data.user.username + "'s Corpus",
                    "titleAsUrl" : data.user.username + "Corpus",
                    "description" : "This is an untitled corpus, created by default.",
                    "dataLists" : new DataLists(),
                    "sessions" : new Sessions(),
                    "couchConnection" : data.user.corpuses[0],
                    "corpusname" : data.user.corpuses[0].corpusname
                  });
                  
                  var s = a.get("currentSession");
                  s.get("sessionFields").where({label: "user"})[0].set("value", auth.get("userPrivate").get("username") );
                  s.get("sessionFields").where({label: "consultants"})[0].set("value", "AA");
                  s.get("sessionFields").where({label: "goal"})[0].set("value", "To explore the app and try entering/importing data");
                  s.get("sessionFields").where({label: "dateSEntered"})[0].set("value", new Date());
                  s.get("sessionFields").where({label: "dateElicited"})[0].set("value", "A few months ago, probably on a Monday night.");
                  s.set("corpusname", data.user.corpuses[0].corpusname);
                  s.changeCorpus(data.user.corpuses[0].corpusname);

                  c.get("sessions").add(s);
                  
                  var dl = a.get("currentDataList");
                  dl.set({
                    "title" : data.user.username + "'s untitled data list",
                    "dateCreated" : "May 29, 2012",
                    "description" : "You can use datalists to create handouts or to prepare for sessions with consultants, export to LaTeX or to share with collaborators. ",
                    "corpusname" : data.user.corpuses[0].corpusname
                  });
                  dl.changeCorpus(data.user.corpuses[0].corpusname);
                  c.get("dataLists").add(dl);
                  
                  c.changeCorpus(data.user.corpuses[0]);
                  // c.save(); //this is saving to add the corpus to the user's array of corpuses later on
                   window.startApp(a, function(){
//                     auth.get("userPrivate").addCurrentCorpusToUser();
                     window.setTimeout(function(){
                       /*
                        * Use the corpus just created to log the user into that corpus's couch server
                        */
                       var couchConnection = data.user.corpuses[0];
                       c.logUserIntoTheirCorpusServer(couchConnection, dataToPost.username, dataToPost.password, function() {
                         Utils.debug("Successfully authenticated user with their corpus server.");
                       });
                     }, 5000);
                     console.log("Loadded app for a new user.");
                   });
                   $('#user-welcome-modal').modal("hide");
//                });
              }
            },//end successful registration
            dataType : ""
          });
        } else{
          Utils.debug("User has not entered good info. ");
            $(".alert-error").html("Your passwords don't match, or you didn't enter an email. " + Utils.contactUs );
            $(".alert-error").show();
        }
      }