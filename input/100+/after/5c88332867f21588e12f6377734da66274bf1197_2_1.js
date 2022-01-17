function(appidsIn) {      
//      this.model.get("userPrivate").set("id","4ffbcacc1bae444d2400001a");
//      this.model.get("userPrivate").set("username", "sapir");
//      this.model.get("userPrivate").set("mostRecentIds", appidsIn);
      var couchConnection = {
          protocol : "https://",
          domain : "ilanguage.iriscouch.com",
          port : "443",
          corpusname : "sapir-firstcorpus"
        };
      this.model.set(this.model.parse({
            "id" : "4ffbcacc1bae444d2400001a",
            "activityHistory" : [],
            "affiliation" : "U Penn",
            "corpuses" : [ {
              "corpusname" : "sapir-firstcorpus",
              "port" : "443",
              "domain" : "ilanguage.iriscouch.com",
              "protocol" : "https://"
            } ],
            "dataLists" : [],
            "description" : "I am currently a PostDoc at U Penn. I'm interested in the mental represenation of sound, I'm currently working with Southern Paiute speakers.",
            "firstname" : "",
            "gravatar" : "./../user/sapir_1910_gravatar.png",
            "hotkeys" : {
              "description" : "",
              "secondKey" : "",
              "firstKey" : ""
            },
            "lastname" : "",
            "login" : "sapir",
            "mostRecentIds" : {
              "datalistid" : "1C1F1187-329F-4473-BBC9-3B15D01D6A11",
              "sessionid" : "1423B167-D728-4315-80DE-A10D28D8C4AE",
              "corpusid" : "4C1A0D9F-D548-491D-AEE5-19028ED85F2B"
            },
            "permissions" : {
            },
            "prefs" : {
              "numVisibleDatum" : 3,
              "skin" : ""
            },
            "researchInterest" : "Phonology",
            "sessionHistory" : [],
            "subtitle" : "Ed Sapir",
            "teams" : [],
            "username" : "sapir"
          }));
      var self = this;
      //Set sapir's remote corpus to fetch from
      window.app.get("corpus").logUserIntoTheirCorpusServer(couchConnection,"sapir","phoneme", function(){
        //Replicate sapir's corpus down to pouch
        self.model.get("userPublic").set("id", self.model.get("userPrivate").get("id") );
        var data = {};
        data.user ={};
        if (data.user.publicSelf == null) {
          // if the user hasnt already specified their public self, then
          // put in a username and gravatar,however they can add more
          // details like their affiliation, name, research interests
          // etc.
          data.user.publicSelf = {};
          data.user.publicSelf.username = self.model.get("userPrivate").get(
          "username");
          data.user.publicSelf.gravatar = self.model.get("userPrivate").get(
          "gravatar");
        }
        self.model.get("userPublic").set(data.user.publicSelf);
        self.model.set({
          username : self.model.get("userPrivate").get("username"),
          state : "loggedIn",
          gravatar :  self.model.get("userPrivate").get("gravatar") 
        });
        window.app.get("corpus").replicateCorpus(couchConnection, function(){
          //load the sapir's most recent objects into the existing corpus, datalist, session and user
          window.app.loadBackboneObjectsById(couchConnection , window.appView.authView.model.get("userPrivate").get("mostRecentIds"));
          window.appView.renderEditableUserViews();//TODO sapirs details are in the models, but they arent getting rendered
          window.appView.renderReadonlyUserViews();
          self.render();
        });
      });
      

    }