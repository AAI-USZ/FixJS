function(req, res, next){
    var ordrin = req._ordrin;
    var eid = req.params.eid;
    options = {
        host : "api.meetup.com",
        port : 443,
        path : "/2/event/",
        method : 'GET'
    };

    options.path += eid + "?key=" + config.get("meetup_api_key") + "&sign=true";
    console.log(options);
    var meetupReq = https.request(options, function(resp) {
      params = {};

      if(resp.statusCode > 400) {
        console.log("fuck me", resp.statusCode, resp);
        next(404);
      } else {
        var data = "";
        resp.on('data', function(d) {
          data += d;
        });
        resp.on("end", function(){
          console.log("all good", data);
          try{
            eventInfo = JSON.parse(data);
          }catch(e){
            console.log("error", e, data);
          }
          params = _.extend({
            title: eventInfo.name, 
            eventId: eventInfo.id, 
            event_name: eventInfo.name,
            event_url: eventInfo.event_url,
            header: true
           }, eventInfo);

          var timestamp = (parseInt(eventInfo.time) + parseInt(eventInfo.utc_offset));
          var dateTime = timestamp;
          // add stuff to session for later. Sorry Felix
          req.session.meetup = {
            name: eventInfo.name,
            event_url: eventInfo.event_url,
            address: eventInfo.venue,
            dateTime: dateTime
          };

          var address = new ordrin.Address(eventInfo.venue.address_1, eventInfo.venue.city, eventInfo.venue.state, eventInfo.venue.zip, '7187533087');
          ordrin.restaurant.getDeliveryList(new Date(dateTime), address, function(err, data) {
            console.log("presenting page", err, data);
            params.restaurants = data;
            res.render("Event/index.jade", params);
          });
        });
      }
    });
    meetupReq.end();
    
    /*ordrin.restaurant.getDetails(req.params.rid, function(err, data){
      if (err){
        console.log("fuck", err);
        next(500, err);
        return;
      }
      var params = _.extend({title: data.name}, data);
      res.render("Menu/index.jade", params);
    });*/
    //res.render();
  }