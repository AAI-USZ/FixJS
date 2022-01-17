function(){
    if (role == "student") {
        var sip = null;
        Meteor.http.call("GET",'http://marr.southern.edu/apps/jsonip/',function(error, result){
            console.log(result);
            if (result.statusCode === 200) {
                sip = result.data.ip;
                Meteor.call('calculateMac',sip ,function(error, result){
                    if (result == mac) {
                        Meteor.call('roomExists',id,moodleClass);
                        Meteor.call('getRoomId',id,moodleClass,function(error,result){
                            Session.set('roomId',result);
                            Meteor.autosubscribe(function(){
                                Meteor.subscribe("messages", Session.get('roomId'));
                            });
                        });
                        Meteor.setInterval(function () {
                            Meteor.call('keepalive', Session.get('roomId'));
                        }, 5000);
                        var frag = Meteor.ui.render(function(){ return Template.Verified()});
                        $('#studentContent').html('');
                        $('#studentContent').append(frag);
                    } else {
                        var frag = Meteor.ui.render(function(){ return Template.notVerified()});
                        $('#studentContent').html('');
                        $('#studentContent').append(frag);
                    }
                });
            }
        });
    } else if (role == "host") {
        var query = Rooms.find();
        console.log('Starting Observation');
        var handle = query.observe({
          added: function (item) {
            if(item.active == true) {
                console.log("ring! ring!");
                ring.play();
            }
          },
          changed: function (item) {
            if(item.active == true) {
                console.log("ring! ring!");
                ring.play();
            }
          }
        });
    }
}