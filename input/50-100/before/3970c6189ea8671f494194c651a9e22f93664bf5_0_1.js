function (err, doc){
      doc.mostRecentIds = 'jason borne';
      doc.save();
      
      if(typeof callback == "function"){
        callback(user);
      }
    }