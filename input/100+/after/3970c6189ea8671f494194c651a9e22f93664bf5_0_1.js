function(User, clientsUser, serversUser, callback){
  console.log("this is the clients user");
  console.log(util.inspect(clientsUser));
  
  console.log(" this is the servers user:");
  console.log(util.inspect(serversUser));
  
  console.log("Finding "+'ObjectId("'+clientsUser._id+'")');
  try{
    User.find({ "_id" : 'ObjectId("'+clientsUser._id+'")' }, function (err, doc){
      doc.mostRecentIds = clientsUser.mostRecentIds;
      doc.save();
      console.log("This is what the saved doc looked like:" + util.inspect(doc));

      if(typeof callback == "function"){
        callback(clientsUser);
      }
    });
  }catch(e){
    console.log("There was an error in trying to find the model and modify it."+util.inspect(e));
    if(typeof callback == "function"){
      callback(clientsUser);
    }
  }
}