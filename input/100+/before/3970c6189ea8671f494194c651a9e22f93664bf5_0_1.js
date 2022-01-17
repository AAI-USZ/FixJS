function(clientsUser, serversUser, callback){
  console.log("this is the clients user");
  console.log(util.inspect(clientsUser));
  
  console.log(" this is the servers user:");
  console.log(util.inspect(serversUser));
  
  try{
    UserSchema.add({mostRecentIds: { type: String, required: false }}); 
    User.findOne({ _id: "ObjectId("+clientsUser._id+")" }, function (err, doc){
      doc.mostRecentIds = 'jason borne';
      doc.save();
      
      if(typeof callback == "function"){
        callback(user);
      }
    });
  }catch(e){
    console.log("attempting to simply save the clients user, this might just overwrite it since it has the same id?");
    if(typeof callback == "function"){
      callback(serversUser);
    }
  }
}