function(){
    console.log('Restarted Meteor Server');
    Meteor.setInterval(function () {
        var now = (new Date()).getTime();
        var deadConnections = Connections.find({last_active: {$lt: (now - 7 * 1000)}});
        deadConnections.forEach(function (connection) {
            Fiber(function(){
                Rooms.update({_id:connection.roomId},{$set: {active:false}});
            }).run();
        })
        var liveConnections = Connections.find({last_active: {$gt: (now - 7 * 1000)}});
        liveConnections.forEach(function (connection) {
            Fiber(function(){
                Rooms.update({_id:connection.roomId},{$set: {active:true}});
            }).run();
        })
    },5000);
}