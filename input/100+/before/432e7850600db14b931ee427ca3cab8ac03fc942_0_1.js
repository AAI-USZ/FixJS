function (err, doc){
      doc.mostRecentIds = clientsUser.mostRecentIds;
      doc.save();
      console.log("This is what the saved doc looked like:" + util.inspect(doc));

      if(typeof callback == "function"){
        callback(clientsUser);
      }
    }