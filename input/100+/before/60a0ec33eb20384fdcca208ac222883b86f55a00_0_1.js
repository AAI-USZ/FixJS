function(resp) {
      params = {};

      if(resp.statusCode > 400) {
        next(404);
      } else {
        var data = "";
        resp.on('data', function(d) {
          data += d;
        });
        resp.on("end", function(){
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
            params.restaurants = data;
            res.render("Event/index.jade", params);
          });
        });
      }
    }