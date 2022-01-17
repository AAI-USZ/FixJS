function(err, meetups){
      for (var i = 0; i < meetups.length; i++){
        eids.push(meetups[i].meetup_id);
      }
      console.log("starting", eids);
      cb();
    }