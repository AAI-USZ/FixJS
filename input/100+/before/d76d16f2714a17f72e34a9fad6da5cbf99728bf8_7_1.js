function(req, res, next){
    var email = req.body.email;

    if (typeof email === "undefined"){
      return _handleGet(req, res, next);
    }

    try{
      var address= req.session.meetup.address;
      address = new req._ordrin.Address(address.address_1, address.city, address.state, address.zip,
                                   String("2345678901"));
    }catch(e){
      console.log("address error", e);
      return next(500);
    }

    var meetup = new req._schemas.Meetup({
      meetup_id : req.params.eid,
      rid       : req.params.rid,
      name      : req.session.meetup.name,
      event_url : req.session.meetup.event_url,
      time      : req.session.time,
      address   : address,
      hostEmail : email
    });
    meetup.save(function(err){
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
        Polling.addEvent(req.params.eid);
        res.render("setupEvent/success.jade", params);
      }
    });
  }