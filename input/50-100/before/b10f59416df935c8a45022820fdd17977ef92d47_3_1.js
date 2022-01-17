function(err){
      if (err){
        console.log("db error");
        return next(500);
      }else{
        var params = {
          title     : "Success", 
          event_name: req.session.meetup.name,
          event_url : req.session.meetup.event_url,
          eventId   : req.params.eid,
          restaurantName: req.session.restaurantName,
          header: true
        };
        Polling.start(req.params.eid);
        res.render("setupEvent/success.jade", params);
      }
    }