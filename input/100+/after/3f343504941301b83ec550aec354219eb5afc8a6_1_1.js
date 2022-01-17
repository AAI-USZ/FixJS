function getMeetups(schemas, cb){
    console.log("getting meetups");
    schemas.Meetup.find({time: {$gt: new Date().getTime()}}, function(err, meetups){
      console.log("got meetups", err);
      for (var i = 0; i < meetups.length; i++){
        eids.push(meetups[i].meetup_id);
      }
      console.log("go", eids);
      cb();
    });
  }