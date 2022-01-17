function (err, doc){
      doc.mostRecentIds = clientsUser.mostRecentIds;
      doc.prefs = clientsUser.prefs;
      doc.hotkeys = clientsUser.hotkeys;
      doc.sessionHistory = clientsUser.sessionHistory;
      doc.dataLists = clientsUser.dataLists;
      doc.activityHistory = clientsUser.activityHistory;
      doc.permissions = clientsUser.permissions;
      doc.teams = clientsUser.teams;
      
      doc.email = clientsUser.email;
//      username = clientsUser.username;
//      doc.password = clientsUser.password;
      doc.corpuses = clientsUser.corpuses;
      doc.gravatar = clientsUser.gravatar;
      doc.researchInterest = clientsUser.researchInterest;
      doc.affiliation = clientsUser.affiliation;
      doc.description = clientsUser.description;
      doc.subtitle = clientsUser.subtitle;
      firstname = clientsUser.firstname;
      lastname = clientsUser.lastname;

      doc.save( function (err, doc) {
        if (err) {
          console.log("Here are the errors "+util.inspect(err));
          if(typeof callback == "function"){
            callback(clientsUser);
          }
        }else{
          console.log("Save didnt error. This is what the saved doc looked like:" + util.inspect(doc));
          if(typeof callback == "function"){
            callback(doc);
          }
        }
      });

    }