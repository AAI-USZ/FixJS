function(){
          try{
            data = JSON.parse(data);
          }catch(e){
            console.log("bad JSON from meetup", data);
            return next(500);
          }
          // check if they're the host
          var events = data.results;
          var hosting = [];
          for (var i = 0; i < events.length; i++){
            for (var j = 0; j < events[i].event_hosts.length; j++){
              if (events[i].event_hosts[j].member_id === req.session.memberId){
                // user's hosting
                hosting.push(events[i]);
              }
            }
          }
          var params = {
            name: req.session.memberName,
            header: false,
            events: hosting,
            title: "Pick Event"
          };
          res.render("Event/pick", params);
        }