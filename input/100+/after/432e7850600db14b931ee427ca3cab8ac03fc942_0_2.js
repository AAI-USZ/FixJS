function(User, clientsUser, serversUser, callback){
  console.log("this is the clients user");
  console.log(util.inspect(clientsUser));
  
//  console.log(" this is the servers user:");
//  console.log(util.inspect(serversUser));
  
  console.log("Updating "+clientsUser._id);
  try{
    User.findById(clientsUser._id, function (err, doc){
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

    });
  }catch(e){
    console.log("There was an error in trying to find the model and modify it."+util.inspect(e));
    if(typeof callback == "function"){
      callback(clientsUser);
    }
  }
}